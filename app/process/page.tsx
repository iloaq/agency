import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Процесс Skybric — как задача превращается в рабочую систему",
  },
  description:
    "Как Skybric разбирает бизнес-задачу, проектирует архитектуру, реализует сайт, веб-сервис, интеграции или автоматизацию и улучшает решение после запуска.",
  alternates: {
    canonical: "/process",
  },
};

const steps = [
  {
    title: "Разбираем процесс и ограничения",
    text:
      "Фиксируем цель, аудиторию, текущие системы, роли, данные, ручные операции и места, где теряются заявки, время или контроль.",
    output: "карта задачи и приоритет первого участка",
  },
  {
    title: "Проектируем архитектуру и контент",
    text:
      "Описываем страницы, сценарии, структуру данных, интеграции, SEO-логику, тексты и MVP-объём без лишней функциональности.",
    output: "понятная архитектура и план реализации",
  },
  {
    title: "Реализуем, интегрируем и тестируем",
    text:
      "Собираем frontend, backend, формы, CRM, Telegram, аналитику или AI-слой там, где он действительно сокращает ручную работу.",
    output: "рабочий MVP или релизная версия",
  },
  {
    title: "Запускаем, измеряем и улучшаем",
    text:
      "Проверяем реальные сценарии, смотрим данные, исправляем слабые места и дорабатываем систему после первого запуска.",
    output: "решение, которое можно развивать дальше",
  },
] as const;

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#F6F3EE] px-5 pb-24 pt-12 text-[#121212] sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <h1 className="max-w-6xl text-[clamp(2.55rem,6.2vw,5.7rem)] font-semibold leading-[1.01]">
          Как мы переводим задачу в рабочую систему
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9 lg:justify-self-end">
          Сначала разбираем процесс и ограничения, затем проектируем логику,
          реализуем, интегрируем и проверяем решение на рабочих сценариях.
        </p>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-[32px] border border-[#E6E0D8] bg-white p-6 shadow-[0_18px_55px_rgba(72,57,41,0.08)] sm:p-8"
          >
            <p className="text-sm font-semibold text-[#6D4AFF]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-8 text-3xl font-semibold leading-10">{step.title}</h2>
            <p className="mt-4 text-base leading-7 text-[#4B4B4B]">{step.text}</p>
            <div className="mt-7 rounded-[22px] bg-[#F6F3EE] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                На выходе
              </p>
              <p className="mt-2 text-base font-semibold leading-7">{step.output}</p>
            </div>
          </article>
        ))}
      </section>

      <Link
        href="/contact"
        className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-[#18181B] px-7 text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        Обсудить архитектуру проекта
      </Link>
    </main>
  );
}
