import { createSupabaseServerClient } from "@/lib/supabase/server";

// Source: https://supabase.com/docs/reference/javascript/select

const TABLE = "site_settings";

/** Строка из Supabase (snake_case). */
export type SiteSettingsRow = {
  id: number;
  brand_name: string;
  email: string;
  phone_display: string;
  phone_href: string;
  social: Record<string, string>;
  published: boolean;
};

export async function fetchPublishedSiteSettings(): Promise<SiteSettingsRow | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(TABLE)
    .select("id, brand_name, email, phone_display, phone_href, social, published")
    .eq("id", 1)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return data as SiteSettingsRow;
}
