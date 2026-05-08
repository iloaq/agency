import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";

// Source: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function POST(request: Request) {
  (await cookies()).delete({ name: ADMIN_SESSION_COOKIE, path: "/" });
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
