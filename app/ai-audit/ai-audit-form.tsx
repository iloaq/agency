"use client";

import { useState } from "react";

const fields = [
  {
    id: "name",
    label: "Имя",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    id: "contact",
    label: "Телефон / Telegram",
    type: "text",
    autoComplete: "tel",
    required: true,
  },
  {
    id: "company",
    label: "Компания / проект",
    type: "text",
    autoComplete: "organization",
    required: true,
  },
  {
    id: "industry",
    label: "Сфера бизнеса",
    type: "text",
    autoComplete: "organization-title",
    required: true,
  },
  {
    id: "role",
    label: "Должность",
    type: "text",
    autoComplete: "organization-title",
    required: true,
  },
] as const;

const labelClass = "grid min-w-0 gap-2 text-sm font-semibold text-[#121212]";
const fieldClass =
  "min-h-14 w-full min-w-0 rounded-[18px] border border-[#E6E0D8] bg-white px-4 text-base font-medium text-[#121212] outline-none transition placeholder:text-[#8B8B8B] focus:border-[#6D4AFF] focus:ring-4 focus:ring-[#6D4AFF]/10";

export function AiAuditForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid min-w-0 gap-4 rounded-[28px] border border-[#E6E0D8] bg-[#FDFCF9] p-5 text-[#121212] shadow-[0_14px_42px_rgba(55,45,35,0.07)] sm:p-6 lg:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        event.currentTarget.reset();
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.id} className={labelClass}>
            {field.label}
            <input
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              className={fieldClass}
            />
          </label>
        ))}
      </div>

      <label className={labelClass}>
        Что хотите разобрать?
        <textarea
          name="process"
          required
          minLength={20}
          rows={5}
          className={`${fieldClass} min-h-32 resize-y py-4`}
          placeholder="Например: заявки, CRM, менеджеры, документы, клиентские вопросы, база знаний, обучение сотрудников."
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex min-h-14 w-full min-w-0 items-center justify-center rounded-[18px] bg-[#18181B] px-6 text-center text-base font-semibold leading-6 text-white shadow-[0_14px_34px_rgba(24,24,27,0.18)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        <span className="min-w-0 max-w-full whitespace-normal break-words">
          Получить бесплатную консультацию-аудит
        </span>
      </button>

      <p className="text-sm leading-6 text-[#6B6B6B]">
        20 минут общения. Таблица с выводами — в течение 2 дней после аудита.
      </p>

      {submitted ? (
        <p
          className="rounded-[20px] border border-[#B8FF5C]/70 bg-[#B8FF5C]/30 px-4 py-3 text-sm font-semibold leading-6 text-[#121212]"
          role="status"
          aria-live="polite"
        >
          Заявка отправлена. Мы свяжемся с вами, чтобы уточнить процессы для разбора.
        </p>
      ) : null}
    </form>
  );
}
