/**
 * Один Project URL: в CapRover достаточно задать **либо** `SUPABASE_URL`, **либо** `NEXT_PUBLIC_SUPABASE_URL`.
 * `SUPABASE_URL` удобнее на сервере (не зависит от того, что вшилось в билд).
 * Source: https://supabase.com/docs/guides/api
 */
export function getSupabaseProjectUrl(): string | null {
  const raw =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "";
  const url = raw.replace(/\/+$/, "");
  return url.length > 0 ? url : null;
}

/**
 * Публичный ключ для anon/publishable: достаточно **одного** из переменных.
 * Source: https://supabase.com/docs/guides/api/api-keys
 */
export function getSupabaseAnonOrPublishableKey(): string | null {
  const k =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    "";
  return k.length > 0 ? k : null;
}
