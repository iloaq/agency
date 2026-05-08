import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { ServiceRow } from "@/lib/supabase/fetch-services";

export default async function AdminServicesListPage() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("services")
    .select("id, slug, title, published, sort_order, path")
    .order("sort_order", { ascending: true });

  const rows = (error ? [] : data) as Pick<ServiceRow, "id" | "slug" | "title" | "published" | "sort_order" | "path">[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold">Услуги</h1>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-[var(--accent-violet)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Новая услуга
        </Link>
      </div>
      {error ? (
        <p className="text-sm text-[var(--fonts-error)]">Ошибка загрузки: {error.message}</p>
      ) : null}
      <div className="overflow-x-auto rounded-[var(--rad-xl)] border border-[#DCD3C8] bg-[var(--bg-secondary)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#DCD3C8] bg-[var(--bg-quaternary)] text-[var(--fonts-grey)]">
            <tr>
              <th className="px-3 py-2 font-medium">Sort</th>
              <th className="px-3 py-2 font-medium">Slug</th>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">Pub</th>
              <th className="px-3 py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[#DCD3C8] last:border-0">
                <td className="px-3 py-2">{r.sort_order}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.slug}</td>
                <td className="max-w-[280px] truncate px-3 py-2">{r.title}</td>
                <td className="px-3 py-2">{r.published ? "да" : "нет"}</td>
                <td className="px-3 py-2 text-right">
                  <Link
                    href={`/admin/services/${r.id}`}
                    className="text-[var(--accent-violet)] underline-offset-2 hover:underline"
                  >
                    Изменить
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && !error ? (
          <p className="p-4 text-sm text-[var(--fonts-grey)]">Нет строк в таблице.</p>
        ) : null}
      </div>
    </div>
  );
}
