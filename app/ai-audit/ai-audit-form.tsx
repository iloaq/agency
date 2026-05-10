"use client";

import { useRef, useState } from "react";
import { getClientId } from "@/lib/leads/analytics-client";
import { submitLead } from "@/lib/leads/submit-lead";
import { normalizeServiceLead, validateServiceLead } from "@/lib/leads/validate-service-lead";

const preferredContactOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Телефон" },
  { value: "telegram", label: "Telegram" },
] as const;

const labelClass = "grid min-w-0 gap-2 text-sm font-semibold text-[#121212]";
const fieldClass =
  "min-h-14 w-full min-w-0 rounded-[18px] border border-[#E6E0D8] bg-white px-4 text-base font-medium text-[#121212] outline-none transition placeholder:text-[#8B8B8B] focus:border-[#6D4AFF] focus:ring-4 focus:ring-[#6D4AFF]/10";

type FormState = "idle" | "loading" | "success" | "error";

export function AiAuditForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const lastSubmitAt = useRef(0);

  return (
    <form
      className="grid min-w-0 gap-4 rounded-[28px] border border-[#E6E0D8] bg-[#FDFCF9] p-5 text-[#121212] shadow-[0_14px_42px_rgba(55,45,35,0.07)] sm:p-6 lg:p-8"
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

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const phone = String(formData.get("phone") ?? "").trim();
        const telegram = String(formData.get("telegram") ?? "").trim();
        const preferred_contact = String(formData.get("preferred_contact") ?? "").trim();
        const company = String(formData.get("company") ?? "").trim();
        const industry = String(formData.get("industry") ?? "").trim();
        const role = String(formData.get("role") ?? "").trim();
        const process = String(formData.get("process") ?? "").trim();

        const messageBody = [`Сфера: ${industry}`, `Должность: ${role}`, "", process].join("\n");

        const lead = normalizeServiceLead({
          service_slug: "ai-audit",
          service_title: "Аудит процессов и автоматизации",
          name,
          email,
          phone,
          telegram,
          preferred_contact,
          company,
          message: messageBody,
          source_page: url.href,
          utm_source: url.searchParams.get("utm_source") ?? "",
          utm_medium: url.searchParams.get("utm_medium") ?? "",
          utm_campaign: url.searchParams.get("utm_campaign") ?? "",
          utm_content: url.searchParams.get("utm_content") ?? "",
          utm_term: url.searchParams.get("utm_term") ?? "",
          client_id: getClientId(),
          website: String(formData.get("website") ?? ""),
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
        setMessage("Заявка отправлена. Мы свяжемся с вами, чтобы уточнить процессы для разбора.");
        form.reset();
      }}
    >
      <label className="sr-only">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Имя
          <input name="name" type="text" autoComplete="name" required className={fieldClass} />
        </label>
        <label className={labelClass}>
          Email *
          <input name="email" type="email" autoComplete="email" required className={fieldClass} />
        </label>
        <label className={labelClass}>
          Телефон
          <input name="phone" type="text" autoComplete="tel" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Telegram
          <input
            name="telegram"
            type="text"
            autoComplete="username"
            placeholder="@username"
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

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Компания / проект
          <input name="company" type="text" autoComplete="organization" required className={fieldClass} />
        </label>
        <label className={labelClass}>
          Сфера бизнеса
          <input name="industry" type="text" autoComplete="organization-title" required className={fieldClass} />
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Должность
          <input name="role" type="text" autoComplete="organization-title" required className={fieldClass} />
        </label>
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
        disabled={state === "loading" || state === "success"}
        className="mt-2 inline-flex min-h-14 w-full min-w-0 items-center justify-center rounded-[18px] bg-[#18181B] px-6 text-center text-base font-semibold leading-6 text-white shadow-[0_14px_34px_rgba(24,24,27,0.18)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="min-w-0 max-w-full whitespace-normal break-words">
          {state === "loading" ? "Отправляем..." : "Получить бесплатную консультацию-аудит"}
        </span>
      </button>

      <p className="text-sm leading-6 text-[#6B6B6B]">
        Обязательны: email и описание (от 20 символов). Телефон или Telegram — если выбран такой способ связи.
      </p>

      {message ? (
        <p
          className={[
            "rounded-[20px] border px-4 py-3 text-sm font-semibold leading-6",
            state === "success"
              ? "border-[#B8FF5C]/70 bg-[#B8FF5C]/30 text-[#121212]"
              : "border-red-200 bg-red-50 text-red-700",
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
