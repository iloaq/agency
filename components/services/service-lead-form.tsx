"use client";

import { useRef, useState } from "react";
import { getClientId } from "@/lib/leads/analytics-client";
import { submitLead } from "@/lib/leads/submit-lead";
import { normalizeServiceLead, validateServiceLead } from "@/lib/leads/validate-service-lead";

type FormState = "idle" | "loading" | "success" | "error";

const serviceInterestOptions = [
  "Сайт для бизнеса",
  "Веб-сервис или личный кабинет",
  "Telegram-бот",
  "CRM и интеграции",
  "AI-автоматизация",
  "SEO",
  "Fintech-разработка",
  "Пока не уверен",
] as const;

const projectStageOptions = [
  "Есть идея, нужна структура",
  "Есть ТЗ или прототип",
  "Есть текущий сайт или система",
  "Нужно доработать существующее",
  "Нужно запустить MVP",
] as const;

const budgetBandOptions = [
  "Пока не определён",
  "Нужна оценка после разбора",
  "До 1 млн ₸",
  "1–3 млн ₸",
  "3+ млн ₸",
] as const;

const preferredContactOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Телефон" },
  { value: "telegram", label: "Telegram" },
] as const;

const labelClass = "grid min-w-0 gap-2 text-sm font-semibold text-[#121212]";
const fieldClass =
  "min-h-14 w-full min-w-0 rounded-[18px] border border-[#E6E0D8] bg-white px-4 text-base text-[#121212] outline-none transition placeholder:text-[#8B8B8B] focus:border-[#6D4AFF] focus:ring-4 focus:ring-[#6D4AFF]/10";

export function ServiceLeadForm({
  serviceSlug,
  serviceTitle,
}: {
  serviceSlug: string;
  serviceTitle: string;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const lastSubmitAt = useRef(0);

  return (
    <form
      className="grid min-w-0 gap-4 rounded-[28px] border border-[#E6E0D8] bg-[#FDFCF9] p-5 text-[#121212] shadow-[0_14px_42px_rgba(72,57,41,0.06)] sm:p-6 lg:p-8"
      onSubmit={async (event) => {
        event.preventDefault();

        const now = Date.now();
        if (now - lastSubmitAt.current < 6000) {
          setState("error");
          setMessage("Заявка уже отправляется. Подождите несколько секунд.");
          return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);
        const url = new URL(window.location.href);
        const lead = normalizeServiceLead({
          ...Object.fromEntries(formData.entries()),
          source_page: url.href,
          utm_source: url.searchParams.get("utm_source") ?? "",
          utm_medium: url.searchParams.get("utm_medium") ?? "",
          utm_campaign: url.searchParams.get("utm_campaign") ?? "",
          utm_content: url.searchParams.get("utm_content") ?? "",
          utm_term: url.searchParams.get("utm_term") ?? "",
          client_id: getClientId(),
        });
        const validationError = validateServiceLead(lead);

        if (validationError) {
          setState("error");
          setMessage(validationError);
          return;
        }

        lastSubmitAt.current = now;
        setState("loading");
        setMessage("");

        const result = await submitLead(lead);

        if (!result.ok) {
          setState("error");
          setMessage(result.message);
          return;
        }

        setState("success");
        setMessage("Заявка отправлена. Мы изучим задачу и свяжемся с вами.");
        form.reset();
      }}
    >
      <input type="hidden" name="service_slug" value={serviceSlug} readOnly />
      <input type="hidden" name="service_title" value={serviceTitle} readOnly />
      <input type="hidden" name="source_page" value="" readOnly />
      <input type="hidden" name="utm_source" value="" readOnly />
      <input type="hidden" name="utm_medium" value="" readOnly />
      <input type="hidden" name="utm_campaign" value="" readOnly />
      <input type="hidden" name="utm_content" value="" readOnly />
      <input type="hidden" name="utm_term" value="" readOnly />
      <input type="hidden" name="client_id" value="" readOnly />
      <label className="sr-only">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Имя
          <input
            name="name"
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Телефон
          <input
            name="phone"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Telegram
          <input
            name="telegram"
            autoComplete="username"
            placeholder="@username"
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Email *
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        Предпочитаемый способ связи *
        <select name="preferred_contact" required className={fieldClass} defaultValue="email">
          {preferredContactOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Компания
        <input
          name="company"
          autoComplete="organization"
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Интересует услуга
          <select
            name="service_interest"
            className={fieldClass}
          >
            <option value="">Выберите, если понятно</option>
            {serviceInterestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Стадия проекта
          <select
            name="project_stage"
            className={fieldClass}
          >
            <option value="">Выберите, если понятно</option>
            {projectStageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Бюджетный диапазон
          <select
            name="budget_band"
            className={fieldClass}
          >
            <option value="">Можно не указывать</option>
            {budgetBandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClass}>
        Сообщение
        <textarea
          name="message"
          minLength={10}
          rows={5}
          placeholder="Опишите задачу: что хотите автоматизировать, какая CRM или система уже есть, где сейчас теряется время."
          className={`${fieldClass} min-h-36 resize-y py-4`}
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading" || state === "success"}
        className="mt-2 inline-flex min-h-14 w-full items-center justify-center rounded-[18px] bg-[#18181B] px-6 text-base font-bold text-white shadow-[0_14px_34px_rgba(24,24,27,0.18)] transition hover:bg-[#2B2B31] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        {state === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>

      <p className="text-sm leading-6 text-[#6B6B6B]">
        Обязательны: email, сообщение (от 10 символов), предпочитаемый способ связи. Телефон и Telegram — по
        необходимости (если выбран соответствующий способ — поле нужно заполнить).
      </p>

      {message ? (
        <p
          className={[
            "rounded-[18px] px-4 py-3 text-sm font-semibold leading-6",
            state === "success"
              ? "border border-[#ABEFC6] bg-[#ECFDF3] text-[#027A48]"
              : "border border-red-200 bg-red-50 text-red-700",
          ].join(" ")}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

