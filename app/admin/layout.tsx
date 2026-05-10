/**
 * Админка: /admin/login, защищённые маршруты — middleware + cookie.
 * Source: https://supabase.com/docs/guides/api/api-keys
 */
export default function AdminShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-violet-500/30">
      {children}
    </div>
  );
}
