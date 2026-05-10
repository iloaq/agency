import { AdminPanel } from "@/components/admin/admin-ui";
import type { SiteSettingsRow } from "@/lib/supabase/fetch-site-settings";
import { saveSiteSettings } from "./actions";

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

export function SiteSettingsForm({ row }: { row: SiteSettingsRow | null }) {
  return (
    <AdminPanel className="p-5 sm:p-6">
      <form action={saveSiteSettings} className="max-w-3xl space-y-6">
        <label className={labelClass}>
          Название бренда *
          <input className={inputClass} name="brand_name" required defaultValue={row?.brand_name ?? ""} />
        </label>

        <label className={labelClass}>
          Email *
          <input className={inputClass} name="email" type="email" required defaultValue={row?.email ?? ""} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Телефон для отображения *
            <input className={inputClass} name="phone_display" required defaultValue={row?.phone_display ?? ""} />
          </label>
          <label className={labelClass}>
            Телефон href (tel:...) *
            <input className={inputClass} name="phone_href" required defaultValue={row?.phone_href ?? ""} />
          </label>
        </div>

        <label className={labelClass}>
          Social JSON
          <textarea
            className={`${inputClass} min-h-[160px] resize-y font-mono text-xs leading-5`}
            name="social"
            defaultValue={jsonPretty(row?.social)}
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
          Сохранить настройки
        </button>
      </form>
    </AdminPanel>
  );
}
