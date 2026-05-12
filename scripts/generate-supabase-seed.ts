/**
 * Генерирует `supabase/sql/seed_site_settings_and_services.sql` из статических данных.
 * Запуск: `pnpm exec tsx scripts/generate-supabase-seed.ts`
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ServiceData } from "../lib/services/services-data";
import { serviceList } from "../lib/services/services-data";

const __dirname = dirname(fileURLToPath(import.meta.url));

function extractContent(s: ServiceData): Record<string, unknown> {
  const { slug, path, title, shortDescription, seoTitle, seoDescription, ...rest } = s;
  void slug;
  void path;
  void title;
  void shortDescription;
  void seoTitle;
  void seoDescription;
  return { ...rest } as Record<string, unknown>;
}

/** Dollar-quoted string для безопасной подстановки UTF-8 и кавычек. */
function dollarQuote(content: string): string {
  let tag = "v";
  while (content.includes(`$${tag}$`)) {
    tag += "x";
  }
  return `$${tag}$${content}$${tag}$`;
}

function main() {
  const header = `-- Сид контактов и услуг (после site_settings.sql + services.sql).
-- Сгенерировано: scripts/generate-supabase-seed.ts — при изменении контента перегенерируйте файл.

`;

  const settingsSql = `INSERT INTO public.site_settings (id, brand_name, email, phone_display, phone_href, social, published)
VALUES (
  1,
  ${dollarQuote("Skybric")},
  ${dollarQuote("clients@skybric.com")},
  ${dollarQuote("+7(777)336-56-02")},
  ${dollarQuote("tel:+77773365602")},
  '{}'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  brand_name = excluded.brand_name,
  email = excluded.email,
  phone_display = excluded.phone_display,
  phone_href = excluded.phone_href,
  social = excluded.social,
  published = excluded.published,
  updated_at = now();

`;

  const rows = serviceList.map((s, index) => {
    const contentJson = JSON.stringify(extractContent(s));
    return `(
  ${dollarQuote(s.slug)},
  ${dollarQuote(s.title)},
  ${dollarQuote(s.shortDescription)},
  ${dollarQuote(s.path)},
  ${dollarQuote(s.seoTitle)},
  ${dollarQuote(s.seoDescription)},
  true,
  ${index},
  ${dollarQuote(contentJson)}::jsonb
)`;
  });

  const servicesSql = `INSERT INTO public.services (slug, title, short_description, path, seo_title, seo_description, published, sort_order, content)
VALUES
${rows.join(",\n")}
ON CONFLICT (slug) DO UPDATE SET
  title = excluded.title,
  short_description = excluded.short_description,
  path = excluded.path,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  published = excluded.published,
  sort_order = excluded.sort_order,
  content = excluded.content;
`;

  const outPath = join(__dirname, "../supabase/sql/seed_site_settings_and_services.sql");
  writeFileSync(outPath, header + settingsSql + "\n" + servicesSql, "utf8");
  console.log("Wrote", outPath);
}

main();
