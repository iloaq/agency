/**
 * Админка контента Supabase: вход /admin/login (ADMIN_PASSWORD / ADMIN_SECRET / ADMIN_SESSION_SECRET),
 * мутации только на сервере через SUPABASE_SERVICE_ROLE_KEY. Подробнее — .env.example
 * Source: https://supabase.com/docs/guides/api/api-keys
 */
export default function AdminShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[50vh] bg-[var(--bg-primary)] text-[var(--fonts-black)] antialiased">{children}</div>
  );
}
