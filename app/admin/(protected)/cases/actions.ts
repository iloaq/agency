"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/require-admin";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";

// Source: https://supabase.com/docs/reference/javascript/insert

const TABLE = "case_studies";

function emptyToNull(s: string): string | null {
  const t = s.trim();
  return t === "" ? null : t;
}

function parseStringList(raw: string, field: string): string[] {
  const value = raw.trim();
  if (!value) return [];

  // Backward compatible: old admin form accepted JSON arrays directly.
  if (value.startsWith("[")) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new Error(`badjson:${field}`);
    }
    if (!Array.isArray(parsed)) throw new Error(`badjson:${field}`);
    return parsed.filter((x): x is string => typeof x === "string" && x.trim().length > 0).map((x) => x.trim());
  }

  return value
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function buildStack(formData: FormData): Record<string, string> {
  const entries = {
    frontend: emptyToNull(String(formData.get("stack_frontend") ?? "")),
    backend: emptyToNull(String(formData.get("stack_backend") ?? "")),
    database: emptyToNull(String(formData.get("stack_database") ?? "")),
    integrations: emptyToNull(String(formData.get("stack_integrations") ?? "")),
  };

  return Object.fromEntries(Object.entries(entries).filter(([, value]) => value !== null)) as Record<string, string>;
}

function badJsonRedirect(isNew: boolean, id: string): never {
  if (isNew) redirect("/admin/cases/new?err=badjson");
  redirect(`/admin/cases/${id}?err=badjson`);
}

export async function saveCaseStudy(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  const isNew = !id;
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!slug || !title) {
    if (isNew) redirect("/admin/cases/new?err=required");
    redirect(`/admin/cases/${id}?err=required`);
  }

  let problems: string[];
  let what_we_did: string[];
  let outcomes: string[];
  try {
    problems = parseStringList(String(formData.get("problems") ?? ""), "problems");
    what_we_did = parseStringList(String(formData.get("what_we_did") ?? ""), "what_we_did");
    outcomes = parseStringList(String(formData.get("outcomes") ?? ""), "outcomes");
  } catch {
    badJsonRedirect(isNew, id);
  }

  const row = {
    slug,
    title,
    sector: emptyToNull(String(formData.get("sector") ?? "")),
    context: emptyToNull(String(formData.get("context") ?? "")),
    problems,
    goal: emptyToNull(String(formData.get("goal") ?? "")),
    what_we_did,
    architecture_flow: emptyToNull(String(formData.get("architecture_flow") ?? "")),
    architecture_flow_image_url: emptyToNull(String(formData.get("architecture_flow_image_url") ?? "")),
    stack: buildStack(formData),
    outcomes,
    conclusion: emptyToNull(String(formData.get("conclusion") ?? "")),
    company_name_internal: emptyToNull(String(formData.get("company_name_internal") ?? "")),
    published: formData.get("published") === "on",
    sort_order: Number.parseInt(String(formData.get("sort_order") ?? "0"), 10) || 0,
  };

  const supabase = getSupabaseAdminClient();

  if (isNew) {
    const { data, error } = await supabase.from(TABLE).insert(row).select("id").single();
    if (error || !data) redirect(`/admin/cases/new?err=db`);
    revalidatePath("/admin/cases");
    revalidatePath("/cases");
    redirect(`/admin/cases/${data.id}?saved=1`);
  }

  const { error } = await supabase.from(TABLE).update(row).eq("id", id);
  if (error) redirect(`/admin/cases/${id}?err=db`);
  revalidatePath("/admin/cases");
  revalidatePath("/cases");
  revalidatePath(`/cases/${slug}`);
  redirect(`/admin/cases/${id}?saved=1`);
}

export async function deleteCaseStudy(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/admin/cases?err=noid");
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) redirect(`/admin/cases?err=db`);
  revalidatePath("/admin/cases");
  redirect("/admin/cases");
}
