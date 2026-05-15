import type { MetadataRoute } from "next";
import { fetchPublishedCaseStudies } from "@/lib/cases/fetch-case-studies";
import { resolveServiceList } from "@/lib/services/resolve-services";
import { absoluteUrl } from "@/lib/site-url";

// Пересборка карты сайта (ISR): https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export const revalidate = 3600;

const STATIC_ROUTES = [
  "/",
  "/services",
  "/cases",
  "/process",
  "/about",
  "/contact",
  "/ai-audit",
  "/privacy",
  "/personal-data-consent",
  "/cookies",
  "/terms",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceList, caseStudies] = await Promise.all([
    resolveServiceList(),
    fetchPublishedCaseStudies(),
  ]);
  const paths = Array.from(
    new Set<string>([
      ...STATIC_ROUTES,
      ...serviceList.map((s) => s.path),
      ...caseStudies.map((item) => `/cases/${item.slug}`),
    ]),
  );

  return paths.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/services" || route === "/cases" ? 0.9 : 0.7,
  }));
}
