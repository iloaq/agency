import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServiceConfig } from "@/lib/admin/env";

// Source: https://supabase.com/docs/reference/javascript/initializing

let cached: SupabaseClient | null = null;

/** Service role: только на сервере (Server Actions / Route Handlers). */
export function getSupabaseAdminClient(): SupabaseClient {
  const cfg = getSupabaseServiceConfig();
  if (!cfg) {
    throw new Error(
      "Задайте SUPABASE_SERVICE_ROLE_KEY и URL: SUPABASE_URL (runtime) или NEXT_PUBLIC_SUPABASE_URL (при сборке)",
    );
  }
  if (!cached) {
    cached = createClient(cfg.url, cfg.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
