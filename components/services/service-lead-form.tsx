"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { getClientId } from "@/lib/leads/analytics-client";
import { submitLead } from "@/lib/leads/submit-lead";
import { normalizeServiceLead, validateServiceLead } from "@/lib/leads/validate-service-lead";
import { useToast } from "@/components/ui/toast";

type FormState = "idle" | "loading" | "success";
type ContactMethod = "email" | "telegram";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const serviceInterestOptions = [
  "UI/UX-дизайн для B2B",
  "Редизайн B2B-сайта",
  "Сайт для бизнеса",
  "Product design для SaaS",
  "Веб-сервис или личный кабинет",
  "Fintech UI/UX",
  "Telegram-бот",
  "CRM и интеграции",
  "AI-автоматизация",
  "SEO",
  "Fintech-разработка",
  "Digital-сопровождение бизнеса",
  "Аудит процессов и автоматизации",
  "Пока не уверен",
] as const;

const contactMethods: { value: ContactMethod; label: string; placeholder: string }[] = [
  { value: "email", label: "Email", placeholder: "name@company.kz" },
  { value: "telegram", label: "Telegram", placeholder: "@username" },
];

const labelClass = "grid min-w-0 gap-2 text-sm font-semibold text-white";
const fieldClass =
  "min-h-14 w-full min-w-0 rounded-[18px] border border-white/12 bg-white/[0.08] px-4 text-base font-medium text-white outline-none transition placeholder:text-white/38 focus:border-[#6D4AFF] focus:bg-white/[0.11] focus:ring-4 focus:ring-[#6D4AFF]/20";
/* Кастомная стрелка: https://developer.mozilla.org/en-US/docs/Web/CSS/appearance */
const selectClass = `${fieldClass} cursor-pointer appearance-none bg-[#252529] pr-12 hover:border-white/20`;

