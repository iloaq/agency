import Link from "next/link";
import { getAdminOverviewStats } from "@/lib/admin/admin-overview-stats";

function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/60 p-5 shadow-lg shadow-black/20">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-white">{value}</p>
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export default async function AdminHomePage() {
  const stats = await getAdminOverviewStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Обзор</h1>
        <p className="mt-1 max-w-xl text-sm text-slate-400">
          Метрики по Supabase: заявки, контент. Публичный сайт читает данные через anon и RLS.
        </p>
      </div>

      {stats ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Лиды всего" value={stats.leadsTotal} hint={`Новых: ${stats.leadsNew}`} />
          <MetricCard label="Новые заявки" value={stats.leadsNew} hint="status = new" />
          <MetricCard label="Кейсы" value={stats.casesTotal} />
          <MetricCard label="Услуги" value={stats.servicesTotal} />
        </section>
      ) : (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90">
          Не удалось загрузить метрики: проверьте{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> и{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code>.
        </p>
      )}

      {stats ? (
        <p className="text-xs text-slate-500">
          Строк в <span className="font-mono">site_settings</span>: {stats.siteSettingsRows}
        </p>
      ) : null}

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Разделы</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: "/admin/leads", title: "Лиды", desc: "Заявки из форм" },
            { href: "/admin/cases", title: "Кейсы", desc: "case_studies" },
            { href: "/admin/services", title: "Услуги", desc: "services" },
            { href: "/admin/site-settings", title: "Настройки сайта", desc: "site_settings" },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-slate-700/80 bg-slate-900/40 p-4 transition hover:border-violet-500/40 hover:bg-slate-900/70"
            >
              <p className="font-medium text-white group-hover:text-violet-200">{card.title}</p>
              <p className="mt-1 text-sm text-slate-500">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
