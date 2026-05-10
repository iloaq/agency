import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { AdminEmptyState, AdminPageHeader, AdminPanel, AdminPrimaryLink, AdminStatusBadge } from "@/components/admin/admin-ui";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { CaseStudyRow } from "@/lib/cases/case-study-types";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", { dateStyle: "short" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminCasesListPage() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("id, slug, title, published, sort_order, created_at")
    .order("sort_order", { ascending: true });

  const rows = (error ? [] : data) as Pick<
    CaseStudyRow,
    "id" | "slug" | "title" | "published" | "sort_order" | "created_at"
  >[];

  return (
    <div className="space-y-7">
      <AdminPageHeader
        eyebrow="Контент"
        title="Проекты"
        description="Разборы задач для страницы кейсов. Не используйте неподтверждённые цифры и выдуманные результаты."
        action={<AdminPrimaryLink href="/admin/cases/new">Новый проект</AdminPrimaryLink>}
      />

      {error ? (
        <AdminPanel className="p-5">
          <p className="text-sm leading-6 text-[#b42318]">Ошибка загрузки проектов: {error.message}</p>
        </AdminPanel>
      ) : null}

      <AdminPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[#eee6dc] bg-[#fbfaf7] text-xs font-semibold uppercase tracking-[0.12em] text-[#77716a]">
              <tr>
                <th className="px-5 py-4">Порядок</th>
                <th className="px-5 py-4">Проект</th>
                <th className="px-5 py-4">Создан</th>
                <th className="px-5 py-4">Статус</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee6dc]">
              {rows.map((row) => (
                <tr key={row.id} className="transition hover:bg-[#fbfaf7]">
                  <td className="px-5 py-4 font-mono text-xs text-[#8a8177]">{row.sort_order}</td>
                  <td className="max-w-[360px] px-5 py-4">
                    <p className="truncate font-semibold text-[#111111]" title={row.title}>
                      {row.title}
                    </p>
                    <p className="mt-1 truncate font-mono text-xs text-[#8a8177]" title={row.slug}>
                      {row.slug}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#6b6b6b]">{formatDate(row.created_at)}</td>
                  <td className="px-5 py-4">
                    <AdminStatusBadge published={row.published} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/cases/${row.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ded6ca] px-3 py-2 text-xs font-semibold text-[#111111] transition hover:border-[#6d4aff] hover:text-[#6d4aff]"
                    >
                      Изменить
                      <FiArrowUpRight className="size-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && !error ? (
          <div className="p-5">
            <AdminEmptyState title="Проектов пока нет" description="Добавьте первый разбор задачи для страницы кейсов." />
          </div>
        ) : null}
      </AdminPanel>
    </div>
  );
}
