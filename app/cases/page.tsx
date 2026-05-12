import type { Metadata } from "next";
import Link from "next/link";
import { SiteMarketingFooter } from "@/components/site/site-marketing-footer";
import { fetchPublishedCaseStudies } from "@/lib/cases/fetch-case-studies";
import { rowToCaseCard } from "@/lib/cases/case-study-helpers";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Кейсы Skybric — B2B-сайты, CRM, fintech и автоматизация",
  },
  description:
    "Разборы задач Skybric: B2B-сайты, CRM-интеграции, редизайн, fintech, Telegram-боты и автоматизация процессов без выдуманных метрик.",
  alternates: {
    canonical: "/cases",
  },
  openGraph: {
    title: "Кейсы Skybric — B2B-сайты, CRM, fintech и автоматизация",
    description:
      "Показываем контекст, ограничения, архитектуру решения и что стало проще после запуска.",
    url: "/cases",
    type: "website",
  },
};

function clipText(text: string, maxLength = 230) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}...`;
}

function JsonLd({
  cases,
}: {
  cases: ReturnType<typeof rowToCaseCard>[];
}) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Кейсы Skybric",
    itemListElement: cases.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.href),
      name: item.task,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(itemList).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function CasesPage() {
  const rows = await fetchPublishedCaseStudies();
  const cases = rows.map(rowToCaseCard);

  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      <JsonLd cases={cases} />

      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-10 lg:pb-18 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D4AFF]">
              Разборы задач
            </p>
            <h1 className="mt-5 max-w-6xl text-[clamp(2.7rem,6.2vw,7rem)] font-semibold leading-[0.94] tracking-normal">
              Сайты, CRM, fintech и автоматизация без лишнего шума
            </h1>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Показываем не абстрактные услуги, а рабочую логику: контекст,
              ограничения, что было собрано и какой процесс стал понятнее после
              запуска.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-13 items-center justify-center rounded-full bg-[#18181B] px-6 text-base font-bold text-white shadow-[0_14px_34px_rgba(24,24,27,0.18)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Обсудить похожую задачу ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        {cases.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group flex min-h-[430px] flex-col rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_16px_46px_rgba(72,57,41,0.055)] transition hover:-translate-y-0.5 hover:border-[#6D4AFF]/35 hover:shadow-[0_22px_62px_rgba(72,57,41,0.09)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="max-w-[72%] text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                    {item.sector ?? "Кейс"}
                  </p>
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#E6E0D8] bg-[#F6F3EE] text-lg text-[#121212] transition group-hover:border-[#6D4AFF]/35 group-hover:text-[#6D4AFF]"
                  >
                    ↗
                  </span>
                </div>

                <h2 className="mt-8 text-2xl font-semibold leading-[1.12] lg:text-3xl">
                  {item.task}
                </h2>
                <p className="mt-4 text-base leading-7 text-[#4B4B4B]">
                  {clipText(item.loss)}
                </p>

                <div className="mt-auto grid gap-3 pt-7">
                  <div className="rounded-[20px] border border-[#E6E0D8] bg-[#F6F3EE] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B]">
                      Что можно собрать
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#121212]">
                      {clipText(item.build, 150)}
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-[#E6E0D8] bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B]">
                      Что станет проще
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#4B4B4B]">
                      {clipText(item.easier, 150)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-[#E6E0D8] bg-white p-8 shadow-[0_16px_46px_rgba(72,57,41,0.055)]">
            <h2 className="text-2xl font-semibold">Кейсы пока не опубликованы</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#4B4B4B]">
              После публикации проектов в админке они появятся на этой странице
              автоматически.
            </p>
          </div>
        )}
      </section>

      <SiteMarketingFooter />
    </main>
  );
}
