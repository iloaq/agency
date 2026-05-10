import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { resolveServiceList } from "@/lib/services/resolve-services";

export const metadata: Metadata = {
  title: {
    absolute: "Услуги Skybric — сайты, Telegram-боты, CRM, SEO и fintech-разработка",
  },
  description:
    "Технологические услуги для бизнеса: сайты, веб-сервисы, Telegram-боты, CRM-интеграции, AI-автоматизация, SEO и fintech-разработка.",
  alternates: {
    canonical: "/services",
  },
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit text-sm font-semibold uppercase tracking-[0.12em] text-[#6D4AFF]">
      {children}
    </span>
  );
}

export default async function ServicesPage() {
  const serviceList = await resolveServiceList();
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] pb-24 pt-10 text-[#121212] lg:pb-32 lg:pt-14">
      <section className="px-5 sm:px-8 lg:px-10">
        <div className="w-full min-w-0">
          <SectionLabel>Услуги Skybric</SectionLabel>
          <h1 className="mt-7 text-[clamp(2.55rem,6.4vw,7rem)] font-semibold leading-[0.94] tracking-normal">
            Услуги для продаж, операционки и цифровых продуктов
          </h1>
          <div className="mt-8 max-w-3xl">
            <p className="text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Сайты, веб-сервисы, Telegram-боты, CRM, SEO, AI-автоматизация и fintech-разработка.
              Каждое направление закрывает конкретный участок: привлечь заявку, связать
              системы, убрать ручной труд или сделать продукт понятнее.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#6D4AFF] px-7 text-center text-base font-semibold text-white shadow-[0_20px_48px_rgba(109,74,255,0.25)] transition hover:bg-[#5D3EE4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Обсудить проект ↗
            </Link>
            <Link
              href="/process"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#E6E0D8] bg-white px-7 text-center text-base font-semibold text-[#121212] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Как мы работаем
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 grid w-full gap-5 px-5 sm:px-8 lg:px-10 xl:grid-cols-2">
        {serviceList.map((service) => (
          <article
            key={service.slug}
            className="rounded-[32px] border border-[#E6E0D8] bg-white p-6 shadow-[0_14px_42px_rgba(72,57,41,0.055)] transition hover:border-[#6D4AFF]/25 hover:shadow-[0_18px_54px_rgba(72,57,41,0.085)] sm:p-8"
          >
            <h2 className="max-w-3xl text-3xl font-semibold leading-10 sm:text-4xl sm:leading-[1.05]">
              {service.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#4B4B4B]">
              {service.shortDescription}
            </p>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                  Частые боли
                </p>
                <ul className="mt-4 grid gap-3">
                  {service.cardPains.map((pain) => (
                    <li key={pain} className="border-t border-[#E6E0D8] pt-3 text-base font-semibold leading-7">
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] bg-[#F6F3EE] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                  Результат для бизнеса
                </p>
                <p className="mt-3 text-lg font-semibold leading-8">{service.cardResult}</p>
              </div>
            </div>

            <Link
              href={service.path}
              className="mt-8 inline-flex min-h-13 items-center justify-center rounded-full bg-[#18181B] px-6 text-center text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.2)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Подробнее
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
