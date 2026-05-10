import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { ServiceLeadAdminRow } from "@/lib/leads/service-lead-admin-types";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminLeadsListPage() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("service_leads")
    .select("id, created_at, service_slug, service_title, name, email, phone, telegram, company, status")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = (error ? [] : data) as Pick<
    ServiceLeadAdminRow,
    "id" | "created_at" | "service_slug" | "service_title" | "name" | "email" | "phone" | "telegram" | "company" | "status"
  >[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Лиды</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Заявки из форм. Колонка «предпочитаемая связь» появится после миграции{" "}
          <span className="font-mono text-xs text-slate-500">service_leads_preferred_contact.sql</span>.
        </p>
      </div>
      {error ? (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          Ошибка загрузки: {error.message}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/50 shadow-lg shadow-black/20">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-700/80 bg-slate-800/50 text-slate-400">
            <tr>
              <th className="px-3 py-3 font-medium">Дата</th>
              <th className="px-3 py-3 font-medium">Услуга</th>
              <th className="px-3 py-3 font-medium">Имя</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Статус</th>
              <th className="px-3 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-200">
            {rows.map((r) => (
              <tr key={r.id} className="transition hover:bg-slate-800/30">
                <td className="whitespace-nowrap px-3 py-3 text-slate-400">{formatDate(r.created_at)}</td>
                <td className="max-w-[200px] px-3 py-3">
                  <div className="truncate font-medium text-white" title={r.service_title}>
                    {r.service_title}
                  </div>
                  <div className="truncate font-mono text-xs text-slate-500" title={r.service_slug}>
                    {r.service_slug}
                  </div>
                </td>
                <td className="max-w-[140px] truncate px-3 py-3">{r.name ?? "—"}</td>
                <td className="max-w-[200px] truncate px-3 py-3 font-mono text-xs text-slate-300">{r.email ?? "—"}</td>
                <td className="px-3 py-3">
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300">
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-right">
                  <Link
                    href={`/admin/leads/${r.id}`}
                    className="font-medium text-violet-400 underline-offset-2 hover:text-violet-300 hover:underline"
                  >
                    Открыть
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && !error ? (
          <p className="p-6 text-sm text-slate-500">Пока нет заявок.</p>
        ) : null}
      </div>
    </div>
  );
}
