import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { LOCATION_SLUGS, type LocationSlug } from "@/lib/locations/config";

const COOKIE_NAME = "eventsaaga_location";

// Paths that should never be redirected
const BYPASS = [
  "/api/", "/_next/", "/favicon", "/images/", "/fonts/",
  "/robots.txt", "/sitemap.xml", "/manifest.json",
];

// Route-level RBAC: prefix -> roles allowed to view it.
const PROTECTED_PREFIXES: { prefix: string; roles: Array<"SUPER_ADMIN" | "CUSTOMER" | "VENDOR"> }[] = [
  { prefix: "/admin", roles: ["SUPER_ADMIN"] },
  { prefix: "/vendor/dashboard", roles: ["VENDOR"] },
  { prefix: "/customer/dashboard", roles: ["CUSTOMER"] },
];

function isLocationSlug(value: string): value is LocationSlug {
  return (LOCATION_SLUGS as readonly string[]).includes(value);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API, Next internals
  if (BYPASS.some(b => pathname.startsWith(b))) {
    return NextResponse.next();
  }

  // ── Route-level RBAC (frontend layer; every API route re-verifies server-side too) ──
  const guarded = PROTECTED_PREFIXES.find(p => pathname.startsWith(p.prefix));
  if (guarded) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // The token's role is DB-sourced (see lib/auth.ts jwt callback, refreshed on
    // every issuance) — this check is trustworthy, but every API route the page
    // calls performs the same check again independently. Defense in depth.
    if (!token.role || !guarded.roles.includes(token.role as "SUPER_ADMIN" | "CUSTOMER" | "VENDOR")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token.role === "VENDOR" && token.vendorStatus !== "APPROVED" && !pathname.startsWith("/vendor/pending")) {
      return NextResponse.redirect(new URL("/vendor/pending", request.url));
    }

    return NextResponse.next();
  }

  // If already on a location route — do nothing
  const firstSegment = pathname.split("/")[1];
  if (firstSegment && isLocationSlug(firstSegment)) {
    return NextResponse.next();
  }

  // Only redirect the homepage to a saved location — and only if that saved
  // value is a currently-valid slug. Nothing here ever defaults to a specific
  // city; it's strictly "redirect to whatever the user themselves picked before."
  if (pathname === "/") {
    const saved = request.cookies.get(COOKIE_NAME)?.value;
    if (saved && isLocationSlug(saved)) {
      return NextResponse.redirect(new URL(`/${saved}`, request.url));
    }
    // No saved location — let homepage render with popup
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
