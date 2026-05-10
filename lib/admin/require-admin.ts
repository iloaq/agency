import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { getSessionSigningSecret } from "@/lib/admin/env";
import { verifyAdminSessionToken } from "@/lib/admin/session-token";

export async function requireAdminSession(): Promise<void> {
  const secret = getSessionSigningSecret();
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!secret || !token || !(await verifyAdminSessionToken(token, secret))) {
    redirect("/admin/login");
  }
}
