"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/require-admin";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";

// Source: https://supabase.com/docs/reference/javascript/update

const TABLE = "services";

function parseContentJson(raw: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.trim());
  } catch {
    throw new Error("badjson");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("badjson");
  }
  return parsed as Record<string, unknown>;
}

export async function saveService(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  const isNew = !id;
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const path = String(formData.get("path") ?? "").trim();
  const short_description = String(formData.get("short_description") ?? "").trim();
  const seo_title = String(formData.get("seo_title") ?? "").trim();
  const seo_description = String(formData.get("seo_description") ?? "").trim();
  if (!slug || !title || !path) {
    if (isNew) redirect("/admin/services/new?err=required");
    redirect(`/admin/services/${id}?err=required`);
  }

  let content: Record<string, unknown>;
  try {
    content = parseContentJson(String(formData.get("content") ?? "{}"));
  } catch {
    if (isNew) redirect("/admin/services/new?err=badjson");
    redirect(`/admin/services/${id}?err=badjson`);
  }

  const row = {
    slug,
    title,
    path,
    short_description,
    seo_title,
    seo_description,
    content,
    published: formData.get("published") === "on",
    sort_order: Number.parseInt(String(formData.get("sort_order") ?? "0"), 10) || 0,
  };

  const supabase = getSupabaseAdminClient();

  if (isNew) {
    const { data, error } = await supabase.from(TABLE).insert(row).select("id").single();
    if (error || !data) redirect("/admin/services/new?err=db");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    redirect(`/admin/services/${data.id}?saved=1`);
  }

  const { error } = await supabase.from(TABLE).update(row).eq("id", id);
  if (error) redirect(`/admin/services/${id}?err=db`);
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);
  revalidatePath("/admin/services");
  redirect(`/admin/services/${id}?saved=1`);
}

export async function deleteService(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/admin/services?err=noid");
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) redirect("/admin/services?err=db");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}
