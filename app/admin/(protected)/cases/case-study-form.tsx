import { AdminPanel } from "@/components/admin/admin-ui";
import type { CaseStudyRow } from "@/lib/cases/case-study-types";
import { AdminDeleteTrigger } from "../admin-delete-button";
import { deleteCaseStudy, saveCaseStudy } from "./actions";

function lines(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value.filter((x): x is string => typeof x === "string" && x.trim().length > 0).join("\n");
}

function stackValue(value: unknown, key: "frontend" | "backend" | "database" | "integrations"): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const stack = value as Record<string, unknown>;
  return typeof stack[key] === "string" ? stack[key] : "";
}

const inputClass =
  "w-full rounded-[18px] border border-[#ded6ca] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9a9288] focus:border-[#6d4aff] focus:ring-4 focus:ring-[#6d4aff]/12";
const labelClass = "flex flex-col gap-2 text-sm font-semibold text-[#111111]";
const hintClass = "text-xs font-normal leading-5 text-[#7c746b]";

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
            Где терялось время / контроль / заявка
            <textarea
              className={`${inputClass} min-h-[132px] resize-y leading-6`}
              name="problems"
              defaultValue={lines(row?.problems)}
              placeholder={"Каждый пункт с новой строки\nНапример: заявки приходили из Telegram и сайта, но не фиксировались в CRM"}
            />
            <span className={hintClass}>Один пункт на строку. В базу сохранится как JSON-массив.</span>
          </label>

          <label className={labelClass}>
            Цель
            <textarea className={`${inputClass} min-h-[88px] resize-y leading-6`} name="goal" defaultValue={row?.goal ?? ""} />
          </label>

          <label className={labelClass}>
            Что можно собрать / что сделали
            <textarea
              className={`${inputClass} min-h-[132px] resize-y leading-6`}
              name="what_we_did"
              defaultValue={lines(row?.what_we_did)}
              placeholder={"Каждый пункт с новой строки\nНапример: маршрут заявки сайт → CRM → ответственный → follow-up"}
            />
            <span className={hintClass}>Пиши фактически: без выдуманных цифр, клиентов и результатов.</span>
          </label>

          <label className={labelClass}>
            Архитектурная схема (текст)
            <textarea
              className={`${inputClass} min-h-[88px] resize-y leading-6`}
              name="architecture_flow"
              defaultValue={row?.architecture_flow ?? ""}
            />
            <span className={hintClass}>
              Показывается справа в hero, если нет URL картинки ниже.
            </span>
          </label>

          <label className={labelClass}>
            Схема потока — URL картинки
            <input
              className={inputClass}
              name="architecture_flow_image_url"
              type="url"
              inputMode="url"
              placeholder="https://…"
              defaultValue={row?.architecture_flow_image_url ?? ""}
            />
            <span className={hintClass}>
              Публичная ссылка (Supabase Storage или CDN). Если заполнено — на сайте вместо текстового блока «Маршрут проекта».
            </span>
          </label>

          <div className="space-y-3 rounded-[22px] border border-[#ded6ca] bg-[#fbfaf7] p-4">
            <div>
              <p className="text-sm font-semibold text-[#111111]">Какие системы связать / стек</p>
              <p className="mt-1 text-xs leading-5 text-[#7c746b]">Заполняйте только то, что можно показать публично. В базу сохранится объект `stack`.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Frontend / интерфейс
                <input className={inputClass} name="stack_frontend" defaultValue={stackValue(row?.stack, "frontend")} />
              </label>
              <label className={labelClass}>
                Backend / логика
                <input className={inputClass} name="stack_backend" defaultValue={stackValue(row?.stack, "backend")} />
              </label>
              <label className={labelClass}>
                База данных
                <input className={inputClass} name="stack_database" defaultValue={stackValue(row?.stack, "database")} />
              </label>
              <label className={labelClass}>
                Интеграции
                <input className={inputClass} name="stack_integrations" defaultValue={stackValue(row?.stack, "integrations")} />
              </label>
            </div>
          </div>

          <label className={labelClass}>
            Что станет проще после запуска
            <textarea
              className={`${inputClass} min-h-[132px] resize-y leading-6`}
              name="outcomes"
              defaultValue={lines(row?.outcomes)}
              placeholder={"Каждый пункт с новой строки\nНапример: менеджер видит источник, статус и следующий шаг по заявке"}
            />
            <span className={hintClass}>Если цифр нет, описывай изменения качественно: скорость, контроль, прозрачность, меньше ручной работы.</span>
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
