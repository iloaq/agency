import { AdminPanel } from "@/components/admin/admin-ui";
import type { CaseStudyRow } from "@/lib/cases/case-study-types";
import { AdminDeleteTrigger } from "../admin-delete-button";
import { deleteCaseStudy, saveCaseStudy } from "./actions";

function jsonPretty(value: unknown, fallback: string): string {
  if (value === undefined || value === null) return fallback;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return fallback;
  }
}

const inputClass =
  "w-full rounded-[18px] border border-[#ded6ca] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9a9288] focus:border-[#6d4aff] focus:ring-4 focus:ring-[#6d4aff]/12";
const labelClass = "flex flex-col gap-2 text-sm font-semibold text-[#111111]";

export function CaseStudyForm({ row }: { row: CaseStudyRow | null }) {
  const isNew = !row;

  return (
    <div className="space-y-6">
      <AdminPanel className="p-5 sm:p-6">
        <form action={saveCaseStudy} className="space-y-6">
          {!isNew ? <input type="hidden" name="id" value={row.id} /> : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Slug *
              <input className={inputClass} name="slug" required defaultValue={row?.slug ?? ""} />
            </label>
            <label className={labelClass}>
              Порядок
              <input className={inputClass} name="sort_order" type="number" defaultValue={row?.sort_order ?? 0} />
            </label>
          </div>

          <label className={labelClass}>
            Название *
            <input className={inputClass} name="title" required defaultValue={row?.title ?? ""} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Сфера
              <input className={inputClass} name="sector" defaultValue={row?.sector ?? ""} />
            </label>
            <label className={labelClass}>
              Компания для внутреннего учета
              <input className={inputClass} name="company_name_internal" defaultValue={row?.company_name_internal ?? ""} />
            </label>
          </div>

          <label className={labelClass}>
            Контекст
            <textarea className={`${inputClass} min-h-[104px] resize-y leading-6`} name="context" defaultValue={row?.context ?? ""} />
          </label>

          <label className={labelClass}>
            Проблемы (JSON array of strings)
            <textarea
              className={`${inputClass} min-h-[132px] resize-y font-mono text-xs leading-5`}
              name="problems"
              defaultValue={jsonPretty(row?.problems, "[]")}
            />
          </label>

          <label className={labelClass}>
            Цель
            <textarea className={`${inputClass} min-h-[88px] resize-y leading-6`} name="goal" defaultValue={row?.goal ?? ""} />
          </label>

          <label className={labelClass}>
            Что сделали (JSON array of strings)
            <textarea
              className={`${inputClass} min-h-[132px] resize-y font-mono text-xs leading-5`}
              name="what_we_did"
              defaultValue={jsonPretty(row?.what_we_did, "[]")}
            />
          </label>

          <label className={labelClass}>
            Архитектурная схема
            <textarea
              className={`${inputClass} min-h-[88px] resize-y leading-6`}
              name="architecture_flow"
              defaultValue={row?.architecture_flow ?? ""}
            />
          </label>

          <label className={labelClass}>
            Stack (JSON object: frontend, backend, database, integrations)
            <textarea
              className={`${inputClass} min-h-[132px] resize-y font-mono text-xs leading-5`}
              name="stack"
              defaultValue={jsonPretty(row?.stack, "{}")}
            />
          </label>

          <label className={labelClass}>
            Результаты (JSON array of strings)
            <textarea
              className={`${inputClass} min-h-[132px] resize-y font-mono text-xs leading-5`}
              name="outcomes"
              defaultValue={jsonPretty(row?.outcomes, "[]")}
            />
          </label>

          <label className={labelClass}>
            Вывод
            <textarea
              className={`${inputClass} min-h-[104px] resize-y leading-6`}
              name="conclusion"
              defaultValue={row?.conclusion ?? ""}
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
            {isNew ? "Создать проект" : "Сохранить проект"}
          </button>
        </form>
      </AdminPanel>

      {!isNew ? (
        <AdminPanel className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-[#111111]">Удаление</h2>
              <p className="mt-1 text-sm leading-6 text-[#6b6b6b]">Удаление записи необратимо. Проверьте, что проект не используется на странице кейсов.</p>
            </div>
            <form id="case-delete-form" action={deleteCaseStudy}>
              <input type="hidden" name="id" value={row.id} />
            </form>
            <AdminDeleteTrigger formId="case-delete-form" />
          </div>
        </AdminPanel>
      ) : null}
    </div>
  );
}
