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
    .select(
      "id, created_at, service_slug, service_title, name, email, phone, telegram, preferred_contact, company, status"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = (error ? [] : data) as Pick<
    ServiceLeadAdminRow,
    | "id"
    | "created_at"
    | "service_slug"
    | "service_title"
    | "name"
    | "email"
    | "phone"
    | "telegram"
    | "preferred_contact"
    | "company"
    | "status"
  >[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Лиды</h1>
      <p className="max-w-2xl text-sm text-[var(--fonts-grey)]">
        Заявки из форм (таблица <span className="font-mono text-xs">service_leads</span>).
      </p>
      {error ? (
        <p className="text-sm text-[var(--fonts-error)]">Ошибка загрузки: {error.message}</p>
      ) : null}
      <div className="overflow-x-auto rounded-[var(--rad-xl)] border border-[#DCD3C8] bg-[var(--bg-secondary)]">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-[#DCD3C8] bg-[var(--bg-quaternary)] text-[var(--fonts-grey)]">
            <tr>
              <th className="px-3 py-2 font-medium">Дата</th>
              <th className="px-3 py-2 font-medium">Услуга</th>
              <th className="px-3 py-2 font-medium">Имя</th>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Связь</th>
              <th className="px-3 py-2 font-medium">Статус</th>
              <th className="px-3 py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[#DCD3C8] last:border-0">
                <td className="whitespace-nowrap px-3 py-2 text-[var(--fonts-grey)]">
                  {formatDate(r.created_at)}
                </td>
                <td className="max-w-[200px] px-3 py-2">
                  <div className="truncate font-medium" title={r.service_title}>
                    {r.service_title}
                  </div>
                  <div className="truncate font-mono text-xs text-[var(--fonts-grey)]" title={r.service_slug}>
                    {r.service_slug}
                  </div>
                </td>
                <td className="max-w-[140px] truncate px-3 py-2">{r.name ?? "—"}</td>
                <td className="max-w-[180px] truncate px-3 py-2 font-mono text-xs">{r.email ?? "—"}</td>
                <td className="px-3 py-2 text-xs">{r.preferred_contact ?? "—"}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2 text-right">
                  <Link
                    href={`/admin/leads/${r.id}`}
                    className="text-[var(--accent-violet)] underline-offset-2 hover:underline"
                  >
                    Открыть
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && !error ? (
          <p className="p-4 text-sm text-[var(--fonts-grey)]">Пока нет заявок.</p>
        ) : null}
      </div>
    </div>
  );
}
