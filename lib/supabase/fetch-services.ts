import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonOrPublishableKey,
  getSupabaseProjectUrl,
} from "@/lib/supabase/project-env";

// Source: https://supabase.com/docs/reference/javascript/select

const TABLE = "services";

/** Строка из Supabase для услуги (snake_case в колонках). */
export type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  path: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
  sort_order: number;
  content: Record<string, unknown>;
};

export async function fetchPublishedServices(): Promise<ServiceRow[]> {
  try {
    const url = getSupabaseProjectUrl();
    const key = getSupabaseAnonOrPublishableKey();
    if (!url || !key) return [];

    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as ServiceRow[];
  } catch {
    return [];
  }
}
