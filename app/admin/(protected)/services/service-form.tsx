import type { ServiceRow } from "@/lib/supabase/fetch-services";
import { AdminDeleteTrigger } from "../admin-delete-button";
import { deleteService, saveService } from "./actions";

const inputClass =
  "w-full rounded-[var(--rad-lg)] border border-[#DCD3C8] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none ring-[var(--accent-violet)] focus:ring-2";
const labelClass = "flex flex-col gap-1 text-sm font-medium";

function jsonPretty(v: unknown): string {
  try {
    return JSON.stringify(v ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export function ServiceForm({ row }: { row: ServiceRow | null }) {
  const isNew = !row;

  return (
    <div className="space-y-8">
      <form action={saveService} className="space-y-6">
        {!isNew ? <input type="hidden" name="id" value={row.id} /> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Slug *
            <input className={inputClass} name="slug" required defaultValue={row?.slug ?? ""} />
          </label>
          <label className={labelClass}>
            Path *
            <input className={inputClass} name="path" required defaultValue={row?.path ?? ""} />
          </label>
        </div>

        <label className={labelClass}>
          Title *
          <input className={inputClass} name="title" required defaultValue={row?.title ?? ""} />
        </label>

        <label className={labelClass}>
          Short description *
          <textarea
            className={`${inputClass} min-h-[80px]`}
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
            Sort order
            <input
              className={inputClass}
              name="sort_order"
              type="number"
              defaultValue={row?.sort_order ?? 0}
            />
          </label>
        </div>

        <label className={labelClass}>
          SEO description *
          <textarea
            className={`${inputClass} min-h-[88px]`}
            name="seo_description"
            required
            defaultValue={row?.seo_description ?? ""}
          />
        </label>

        <label className={labelClass}>
          Content (JSON object — hero, pains, faq и т.д.)
          <textarea
            className={`${inputClass} min-h-[200px] font-mono text-xs`}
            name="content"
            defaultValue={jsonPretty(row?.content)}
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="published" defaultChecked={row?.published ?? false} className="size-4" />
          Published
        </label>

        <button
          type="submit"
          className="rounded-full bg-[var(--buttons-black-normal)] px-6 py-2.5 text-sm font-semibold text-[var(--fonts-white)] hover:bg-[var(--buttons-black-hover)]"
        >
          {isNew ? "Создать" : "Сохранить"}
        </button>
      </form>

      {!isNew ? (
        <div className="border-t border-[#DCD3C8] pt-6">
          <form id="service-delete-form" action={deleteService}>
            <input type="hidden" name="id" value={row.id} />
          </form>
          <AdminDeleteTrigger formId="service-delete-form" />
        </div>
      ) : null}
    </div>
  );
}
