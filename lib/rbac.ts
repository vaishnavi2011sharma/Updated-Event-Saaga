import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Session } from "next-auth";

export type Role = "SUPER_ADMIN" | "CUSTOMER" | "VENDOR";

export class UnauthorizedError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

/**
 * Returns the current session, or null. Never trusts anything the client sends —
 * `getServerSession` re-derives the session server-side from the signed JWT cookie,
 * and that JWT's `role` is refreshed from MongoDB on every issuance (see lib/auth.ts).
 */
export async function getSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}

/**
 * Throws UnauthorizedError unless the current session's DB-sourced role is one of
 * `allowed`. Use at the top of every protected API route handler and server page.
 */
export async function requireRole(allowed: Role[]): Promise<Session> {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new UnauthorizedError("Not authenticated", 401);
  }
  if (!session.user.role || !allowed.includes(session.user.role)) {
    throw new UnauthorizedError("Forbidden — insufficient role", 403);
  }
  return session;
}

/** Additionally requires an approved (not pending/rejected/suspended) vendor account. */
export async function requireApprovedVendor(): Promise<Session> {
  const session = await requireRole(["VENDOR"]);
  if (session.user.vendorStatus !== "APPROVED") {
    throw new UnauthorizedError("Vendor account is not approved yet", 403);
  }
  return session;
}

/**
 * Ownership check: throws unless the resource's owner id matches the session user,
 * UNLESS the session user is SUPER_ADMIN (who has full access per the spec).
 */
export function assertOwnership(session: Session, resourceOwnerId: string | undefined | null) {
  if (session.user.role === "SUPER_ADMIN") return;
  if (!resourceOwnerId || resourceOwnerId !== session.user.id) {
    throw new UnauthorizedError("Forbidden — not your resource", 403);
  }
}
