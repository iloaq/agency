import type { CaseStudyRow } from "@/lib/cases/case-study-types";
import { AdminDeleteTrigger } from "../admin-delete-button";
import { deleteCaseStudy, saveCaseStudy } from "./actions";

function jsonPretty(v: unknown, fallback: string): string {
  if (v === undefined || v === null) return fallback;
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return fallback;
  }
}

const inputClass =
  "w-full rounded-[var(--rad-lg)] border border-[#DCD3C8] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none ring-[var(--accent-violet)] focus:ring-2";
const labelClass = "flex flex-col gap-1 text-sm font-medium";

export function CaseStudyForm({ row }: { row: CaseStudyRow | null }) {
  const isNew = !row;

  return (
    <div className="space-y-8">
      <form action={saveCaseStudy} className="space-y-6">
        {!isNew ? <input type="hidden" name="id" value={row.id} /> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Slug *
            <input className={inputClass} name="slug" required defaultValue={row?.slug ?? ""} />
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
          Title *
          <input className={inputClass} name="title" required defaultValue={row?.title ?? ""} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Sector
            <input className={inputClass} name="sector" defaultValue={row?.sector ?? ""} />
          </label>
          <label className={labelClass}>
            Company (internal)
            <input
              className={inputClass}
              name="company_name_internal"
              defaultValue={row?.company_name_internal ?? ""}
            />
          </label>
        </div>

        <label className={labelClass}>
          Context
          <textarea className={`${inputClass} min-h-[88px]`} name="context" defaultValue={row?.context ?? ""} />
        </label>

        <label className={labelClass}>
          Problems (JSON array of strings)
          <textarea
            className={`${inputClass} min-h-[120px] font-mono text-xs`}
            name="problems"
            defaultValue={jsonPretty(row?.problems, "[]")}
          />
        </label>

        <label className={labelClass}>
          Goal
          <textarea className={`${inputClass} min-h-[72px]`} name="goal" defaultValue={row?.goal ?? ""} />
        </label>

        <label className={labelClass}>
          What we did (JSON array of strings)
          <textarea
            className={`${inputClass} min-h-[120px] font-mono text-xs`}
            name="what_we_did"
            defaultValue={jsonPretty(row?.what_we_did, "[]")}
          />
        </label>

        <label className={labelClass}>
          Architecture flow
          <textarea
            className={`${inputClass} min-h-[72px]`}
            name="architecture_flow"
            defaultValue={row?.architecture_flow ?? ""}
          />
        </label>

        <label className={labelClass}>
          Stack (JSON object: frontend, backend, database, integrations)
          <textarea
            className={`${inputClass} min-h-[120px] font-mono text-xs`}
            name="stack"
            defaultValue={jsonPretty(row?.stack, "{}")}
          />
        </label>

        <label className={labelClass}>
          Outcomes (JSON array of strings)
          <textarea
            className={`${inputClass} min-h-[120px] font-mono text-xs`}
            name="outcomes"
            defaultValue={jsonPretty(row?.outcomes, "[]")}
          />
        </label>

        <label className={labelClass}>
          Conclusion
          <textarea
            className={`${inputClass} min-h-[88px]`}
            name="conclusion"
            defaultValue={row?.conclusion ?? ""}
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
          <form id="case-delete-form" action={deleteCaseStudy}>
            <input type="hidden" name="id" value={row.id} />
          </form>
          <AdminDeleteTrigger formId="case-delete-form" />
        </div>
      ) : null}
    </div>
  );
}
