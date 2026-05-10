import { AdminPanel } from "@/components/admin/admin-ui";
import type { ServiceRow } from "@/lib/supabase/fetch-services";
import { AdminDeleteTrigger } from "../admin-delete-button";
import { deleteService, saveService } from "./actions";

const inputClass =
  "w-full rounded-[18px] border border-[#ded6ca] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9a9288] focus:border-[#6d4aff] focus:ring-4 focus:ring-[#6d4aff]/12";
const labelClass = "flex flex-col gap-2 text-sm font-semibold text-[#111111]";

function jsonPretty(value: unknown): string {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export function ServiceForm({ row }: { row: ServiceRow | null }) {
  const isNew = !row;

  return (
    <div className="space-y-6">
      <AdminPanel className="p-5 sm:p-6">
        <form action={saveService} className="space-y-6">
          {!isNew ? <input type="hidden" name="id" value={row.id} /> : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Slug *
              <input className={inputClass} name="slug" required defaultValue={row?.slug ?? ""} placeholder="websites" />
            </label>
            <label className={labelClass}>
              Path *
              <input className={inputClass} name="path" required defaultValue={row?.path ?? ""} placeholder="/services/websites" />
            </label>
          </div>

          <label className={labelClass}>
            Название *
            <input className={inputClass} name="title" required defaultValue={row?.title ?? ""} />
          </label>

          <label className={labelClass}>
            Короткое описание *
            <textarea
              className={`${inputClass} min-h-[96px] resize-y leading-6`}
              name="short_description"
              required
              defaultValue={row?.short_description ?? ""}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              SEO title *
              <input className={inputClass} name="seo_title" required defaultValue={row?.seo_title ?? ""} />
            </label>
            <label className={labelClass}>
              Порядок
              <input className={inputClass} name="sort_order" type="number" defaultValue={row?.sort_order ?? 0} />
            </label>
          </div>

          <label className={labelClass}>
            SEO description *
            <textarea
              className={`${inputClass} min-h-[104px] resize-y leading-6`}
              name="seo_description"
              required
              defaultValue={row?.seo_description ?? ""}
            />
          </label>

          <label className={labelClass}>
            Content JSON
            <textarea
              className={`${inputClass} min-h-[260px] resize-y font-mono text-xs leading-5`}
              name="content"
              defaultValue={jsonPretty(row?.content)}
            />
          </label>

          <label className="flex items-center gap-3 rounded-[18px] border border-[#ded6ca] bg-[#fbfaf7] px-4 py-3 text-sm font-semibold text-[#111111]">
            <input type="checkbox" name="published" defaultChecked={row?.published ?? false} className="size-4 accent-[#6d4aff]" />
            Опубликовано
          </label>

          <button
            type="submit"
            className="rounded-full bg-[#18181b] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d4aff]"
          >
            {isNew ? "Создать услугу" : "Сохранить услугу"}
          </button>
        </form>
      </AdminPanel>

      {!isNew ? (
        <AdminPanel className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-[#111111]">Удаление</h2>
              <p className="mt-1 text-sm leading-6 text-[#6b6b6b]">Удаление записи необратимо. Проверьте, что страница больше не используется.</p>
            </div>
            <form id="service-delete-form" action={deleteService}>
              <input type="hidden" name="id" value={row.id} />
            </form>
            <AdminDeleteTrigger formId="service-delete-form" />
          </div>
        </AdminPanel>
      ) : null}
    </div>
  );
}
