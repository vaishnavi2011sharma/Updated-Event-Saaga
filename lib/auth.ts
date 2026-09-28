import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

/**
 * SECURITY NOTE (see project instructions):
 * The "Login As" selector on the login page is a UI convenience ONLY. It is never
 * passed into `authorize()` as a trust signal. The `authorize()` callback looks the
 * user up by email/phone alone, verifies the password hash, and returns whatever
 * role is actually stored in MongoDB for that user — full stop. The JWT and session
 * callbacks below re-read that same DB-sourced role on every token refresh, so a
 * stale or tampered client-side value can never grant elevated access.
 */

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        await connectToDatabase();
        const identifier = credentials.identifier.trim().toLowerCase();

        const user = await User.findOne({
          $or: [{ email: identifier }, { phone: credentials.identifier.trim() }],
        }).select("+passwordHash");

        if (!user) return null;

        const valid = await user.comparePassword(credentials.password);
        if (!valid) return null;

        // Only ever return what's actually in the database — nothing from the client.
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          vendorStatus: user.vendorStatus ?? null,
        };
      },
    }),
    ...(googleConfigured
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google sign-in, find-or-create a CUSTOMER record (Google can only ever
      // create customer accounts — vendors and the admin must go through their own
      // explicit registration/seeding flows).
      if (account?.provider === "google") {
        await connectToDatabase();
        let dbUser = await User.findOne({ email: user.email?.toLowerCase() });
        if (!dbUser) {
          const bcrypt = await import("bcryptjs");
          const randomPassword = await bcrypt.hash(crypto.randomUUID(), 10);
          dbUser = await User.create({
            name: user.name || "Google User",
            email: user.email?.toLowerCase(),
            passwordHash: randomPassword,
            role: "CUSTOMER",
          });
        }
        user.id = dbUser._id.toString();
      }
      return true;
    },
    async jwt({ token, user }) {
      // On initial sign-in, `user` comes straight from `authorize()`/`signIn()` above.
      if (user) {
        token.id = (user as { id: string }).id;
      }

      // Re-fetch the role from the database on every token issuance/refresh
      // (not just at login) so a role change (e.g. vendor approval, admin
      // suspending an account) takes effect without waiting for the client
      // to somehow smuggle in a new value — there is no client input here at all.
      if (token.id) {
        await connectToDatabase();
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.role = dbUser.role;
          token.vendorStatus = dbUser.vendorStatus ?? null;
          token.name = dbUser.name;
          token.email = dbUser.email;
        } else {
          // User was deleted — invalidate the token's authority.
          token.role = undefined;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "SUPER_ADMIN" | "CUSTOMER" | "VENDOR" | undefined;
        session.user.vendorStatus = token.vendorStatus as string | null | undefined;
      }
      return session;
    },
  },
};
