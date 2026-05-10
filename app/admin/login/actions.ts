"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { getConfiguredLoginSecret, getSessionSigningSecret } from "@/lib/admin/env";
import { verifyAdminPassword } from "@/lib/admin/password";
import { createAdminSessionToken } from "@/lib/admin/session-token";

// Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

export async function loginAdminAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = getConfiguredLoginSecret();
  const signSecret = getSessionSigningSecret();
  if (!expected || !signSecret) {
    redirect("/admin/login?err=config");
  }
  if (!verifyAdminPassword(password, expected)) {
    redirect("/admin/login?err=auth");
  }
  const token = await createAdminSessionToken(signSecret);
  (await cookies()).set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}
