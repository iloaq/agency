import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CaseStudyRow } from "./case-study-types";

const TABLE = "case_studies";

export async function fetchPublishedCaseStudies(): Promise<CaseStudyRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as CaseStudyRow[];
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudyRow | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return data as CaseStudyRow;
}
