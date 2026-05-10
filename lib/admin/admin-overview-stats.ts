import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";

// Source: https://supabase.com/docs/reference/javascript/select#count-option

export type AdminOverviewStats = {
  leadsTotal: number;
  leadsNew: number;
  casesTotal: number;
  servicesTotal: number;
  siteSettingsRows: number;
};

export async function getAdminOverviewStats(): Promise<AdminOverviewStats | null> {
  try {
    const supabase = getSupabaseAdminClient();
    const [leads, leadsNew, cases, services, settings] = await Promise.all([
      supabase.from("service_leads").select("id", { count: "exact", head: true }),
      supabase.from("service_leads").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("case_studies").select("id", { count: "exact", head: true }),
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("site_settings").select("id", { count: "exact", head: true }),
    ]);

    return {
      leadsTotal: leads.count ?? 0,
      leadsNew: leadsNew.count ?? 0,
      casesTotal: cases.count ?? 0,
      servicesTotal: services.count ?? 0,
      siteSettingsRows: settings.count ?? 0,
    };
  } catch {
    return null;
  }
}
