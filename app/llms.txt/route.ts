import { resolveServiceList } from "@/lib/services/resolve-services";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

// Формат llms.txt: https://llmstxt.org/
// Кэш: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 3600;

export async function GET() {
  const services = await resolveServiceList();
  const staticPages: { label: string; path: string }[] = [
    { label: "Главная", path: "/" },
    { label: "Услуги", path: "/services" },
    { label: "Подход", path: "/process" },
    { label: "Команда", path: "/about" },
    { label: "Контакты", path: "/contact" },
    { label: "Аудит процессов и автоматизации", path: "/ai-audit" },
  ];

  const lines = [
    "# Skybric",
    "",
    `> Веб-разработка, автоматизация и digital-системы для B2B. Публичный сайт: ${siteUrl}`,
    "",
    "## Основные страницы",
    "",
    ...staticPages.map(({ label, path }) => `- [${label}](${absoluteUrl(path)})`),
    "",
    "## Услуги",
    "",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(s.path)})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
