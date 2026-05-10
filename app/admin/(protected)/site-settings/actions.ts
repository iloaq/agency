"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/require-admin";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";

// Source: https://supabase.com/docs/reference/javascript/upsert

const TABLE = "site_settings";

function parseSocial(raw: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(raw.trim());
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("badjson");
  }
  return parsed as Record<string, unknown>;
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdminSession();

  let social: Record<string, unknown>;
  try {
    social = parseSocial(String(formData.get("social") ?? "{}"));
  } catch {
    redirect("/admin/site-settings?err=badjson");
  }

  const row = {
    id: 1 as const,
    brand_name: String(formData.get("brand_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone_display: String(formData.get("phone_display") ?? "").trim(),
    phone_href: String(formData.get("phone_href") ?? "").trim(),
    social,
    published: formData.get("published") === "on",
  };

  if (!row.brand_name || !row.email || !row.phone_display || !row.phone_href) {
    redirect("/admin/site-settings?err=required");
  }

  const supabase = getSupabaseAdminClient();
  const { data: existing } = await supabase.from(TABLE).select("id").eq("id", 1).maybeSingle();

  if (!existing) {
    const { error } = await supabase.from(TABLE).insert(row);
    if (error) redirect("/admin/site-settings?err=db");
  } else {
    const { error } = await supabase.from(TABLE).update(row).eq("id", 1);
    if (error) redirect("/admin/site-settings?err=db");
  }

  revalidatePath("/", "layout");
  revalidatePath("/contact");
  redirect("/admin/site-settings?saved=1");
}
