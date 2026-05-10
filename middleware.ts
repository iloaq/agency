import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { getSessionSigningSecret } from "@/lib/admin/env";
import { verifyAdminSessionToken } from "@/lib/admin/session-token";

// Source: https://nextjs.org/docs/app/building-your-application/routing/middleware

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }
  if (pathname === "/admin/logout" || pathname.startsWith("/admin/logout/")) {
    return NextResponse.next();
  }

  const secret = getSessionSigningSecret();
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!secret || !token || !(await verifyAdminSessionToken(token, secret))) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
