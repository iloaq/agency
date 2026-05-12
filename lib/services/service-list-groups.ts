import type { ServiceData, ServiceSlug } from "@/lib/services/services-data";

export type ServiceIndexGroupDef = { label: string; slugs: readonly ServiceSlug[] };

/** Секции индекса `/services`: дизайн / разработка / интеграции / digital (SMM, видео, таргет и т.д.). */
export const SERVICE_INDEX_GROUPS: ServiceIndexGroupDef[] = [
  {
    label: "Дизайн",
    slugs: ["ui-ux-design", "website-redesign", "saas-product-design", "fintech-ui-design"],
  },
  {
    label: "Разработка",
    slugs: ["websites", "web-app-development", "telegram-bots"],
  },
  {
    label: "Интеграции и рост",
    slugs: ["crm-integrations", "ai-automation", "seo", "fintech-development"],
  },
  {
    label: "Диджитал-сопровождение",
    slugs: ["digital-support"],
  },
];

export function servicesGroupedForIndex(list: ServiceData[]): { label: string; items: ServiceData[] }[] {
  const bySlug = new Map(list.map((s) => [s.slug, s]));
  const used = new Set<ServiceSlug>();
  const out: { label: string; items: ServiceData[] }[] = [];

  for (const g of SERVICE_INDEX_GROUPS) {
    const items: ServiceData[] = [];
    for (const slug of g.slugs) {
      const s = bySlug.get(slug);
      if (s) {
        items.push(s);
        used.add(slug);
      }
    }
    if (items.length > 0) out.push({ label: g.label, items });
  }

  const extras = list.filter((s) => !used.has(s.slug));
  if (extras.length > 0) {
    out.push({ label: "Направления", items: extras });
  }

  return out;
}
