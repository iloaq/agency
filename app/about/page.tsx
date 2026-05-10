import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "О Skybric — компактная senior-команда для B2B-разработки",
  },
  description:
    "Skybric — небольшая технологическая команда из 5 специалистов для сайтов, веб-сервисов, CRM-интеграций, Telegram-ботов, SEO и автоматизации.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  {
    title: "Не раздуваем процесс",
    text: "Держим короткую цепочку решений: задача, архитектура, реализация, проверка и доработка.",
  },
  {
    title: "Проект ведут руками",
    text: "Тот, кто проектирует логику, остаётся рядом с реализацией, запуском и последующими правками.",
  },
  {
    title: "Не продаём лишнее",
    text: "Сначала разбираем процесс и ограничения, затем предлагаем формат решения под конкретную задачу.",
  },
  {
    title: "AI — инструмент, не вывеска",
    text: "Подключаем AI только там, где он реально сокращает ручную работу или ускоряет повторяемый сценарий.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F6F3EE] pb-24 pt-10 text-[#121212] lg:pb-32 lg:pt-14">
      <section className="px-5 sm:px-8 lg:px-10">
        <div className="w-full min-w-0">
          <h1 className="text-[clamp(2.55rem,6.4vw,7rem)] font-semibold leading-[0.94]">
            Компактная senior-команда, которая ведёт проект руками
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9">
            Skybric — небольшая технологическая команда из 5 специалистов. Мы не
            раздуваем процесс и не передаём клиента между отделами. Тот, кто
            проектирует архитектуру, остаётся в проекте до запуска и доработок.
          </p>
        </div>
      </section>

      <section className="mt-14 grid w-full gap-5 px-5 sm:px-8 md:grid-cols-2 lg:px-10 xl:grid-cols-4">
        {principles.map((item) => (
          <article
            key={item.title}
            className="rounded-[32px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_36px_rgba(72,57,41,0.05)]"
          >
            <h2 className="text-2xl font-semibold leading-8">{item.title}</h2>
            <p className="mt-4 text-base leading-7 text-[#4B4B4B]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-5 mt-10 rounded-[34px] border border-[#DCD3C8] bg-[#EFE9DF] p-6 sm:mx-8 sm:p-8 lg:mx-10 lg:p-10">
        <h2 className="max-w-4xl text-[clamp(2.15rem,4.2vw,4.1rem)] font-semibold leading-[1]">
          Где мы полезны
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            "корпоративные сайты и посадочные страницы",
            "веб-сервисы и личные кабинеты",
            "Telegram-боты и сценарии уведомлений",
            "CRM-интеграции и маршруты заявок",
            "SEO-архитектура и money-pages",
            "AI-автоматизация повторяемой ручной работы",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[22px] border border-[#DCD3C8] bg-white p-5 text-lg font-semibold leading-7"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="w-full px-5 sm:px-8 lg:px-10">
        <Link
          href="/contact"
          className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-[#18181B] px-7 text-base font-semibold text-white shadow-[0_14px_34px_rgba(24,24,27,0.18)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
        >
          Обсудить задачу
        </Link>
      </div>
    </main>
  );
}
