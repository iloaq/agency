import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonOrPublishableKey,
  getSupabaseProjectUrl,
} from "@/lib/supabase/project-env";
import type { CaseStudyRow } from "./case-study-types";

const TABLE = "case_studies";

function createCaseStudiesClient() {
  const url = getSupabaseProjectUrl();
  const key = getSupabaseAnonOrPublishableKey();
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function fetchPublishedCaseStudies(): Promise<CaseStudyRow[]> {
  const supabase = createCaseStudiesClient();
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
  const supabase = createCaseStudiesClient();
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
