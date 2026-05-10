import type { ServiceLeadPayload } from "./types";

const MAX_LENGTHS: Partial<Record<keyof ServiceLeadPayload, number>> = {
  service_slug: 120,
  service_title: 180,
  name: 120,
  phone: 80,
  email: 160,
  telegram: 120,
  company: 180,
  service_interest: 180,
  project_stage: 160,
  budget_band: 120,
  preferred_contact: 32,
  message: 3000,
  source_page: 500,
  utm_source: 160,
  utm_medium: 160,
  utm_campaign: 220,
  utm_content: 220,
  utm_term: 220,
  client_id: 220,
  website: 200,
};

function cleanValue(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizeServiceLead(input: unknown) {
  const raw = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};

  const lead: ServiceLeadPayload = {
    service_slug: cleanValue(raw.service_slug, MAX_LENGTHS.service_slug) ?? "",
    service_title: cleanValue(raw.service_title, MAX_LENGTHS.service_title) ?? "",
    name: cleanValue(raw.name, MAX_LENGTHS.name),
    phone: cleanValue(raw.phone, MAX_LENGTHS.phone),
    email: cleanValue(raw.email, MAX_LENGTHS.email),
    telegram: cleanValue(raw.telegram, MAX_LENGTHS.telegram),
    company: cleanValue(raw.company, MAX_LENGTHS.company),
    service_interest: cleanValue(raw.service_interest, MAX_LENGTHS.service_interest),
    project_stage: cleanValue(raw.project_stage, MAX_LENGTHS.project_stage),
    budget_band: cleanValue(raw.budget_band, MAX_LENGTHS.budget_band),
    preferred_contact: cleanValue(raw.preferred_contact, MAX_LENGTHS.preferred_contact),
    message: cleanValue(raw.message, MAX_LENGTHS.message) ?? "",
    source_page: cleanValue(raw.source_page, MAX_LENGTHS.source_page),
    utm_source: cleanValue(raw.utm_source, MAX_LENGTHS.utm_source),
    utm_medium: cleanValue(raw.utm_medium, MAX_LENGTHS.utm_medium),
    utm_campaign: cleanValue(raw.utm_campaign, MAX_LENGTHS.utm_campaign),
    utm_content: cleanValue(raw.utm_content, MAX_LENGTHS.utm_content),
    utm_term: cleanValue(raw.utm_term, MAX_LENGTHS.utm_term),
    client_id: cleanValue(raw.client_id, MAX_LENGTHS.client_id),
    website: cleanValue(raw.website, MAX_LENGTHS.website),
  };

  return lead;
}

export function validateServiceLead(lead: ServiceLeadPayload) {
  if (lead.website) {
    return "Не удалось отправить заявку. Проверьте данные или попробуйте позже.";
  }

  if (!lead.service_slug || !/^[a-z0-9-]{2,120}$/.test(lead.service_slug)) {
    return "Не удалось отправить заявку. Проверьте данные или попробуйте позже.";
  }

  if (!lead.service_title || lead.service_title.length < 2) {
    return "Не удалось отправить заявку. Проверьте данные или попробуйте позже.";
  }

  if (!lead.email || !isEmail(lead.email)) {
    return "Укажите email в формате name@example.com — на него можно отправить ответ.";
  }

  const pref = lead.preferred_contact?.toLowerCase();
  if (pref === "phone" && !lead.phone?.trim()) {
    return "Выбран способ «Телефон» — укажите номер телефона.";
  }
  if (pref === "telegram" && !lead.telegram?.trim()) {
    return "Выбран способ «Telegram» — укажите ник или ссылку.";
  }

  if (pref && !["phone", "telegram", "email"].includes(pref)) {
    return "Выберите предпочитаемый способ связи из списка.";
  }

  if (!lead.message || lead.message.length < 10) {
    return "Опишите задачу чуть подробнее: минимум 10 символов.";
  }

  return null;
}
