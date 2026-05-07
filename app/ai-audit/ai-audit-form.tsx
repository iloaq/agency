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

export function AiAuditForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-[28px] border border-[#E6E0D8] bg-white p-5 shadow-[0_24px_70px_rgba(55,45,35,0.12)] sm:p-6 lg:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        event.currentTarget.reset();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.id} className="grid gap-2 text-sm font-semibold text-[#121212]">
            {field.label}
            <input
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              className="min-h-14 rounded-[20px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base font-medium text-[#121212] outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
            />
          </label>
        ))}
      </div>

      <label className="grid gap-2 text-sm font-semibold text-[#121212]">
        Что хотите разобрать?
        <textarea
          name="process"
          required
          minLength={20}
          rows={5}
          className="min-h-32 resize-y rounded-[22px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 py-4 text-base font-medium text-[#121212] outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
          placeholder="Например: заявки, CRM, менеджеры, документы, клиентские вопросы, база знаний, обучение сотрудников."
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex min-h-14 w-full min-w-0 items-center justify-center rounded-[999px] bg-[#18181B] px-6 text-center text-base font-semibold leading-6 text-white transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        <span className="min-w-0 max-w-full whitespace-normal break-words">
          Получить бесплатную консультацию-аудит
        </span>
      </button>

      <p className="text-sm leading-6 text-[#6B6B6B]">
        40 минут общения. Таблица с выводами — в течение 2 дней после аудита.
      </p>

      {submitted ? (
        <p
          className="rounded-[20px] border border-[#B8FF5C]/70 bg-[#B8FF5C]/30 px-4 py-3 text-sm font-semibold leading-6 text-[#121212]"
          role="status"
          aria-live="polite"
        >
          Заявка отправлена. Мы свяжемся с вами, чтобы уточнить процессы для аудита.
        </p>
      ) : null}
    </form>
  );
}
