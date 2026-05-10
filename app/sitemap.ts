import type { MetadataRoute } from "next";
import { resolveServiceList } from "@/lib/services/resolve-services";
import { absoluteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceList = await resolveServiceList();
  const routes = [
    "/",
    "/services",
    "/cases",
    "/process",
    "/about",
    "/contact",
    "/ai-audit",
    ...serviceList.map((service) => service.path),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/services" ? 0.9 : 0.7,
  }));
}
