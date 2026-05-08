import type { MetadataRoute } from "next";
import { serviceList } from "@/lib/services/services-data";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
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
