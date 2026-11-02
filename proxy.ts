import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./app/lib/auth/jwt";

// Optimistic gate only: it reads the signed cookie, never the database.
// Every admin page and Server Action still calls requireAdmin() itself.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const signedIn = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  if (!signedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
