/**
 * Один Project URL: `SUPABASE_URL` или `NEXT_PUBLIC_SUPABASE_URL` (достаточно одного).
 * Публичный ключ: `SUPABASE_ANON_KEY` / `SUPABASE_PUBLISHABLE_KEY` или NEXT_PUBLIC_* (один из пары).
 *
 * Прямой доступ `process.env.NEXT_PUBLIC_*` в прод-сборке Next подставляет значение **на момент билда**
 * (часто пусто в CI) — в CapRover runtime не подхватывается. Имена `NEXT_PUBLIC_*` ниже читаются через
 * декодирование, чтобы bundler не заинлайнил пустую строку.
 * Source: https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser
 * Source: https://supabase.com/docs/guides/api/api-keys
 */

const B64_NEXT_PUBLIC_SUPABASE_URL = "TkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJM";
const B64_NEXT_PUBLIC_SUPABASE_ANON_KEY = "TkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk=";
const B64_NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "TkVYVF9QVUJMSUNfU1VQQUJBU0VfUFVCTElTSEFCTEVfS0VZ";

function envKeyFromB64(b64: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(b64, "base64").toString("utf8");
  }
  return atob(b64);
}

/** Значение из `process.env` по имени, вычисленному в runtime (обход инлайна NEXT_PUBLIC_*). */
function runtimeProcessEnv(name: string): string {
  const v = process.env[name];
  return typeof v === "string" ? v.trim() : "";
}

export function getSupabaseProjectUrl(): string | null {
  const fromServerOnly = process.env.SUPABASE_URL?.trim() || "";
  if (fromServerOnly) return fromServerOnly.replace(/\/+$/, "");

  const fromNextPublic =
    runtimeProcessEnv(envKeyFromB64(B64_NEXT_PUBLIC_SUPABASE_URL)) ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "";
  const url = fromNextPublic.replace(/\/+$/, "");
  return url.length > 0 ? url : null;
}

export function getSupabaseAnonOrPublishableKey(): string | null {
  const k =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    runtimeProcessEnv(envKeyFromB64(B64_NEXT_PUBLIC_SUPABASE_ANON_KEY)) ||
    runtimeProcessEnv(envKeyFromB64(B64_NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    "";
  return k.length > 0 ? k : null;
}
