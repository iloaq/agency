import type { SiteSettingsRow } from "@/lib/supabase/fetch-site-settings";
import { saveSiteSettings } from "./actions";

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

export function SiteSettingsForm({ row }: { row: SiteSettingsRow | null }) {
  return (
    <form action={saveSiteSettings} className="max-w-xl space-y-6">
      <label className={labelClass}>
        Brand name *
        <input className={inputClass} name="brand_name" required defaultValue={row?.brand_name ?? ""} />
      </label>
      <label className={labelClass}>
        Email *
        <input className={inputClass} name="email" type="email" required defaultValue={row?.email ?? ""} />
      </label>
      <label className={labelClass}>
        Phone display *
        <input className={inputClass} name="phone_display" required defaultValue={row?.phone_display ?? ""} />
      </label>
      <label className={labelClass}>
        Phone href (tel:...) *
        <input className={inputClass} name="phone_href" required defaultValue={row?.phone_href ?? ""} />
      </label>
      <label className={labelClass}>
        Social (JSON object)
        <textarea
          className={`${inputClass} min-h-[120px] font-mono text-xs`}
          name="social"
          defaultValue={jsonPretty(row?.social)}
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
        Сохранить
      </button>
    </form>
  );
}