export function ServiceLeadForm({
  serviceSlug,
  serviceTitle,
}: {
  serviceSlug: string;
  serviceTitle: string;
}) {
  const { toast } = useToast();
  const [state, setState] = useState<FormState>("idle");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const lastSubmitAt = useRef(0);
  const hasTrackedFormStart = useRef(false);
  const defaultServiceInterest =
    serviceInterestOptions.find((option) => option === serviceTitle) ?? "";

  function pushLeadEvent(event: string, payload: Record<string, unknown> = {}) {
    const dataLayer = window.dataLayer;
    if (!dataLayer) return;
    dataLayer.push({
      event,
      service_slug: serviceSlug,
      service_title: serviceTitle,
      ...payload,
    });
  }

  function trackFormStart() {
    if (hasTrackedFormStart.current) return;
    hasTrackedFormStart.current = true;
    pushLeadEvent("form_start");
  }

  return (
    <form
      className="grid min-w-0 gap-4 rounded-[28px] border border-white/10 bg-[#202024] p-5 text-white shadow-[0_18px_54px_rgba(0,0,0,0.22)] sm:p-6 lg:p-7"
      onFocusCapture={trackFormStart}
      onChangeCapture={trackFormStart}
      onSubmit={async (event) => {
        event.preventDefault();

        const now = event.timeStamp;
        if (lastSubmitAt.current > 0 && now - lastSubmitAt.current < 6000) {
          toast({
            title: "Заявка уже отправляется. Подождите несколько секунд.",
            variant: "neutral",
            shape: "pill",
          });
          return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);
        const url = new URL(window.location.href);
        const businessArea = String(formData.get("business_area") ?? "").trim();
        const role = String(formData.get("role") ?? "").trim();
        const rawMessage = String(formData.get("message") ?? "").trim();
        const message = [
          businessArea ? `Сфера деятельности: ${businessArea}` : null,
          role ? `Должность: ${role}` : null,
          rawMessage,
        ]
          .filter(Boolean)
          .join("\n\n");

        const lead = normalizeServiceLead({
          ...Object.fromEntries(formData.entries()),
          phone: "",
          message,
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
          toast({
            title: validationError,
            variant: "neutral",
            shape: "rounded",
          });
          return;
        }

        lastSubmitAt.current = now;
        setState("loading");

        const result = await submitLead(lead);

        if (!result.ok) {
          setState("idle");
          toast({
            title: result.message,
            variant: "neutral",
            shape: "rounded",
          });
          return;
        }

        setState("success");
        pushLeadEvent("lead_submit", {
          service_interest: lead.service_interest,
          preferred_contact: lead.preferred_contact,
        });
        toast({
          title: "Заявка отправлена. Мы изучим задачу и свяжемся с вами.",
          variant: "success",
          shape: "pill",
        });
        form.reset();
        setContactMethod("email");
        window.setTimeout(() => setState("idle"), 2500);
      }}
    >
      <input type="hidden" name="service_slug" value={serviceSlug} readOnly />
      <input type="hidden" name="service_title" value={serviceTitle} readOnly />
      <input type="hidden" name="preferred_contact" value={contactMethod} readOnly />
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
          <input name="name" autoComplete="name" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Компания
          <input name="company" autoComplete="organization" className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-semibold text-white">Предпочитаемый способ связи</p>
        <div className="grid grid-cols-2 gap-2 rounded-[20px] border border-white/10 bg-white/[0.05] p-1">
          {contactMethods.map((method) => {
            const active = contactMethod === method.value;
            return (
              <button
                key={method.value}
                type="button"
                className={[
                  "min-h-11 rounded-[16px] px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D4AFF]",
                  active ? "bg-[#6D4AFF] text-white" : "text-white/68 hover:bg-white/10 hover:text-white",
                ].join(" ")}
                aria-pressed={active}
                onClick={() => {
                  setContactMethod(method.value);
                  pushLeadEvent("preferred_contact_select", {
                    preferred_contact: method.value,
                  });
                }}
              >
                {method.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className={labelClass}>
        {contactMethod === "email" ? "Email" : "Telegram"}
        <input
          key={contactMethod}
          name={contactMethod}
          type={contactMethod === "email" ? "email" : "text"}
          autoComplete={contactMethod === "email" ? "email" : "username"}
          placeholder={contactMethods.find((method) => method.value === contactMethod)?.placeholder}
          required
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Сфера деятельности
        <input
          name="business_area"
          autoComplete="organization-title"
          placeholder="Например: клиника, строительство, онлайн-школа, B2B-услуги"
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Услуга
          <div className="relative min-w-0">
            <select
              name="service_interest"
              className={selectClass}
              defaultValue={defaultServiceInterest}
              onChange={(event) =>
                pushLeadEvent("service_select", {
                  service_interest: event.currentTarget.value,
                })
              }
            >
              <option value="" className="text-[#121212]">
                Выберите, если понятно
              </option>
              {serviceInterestOptions.map((option) => (
                <option key={option} value={option} className="text-[#121212]">
                  {option}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/55"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </label>
        <label className={labelClass}>
          Должность
          <input name="role" autoComplete="organization-title" className={fieldClass} />
        </label>
      </div>

      <label className={labelClass}>
        Сообщение
        <textarea
          name="message"
          minLength={10}
          rows={5}
          placeholder="Опишите задачу: что нужно собрать, связать, автоматизировать или улучшить."
          className={`${fieldClass} min-h-36 resize-y py-4`}
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading" || state === "success"}
        className="mt-2 inline-flex min-h-14 w-full items-center justify-center rounded-[18px] bg-white px-6 text-base font-bold text-[#18181B] shadow-[0_16px_40px_rgba(255,255,255,0.08)] transition hover:bg-[#F6F3EE] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        {state === "loading"
          ? "Отправляем..."
          : state === "success"
            ? "Отправлено"
            : "Отправить заявку"}
      </button>
      <p className="text-xs leading-5 text-white/48">
        Отправляя форму, вы соглашаетесь с{" "}
        <Link href="/privacy" className="text-white underline-offset-4 hover:underline">
          политикой конфиденциальности
        </Link>{" "}
        и даёте{" "}
        <Link
          href="/personal-data-consent"
          className="text-white underline-offset-4 hover:underline"
        >
          согласие на обработку персональных данных
        </Link>
        . Cookies и аналитика описаны в{" "}
        <Link href="/cookies" className="text-white underline-offset-4 hover:underline">
          политике cookies
        </Link>
        .
      </p>
    </form>
  );
}
