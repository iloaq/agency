import type { MetadataRoute } from "next";
import { absoluteUrl, siteRobotsHost } from "@/lib/site-url";

// Генерация /robots.txt: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteRobotsHost(),
  };
}
