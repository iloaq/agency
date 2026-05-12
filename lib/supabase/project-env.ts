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
 * Публичный ключ: сначала **без** NEXT_PUBLIC_ — в Docker/CapRover читается в runtime (NEXT_PUBLIC_* часто пусты в билде).
 * Достаточно одного из anon / publishable.
 * Source: https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser
 * Source: https://supabase.com/docs/guides/api/api-keys
 */
export function getSupabaseAnonOrPublishableKey(): string | null {
  const k =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    "";
  return k.length > 0 ? k : null;
}
