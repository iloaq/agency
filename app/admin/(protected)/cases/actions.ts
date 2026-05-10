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

function parseJson(raw: string, field: string, kind: "array" | "object"): unknown {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.trim());
  } catch {
    throw new Error(`badjson:${field}`);
  }
  if (kind === "array" && !Array.isArray(parsed)) throw new Error(`badjson:${field}`);
  if (
    kind === "object" &&
    (typeof parsed !== "object" || parsed === null || Array.isArray(parsed))
  ) {
    throw new Error(`badjson:${field}`);
  }
  return parsed;
}

function badJsonRedirect(isNew: boolean, id: string) {
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

  let problems: unknown;
  let what_we_did: unknown;
  let outcomes: unknown;
  let stack: unknown;
  try {
    problems = parseJson(String(formData.get("problems") ?? "[]"), "problems", "array");
    what_we_did = parseJson(String(formData.get("what_we_did") ?? "[]"), "what_we_did", "array");
    outcomes = parseJson(String(formData.get("outcomes") ?? "[]"), "outcomes", "array");
    stack = parseJson(String(formData.get("stack") ?? "{}"), "stack", "object");
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
    stack,
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
    revalidatePath("/cases");
    revalidatePath("/admin/cases");
    redirect(`/admin/cases/${data.id}?saved=1`);
  }

  const { error } = await supabase.from(TABLE).update(row).eq("id", id);
  if (error) redirect(`/admin/cases/${id}?err=db`);
  revalidatePath("/cases");
  revalidatePath(`/cases/${slug}`);
  revalidatePath("/admin/cases");
  redirect(`/admin/cases/${id}?saved=1`);
}

export async function deleteCaseStudy(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/admin/cases?err=noid");
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) redirect(`/admin/cases?err=db`);
  revalidatePath("/cases");
  revalidatePath("/admin/cases");
  redirect("/admin/cases");
}
