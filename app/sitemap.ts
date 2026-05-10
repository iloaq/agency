import type { MetadataRoute } from "next";
import { resolveServiceList } from "@/lib/services/resolve-services";
import { absoluteUrl } from "@/lib/site-url";

// Пересборка карты сайта (ISR): https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export const revalidate = 3600;

const STATIC_ROUTES = [
  "/",
  "/services",
  "/process",
  "/about",
  "/contact",
  "/ai-audit",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceList = await resolveServiceList();
  const paths = Array.from(
    new Set<string>([...STATIC_ROUTES, ...serviceList.map((s) => s.path)]),
  );

  return paths.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/services" ? 0.9 : 0.7,
  }));
}
