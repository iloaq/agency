import type { ServiceRow } from "@/lib/supabase/fetch-services";
import { fetchPublishedServices } from "@/lib/supabase/fetch-services";
import type { ServiceData, ServiceSlug } from "@/lib/services/services-data";
import { serviceList as staticServiceList, servicesData } from "@/lib/services/services-data";
import { cache } from "react";

function rowToServiceData(row: ServiceRow): ServiceData {
  const base = {
    slug: row.slug as ServiceSlug,
    path: row.path,
    title: row.title,
    shortDescription: row.short_description,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  };
  return {
    ...base,
    ...(row.content as Omit<
      ServiceData,
      "slug" | "path" | "title" | "shortDescription" | "seoTitle" | "seoDescription"
    >),
  };
}

/**
 * Список услуг для UI: для каждого slug из статического порядка подставляем
 * опубликованную версию из БД, если есть, иначе статику.
 * React cache — один запрос к Supabase на серверный рендер на страницу.
 */
async function computeResolvedServiceList(): Promise<ServiceData[]> {
  const rows = await fetchPublishedServices();
  if (rows.length === 0) return staticServiceList;

  const bySlug = new Map(rows.map((r) => [r.slug, rowToServiceData(r)]));
  const staticSlugs = staticServiceList.map((s) => s.slug);
  const merged = staticSlugs.map((slug) => bySlug.get(slug) ?? servicesData[slug]);

  const extraFromDb = rows
    .filter((r) => !staticSlugs.includes(r.slug as ServiceSlug))
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(rowToServiceData);

  return [...merged, ...extraFromDb];
}

export const resolveServiceList = cache(computeResolvedServiceList);

export async function resolveServiceBySlug(slug: string): Promise<ServiceData | undefined> {
  const list = await resolveServiceList();
  return list.find((s) => s.slug === slug);
}
