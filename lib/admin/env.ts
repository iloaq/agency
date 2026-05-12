/** Сервер-only: переменные админки и Supabase service role. */

export function getSessionSigningSecret(): string | null {
  const s =
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD ??
    process.env.ADMIN_SECRET;
  return s && s.trim().length > 0 ? s : null;
}

/** Пароль входа: ADMIN_PASSWORD → ADMIN_SECRET → иначе ADMIN_SESSION_SECRET (один длинный секрет для MVP). */
export function getConfiguredLoginSecret(): string | null {
  const pw = process.env.ADMIN_PASSWORD?.trim();
  if (pw) return pw;
  const sec = process.env.ADMIN_SECRET?.trim();
  if (sec) return sec;
  const sess = process.env.ADMIN_SESSION_SECRET?.trim();
  return sess && sess.length > 0 ? sess : null;
}

/** URL без NEXT_PUBLIC — не вшивается в клиентский билд; удобно для CapRover/Docker runtime. Source: https://supabase.com/docs/guides/api */
export function getSupabaseServiceConfig(): { url: string; key: string } | null {
  const url =
    process.env.SUPABASE_URL?.trim().replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "") ||
    "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  if (!url || !key) return null;
  return { url, key };
}

export function isSupabaseAdminConfigured(): boolean {
  return getSupabaseServiceConfig() !== null;
}
