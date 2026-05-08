import type { Metadata } from "next";
import Link from "next/link";
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

export default async function ServicesPage() {
  const serviceList = await resolveServiceList();
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] px-5 pb-24 pt-12 text-[#121212] sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <h1 className="max-w-6xl text-[clamp(2.7rem,7vw,6rem)] font-semibold leading-[1.01] tracking-normal">
          Услуги Skybric для продаж, операционки и цифровых продуктов
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9 lg:justify-self-end">
          Сайты, веб-сервисы, Telegram-боты, CRM, SEO, AI-автоматизация и fintech-разработка.
          Каждое направление закрывает конкретный участок: привлечь заявку, связать
          системы, убрать ручной труд или сделать продукт понятнее.
        </p>
      </section>

      <section className="mt-14 grid gap-5 xl:grid-cols-2">
        {serviceList.map((service) => (
          <article
            key={service.slug}
            className="rounded-[32px] border border-[#E6E0D8] bg-white p-6 shadow-[0_18px_55px_rgba(72,57,41,0.08)] transition hover:shadow-[0_24px_75px_rgba(72,57,41,0.11)] sm:p-8"
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
