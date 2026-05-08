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
      className="grid gap-4 rounded-[28px] border border-[#E6E0D8] bg-white p-5 text-[#121212] shadow-[0_18px_55px_rgba(72,57,41,0.10)] sm:p-6 lg:p-8"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Имя
          <input
            name="name"
            autoComplete="name"
            className="min-h-13 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Телефон
          <input
            name="phone"
            autoComplete="tel"
            className="min-h-13 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Telegram
          <input
            name="telegram"
            autoComplete="username"
            placeholder="@username"
            className="min-h-13 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="min-h-13 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Компания
        <input
          name="company"
          autoComplete="organization"
          className="min-h-13 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid min-w-0 gap-2 text-sm font-semibold">
          Интересует услуга
          <select
            name="service_interest"
            className="min-h-13 w-full min-w-0 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
          >
            <option value="">Выберите, если понятно</option>
            {serviceInterestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">
          Стадия проекта
          <select
            name="project_stage"
            className="min-h-13 w-full min-w-0 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
          >
            <option value="">Выберите, если понятно</option>
            {projectStageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">
          Бюджетный диапазон
          <select
            name="budget_band"
            className="min-h-13 w-full min-w-0 rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
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

      <label className="grid gap-2 text-sm font-semibold">
        Сообщение
        <textarea
          name="message"
          minLength={10}
          rows={5}
          placeholder="Опишите задачу: что хотите автоматизировать, какая CRM или система уже есть, где сейчас теряется время."
          className="min-h-36 resize-y rounded-[20px] border border-[#E6E0D8] bg-[#F6F3EE] px-4 py-4 text-base outline-none transition focus:border-[#6D4AFF] focus:bg-white focus:ring-4 focus:ring-[#6D4AFF]/10"
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading" || state === "success"}
        className="mt-2 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#18181B] px-6 text-base font-bold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        {state === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>

      <p className="text-sm leading-6 text-[#6B6B6B]">
        Обязательны: сообщение и любой контакт — телефон, Telegram или email.
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

