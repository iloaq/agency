import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { AdminEmptyState, AdminPageHeader, AdminPanel, AdminStatusBadge } from "@/components/admin/admin-ui";
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

type LeadListRow = Pick<
  ServiceLeadAdminRow,
  | "id"
  | "created_at"
  | "service_slug"
  | "service_title"
  | "name"
  | "email"
  | "telegram"
  | "company"
  | "service_interest"
  | "status"
>;

export default async function AdminLeadsListPage() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("service_leads")
    .select("id, created_at, service_slug, service_title, name, email, telegram, company, service_interest, status")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = (error ? [] : data) as LeadListRow[];

  return (
    <div className="space-y-7">
      <AdminPageHeader
        eyebrow="CRM"
        title="Заявки"
        description="Все обращения из форм сайта. В списке показываем услугу, контакт, компанию и текущий статус."
      />

      {error ? (
        <AdminPanel className="p-5">
          <p className="text-sm leading-6 text-[#b42318]">Ошибка загрузки заявок: {error.message}</p>
        </AdminPanel>
      ) : null}

      <AdminPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-[#eee6dc] bg-[#fbfaf7] text-xs font-semibold uppercase tracking-[0.12em] text-[#77716a]">
              <tr>
                <th className="px-5 py-4">Дата</th>
                <th className="px-5 py-4">Клиент</th>
                <th className="px-5 py-4">Услуга</th>
                <th className="px-5 py-4">Контакт</th>
                <th className="px-5 py-4">Статус</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee6dc]">
              {rows.map((row) => {
                const contact = row.email || row.telegram || "не указан";
                const client = row.name || row.company || "Без имени";
                return (
                  <tr key={row.id} className="transition hover:bg-[#fbfaf7]">
                    <td className="whitespace-nowrap px-5 py-4 text-[#6b6b6b]">{formatDate(row.created_at)}</td>
                    <td className="max-w-[220px] px-5 py-4">
                      <p className="truncate font-semibold text-[#111111]" title={client}>
                        {client}
                      </p>
                      {row.company ? (
                        <p className="mt-1 truncate text-xs text-[#8a8177]" title={row.company}>
                          {row.company}
                        </p>
                      ) : null}
                    </td>
                    <td className="max-w-[260px] px-5 py-4">
                      <p className="truncate font-medium text-[#111111]" title={row.service_interest || row.service_title}>
                        {row.service_interest || row.service_title}
                      </p>
                      <p className="mt-1 truncate font-mono text-xs text-[#8a8177]" title={row.service_slug}>
                        {row.service_slug}
                      </p>
                    </td>
                    <td className="max-w-[220px] truncate px-5 py-4 font-mono text-xs text-[#5f5f5f]" title={contact}>
                      {contact}
                    </td>
                    <td className="px-5 py-4">
                      <AdminStatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/leads/${row.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#ded6ca] px-3 py-2 text-xs font-semibold text-[#111111] transition hover:border-[#6d4aff] hover:text-[#6d4aff]"
                      >
                        Открыть
                        <FiArrowUpRight className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && !error ? (
          <div className="p-5">
            <AdminEmptyState title="Заявок пока нет" description="Новые обращения появятся здесь после отправки формы." />
          </div>
        ) : null}
      </AdminPanel>
    </div>
  );
}
