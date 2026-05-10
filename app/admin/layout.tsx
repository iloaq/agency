/**
 * Admin area: /admin/login and protected routes use cookie session from middleware.
 * Supabase data is read through server-side service role helpers only.
 */
export default function AdminShellLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f6f3ee] text-[#111111] antialiased">{children}</div>;
}
