import type { ServiceRow } from "@/lib/supabase/fetch-services";
import { fetchPublishedServices } from "@/lib/supabase/fetch-services";
import type { ServiceData, ServiceSlug } from "@/lib/services/services-data";
import { cache } from "react";

type ServiceContent = Omit<
  ServiceData,
  "slug" | "path" | "title" | "shortDescription" | "seoTitle" | "seoDescription"
>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringFrom(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function stringArrayFrom(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function painsFrom(value: unknown): ServiceContent["pains"] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!isRecord(item)) return [];
    return [
      {
        problem: stringFrom(item.problem, ""),
        manifestation: stringFrom(item.manifestation, ""),
        consequence: stringFrom(item.consequence, ""),
      },
    ].filter((pain) => pain.problem || pain.manifestation || pain.consequence);
  });
}

function faqFrom(value: unknown): ServiceContent["faq"] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!isRecord(item)) return [];
    const question = stringFrom(item.question, "");
    const answer = stringFrom(item.answer, "");
    return question && answer ? [{ question, answer }] : [];
  });
}

function finalCtaFrom(value: unknown, title: string): ServiceContent["finalCta"] {
  if (!isRecord(value)) {
    return {
      title: `Обсудить задачу: ${title}`,
      text: "Опишите задачу, и мы подскажем, какой формат работы подойдёт.",
    };
  }

  return {
    title: stringFrom(value.title, `Обсудить задачу: ${title}`),
    text: stringFrom(
      value.text,
      "Опишите задачу, и мы подскажем, какой формат работы подойдёт.",
    ),
  };
}

function visualFrom(value: unknown, title: string): ServiceContent["visual"] {
  if (!isRecord(value)) {
    return {
      eyebrow: "service",
      title,
      nodes: [],
      metrics: [],
    };
  }

  return {
    eyebrow: stringFrom(value.eyebrow, "service"),
    title: stringFrom(value.title, title),
    nodes: stringArrayFrom(value.nodes),
    metrics: stringArrayFrom(value.metrics),
  };
}

function rowToServiceData(row: ServiceRow): ServiceData {
  const content = isRecord(row.content) ? row.content : {};
  const base = {
    slug: row.slug as ServiceSlug,
    path: row.path || `/services/${row.slug}`,
    title: row.title,
    shortDescription: row.short_description,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  };
  return {
    ...base,
    heroTitle: stringFrom(content.heroTitle, row.title),
    heroSubtitle: stringFrom(content.heroSubtitle, row.short_description),
    ctaPrimary: stringFrom(content.ctaPrimary, "Обсудить задачу"),
    ctaSecondary: stringFrom(content.ctaSecondary, "Посмотреть состав работ"),
    valuePoints: stringArrayFrom(content.valuePoints),
    cardPains: stringArrayFrom(content.cardPains),
    cardResult: stringFrom(content.cardResult, row.short_description),
    pains: painsFrom(content.pains),
    solutions: stringArrayFrom(content.solutions),
    processSteps: stringArrayFrom(content.processSteps),
    businessResults: stringArrayFrom(content.businessResults),
    useCases: stringArrayFrom(content.useCases),
    deliverables: stringArrayFrom(content.deliverables),
    whyCustom: stringArrayFrom(content.whyCustom),
    faq: faqFrom(content.faq),
    finalCta: finalCtaFrom(content.finalCta, row.title),
    visual: visualFrom(content.visual, row.title),
  };
}

/**
 * Список услуг для UI: источник истины — таблица `public.services`.
 * React cache — один запрос к Supabase на серверный рендер на страницу.
 */
async function computeResolvedServiceList(): Promise<ServiceData[]> {
  const rows = await fetchPublishedServices();
  return rows.map(rowToServiceData);
}

export const resolveServiceList = cache(computeResolvedServiceList);

export async function resolveServiceBySlug(slug: string): Promise<ServiceData | undefined> {
  const list = await resolveServiceList();
  return list.find((s) => s.slug === slug);
}
