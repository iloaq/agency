import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteMarketingFooter } from "@/components/site/site-marketing-footer";
import {
  fetchCaseStudyBySlug,
  fetchPublishedCaseStudies,
} from "@/lib/cases/fetch-case-studies";
import {
  asStack,
  asStringArray,
  formatStackLine,
} from "@/lib/cases/case-study-helpers";
import type { CaseStudyRow } from "@/lib/cases/case-study-types";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function normalizeText(text?: string | null) {
  return text?.replace(/\s+/g, " ").trim() ?? "";
}

function metaDescription(row: CaseStudyRow) {
  const source = normalizeText(row.context) || normalizeText(row.conclusion);
  if (!source) return "Разбор задачи Skybric: контекст, ограничения, архитектура решения и результат для бизнеса.";
  return source.length > 155 ? `${source.slice(0, 155).trim()}...` : source;
}

function JsonLd({ row }: { row: CaseStudyRow }) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: row.title,
    description: metaDescription(row),
    url: absoluteUrl(`/cases/${row.slug}`),
    datePublished: row.created_at,
    dateModified: row.created_at,
    author: {
      "@type": "Organization",
      name: "Skybric",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "Skybric",
      url: absoluteUrl("/"),
    },
    articleSection: row.sector ?? "Кейс",
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Skybric",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кейсы",
        item: absoluteUrl("/cases"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: row.title,
        item: absoluteUrl(`/cases/${row.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(article).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

function ListBlock({
  title,
  items,
  dark = false,
}: {
  title: string;
  items: string[];
  dark?: boolean;
}) {
  return (
    <section
      className={[
        "rounded-[30px] border p-6 shadow-[0_16px_46px_rgba(72,57,41,0.055)] lg:p-8",
        dark
          ? "border-[#2B2B31] bg-[#18181B] text-white"
          : "border-[#E6E0D8] bg-white text-[#121212]",
      ].join(" ")}
    >
      <h2 className="text-3xl font-semibold leading-[1.1]">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className={[
              "rounded-[20px] border p-4 text-base leading-7",
              dark
                ? "border-white/10 bg-white/[0.06] text-white/76"
                : "border-[#E6E0D8] bg-[#F6F3EE] text-[#4B4B4B]",
            ].join(" ")}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TextBlock({
  title,
  text,
  dark = false,
}: {
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <section
      className={[
        "rounded-[30px] border p-6 shadow-[0_16px_46px_rgba(72,57,41,0.055)] lg:p-8",
        dark
          ? "border-[#2B2B31] bg-[#18181B] text-white"
          : "border-[#E6E0D8] bg-white text-[#121212]",
      ].join(" ")}
    >
      <h2 className="text-3xl font-semibold leading-[1.1]">{title}</h2>
      <p
        className={[
          "mt-5 whitespace-pre-line text-base leading-8",
          dark ? "text-white/72" : "text-[#4B4B4B]",
        ].join(" ")}
      >
        {text}
      </p>
    </section>
  );
}

export async function generateStaticParams() {
  const rows = await fetchPublishedCaseStudies();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const row = await fetchCaseStudyBySlug(slug);

  if (!row) {
    return {
      title: "Кейс не найден | Skybric",
      alternates: { canonical: `/cases/${slug}` },
    };
  }

  return {
    title: {
      absolute: `${row.title} | Кейс Skybric`,
    },
    description: metaDescription(row),
    alternates: {
      canonical: `/cases/${row.slug}`,
    },
    openGraph: {
      title: `${row.title} | Кейс Skybric`,
      description: metaDescription(row),
      url: `/cases/${row.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const row = await fetchCaseStudyBySlug(slug);
  if (!row) notFound();

  const problems = asStringArray(row.problems);
  const whatWeDid = asStringArray(row.what_we_did);
  const outcomes = asStringArray(row.outcomes);
  const stack = asStack(row.stack);

  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      <JsonLd row={row} />

      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-10 lg:pb-18 lg:pt-14">
        <Link
          href="/cases"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E6E0D8] bg-white px-5 text-sm font-semibold text-[#121212] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF]"
        >
          ← Все кейсы
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D4AFF]">
              {row.sector ?? "Кейс"}
            </p>
            <h1 className="mt-5 max-w-6xl text-[clamp(2.55rem,6vw,6.6rem)] font-semibold leading-[0.94] tracking-normal">
              {row.title}
            </h1>
          </div>
          <div className="rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_16px_46px_rgba(72,57,41,0.055)] lg:justify-self-end">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B]">
              Маршрут проекта
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#121212]">
              {row.architecture_flow ?? "Задача → решение → запуск"}
            </p>
          </div>
        </div>

        {row.context ? (
          <p className="mt-8 max-w-4xl whitespace-pre-line text-lg leading-8 text-[#4B4B4B]">
            {row.context}
          </p>
        ) : null}
      </section>

      <section className="grid gap-5 px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24 xl:grid-cols-2">
        {problems.length ? (
          <ListBlock title="Где терялось время, контроль или заявка" items={problems} />
        ) : null}

        {row.goal ? <TextBlock title="Цель" text={row.goal} /> : null}

        {whatWeDid.length ? (
          <ListBlock title="Что сделали" items={whatWeDid} dark />
        ) : null}

        <TextBlock title="Системы и стек" text={formatStackLine(stack)} />

        {outcomes.length ? (
          <ListBlock title="Что стало проще после запуска" items={outcomes} />
        ) : null}

        {row.conclusion ? <TextBlock title="Вывод" text={row.conclusion} dark /> : null}
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="grid gap-6 rounded-[34px] border border-[#2B2B31] bg-[#18181B] p-6 text-white shadow-[0_24px_70px_rgba(24,24,27,0.16)] lg:grid-cols-[0.7fr_0.3fr] lg:items-center lg:p-10">
          <div>
            <h2 className="text-[clamp(2.1rem,4vw,4.4rem)] font-semibold leading-[1]">
              Есть похожая задача?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
              Опишите процесс, который нужно собрать, связать или улучшить. Мы
              подскажем, с чего начать и какой формат работы подойдёт.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-white px-6 text-base font-bold text-[#121212] transition hover:bg-[#F6F3EE]"
          >
            Обсудить задачу ↗
          </Link>
        </div>
      </section>

      <SiteMarketingFooter />
    </main>
  );
}
