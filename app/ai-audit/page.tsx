import type { Metadata } from "next";
import Link from "next/link";
import { BusinessPainSection } from "@/components/ai-audit/business-pain-section";
import { ContactCTA } from "@/components/marketing/light-ui";
import { ServiceLeadForm } from "@/components/services/service-lead-form";
import { SiteMarketingFooter } from "@/components/site/site-marketing-footer";

const fitCards = [
  {
    title: "Есть регулярные заявки",
    text: "Заявки приходят с сайта, рекламы, Telegram, WhatsApp, звонков или других каналов.",
  },
  {
    title: "Менеджеры отвечают вручную",
    text: "Команда часто повторяет одни и те же ответы клиентам и тратит на это рабочее время.",
  },
  {
    title: "CRM и переписки живут отдельно",
    text: "Часть информации остаётся в мессенджерах, таблицах, звонках или личных чатах сотрудников.",
  },
  {
    title: "Документы собираются руками",
    text: "КП, анкеты, договоры, отчёты и шаблоны готовятся вручную и отнимают время.",
  },
  {
    title: "Знания сложно найти",
    text: "Инструкции, ответы и регламенты разбросаны по файлам, чатам и головам сотрудников.",
  },
  {
    title: "Непонятно, с чего начать",
    text: "Есть интерес к автоматизации, но непонятно, какой процесс стоит улучшать первым.",
  },
] as const;

const auditSteps = [
  {
    title: "Обсуждаем процесс",
    text: "Разбираем заявки, документы, клиентские вопросы, CRM, базу знаний и повторяющиеся задачи.",
  },
  {
    title: "Фиксируем точки потерь",
    text: "Смотрим, где есть ручная работа, задержки, потери данных и зависимость от отдельных сотрудников.",
  },
  {
    title: "Отправляем таблицу",
    text: "В течение 2 дней присылаем короткую таблицу: что работает, где слабое место и что проверить первым.",
  },
] as const;

const auditRows = [
  {
    process: "Заявки",
    works: "каналы заявок уже есть",
    weak: "ответственный и статус фиксируются вручную",
    loss: "часть клиентов ждёт ответа",
    ai: "структура заявки, быстрый черновик ответа, фиксация в CRM",
    priority: "высокий",
    comment: "разобрать первым",
  },
  {
    process: "Документы и КП",
    works: "шаблоны уже есть",
    weak: "черновики собираются из разных файлов",
    loss: "время специалистов",
    ai: "черновик КП и проверка комплектности",
    priority: "средний",
    comment: "нужен контроль человека",
  },
  {
    process: "База знаний",
    works: "материалы накоплены",
    weak: "ответ сложно найти",
    loss: "повторные вопросы",
    ai: "поиск по внутренним материалам",
    priority: "средний",
    comment: "проверить структуру",
  },
] as const;

const processes = [
  ["Заявки", "вход, статус, ответственный, follow-up"],
  ["Клиентские вопросы", "типовые ответы, FAQ, поддержка"],
  ["Документы и КП", "шаблоны, анкеты, отчёты, предложения"],
  ["CRM и продажи", "поля, этапы, следующий шаг"],
  ["База знаний", "инструкции, регламенты, внутренние ответы"],
  ["Обучение сотрудников", "адаптация, повторяющиеся объяснения"],
  ["Контент и маркетинг", "идеи, посты, рассылки, скрипты"],
] as const;

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Аудит процессов и автоматизации",
  serviceType: "Аудит бизнес-процессов",
  description:
    "Разбор заявок, документов, CRM, клиентских вопросов и повторяющихся задач с краткой таблицей выводов.",
};

export const metadata: Metadata = {
  title: "Аудит процессов и автоматизации — найдём потери заявок, времени и рутины",
  description:
    "Разберём заявки, документы, CRM, клиентские вопросы и повторяющиеся задачи. По итогам отправим краткую таблицу с выводами по процессам.",
  alternates: {
    canonical: "/ai-audit",
  },
};

export default function AiAuditPage() {
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-24 lg:pt-14">
        <div className="w-full min-w-0">
          <h1 className="max-w-[19ch] text-[clamp(2.55rem,5.8vw,6.8rem)] font-semibold leading-[0.94] tracking-normal text-[#121212]">
            Проведём бесплатный аудит процессов и покажем, где теряются заявки, время и деньги
          </h1>

          <div className="mt-9 max-w-4xl">
            <p className="text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9">
              За 20 минут разберём, как обрабатываются заявки, клиентские вопросы,
              документы, CRM и повторяющиеся задачи. После аудита отправим краткую
              таблицу: что работает, где слабые места и какие процессы можно улучшить.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#audit-form"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#18181B] px-7 text-center text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
              >
                Записаться на аудит ↗
              </Link>
              <p className="text-sm leading-6 text-[#6B6B6B] sm:text-base">
                Таблица с выводами — в течение 2 дней.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16" aria-labelledby="fit-heading">
        <div className="grid w-full gap-8">
          <div className="grid gap-5 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
            <h2
              id="fit-heading"
              className="text-[clamp(2.25rem,4.6vw,4.7rem)] font-semibold leading-[0.98]"
            >
              Кому подходит аудит
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Полезен компаниям, где уже есть заявки, клиенты, сотрудники и повторяющиеся
              процессы, но часть работы всё ещё держится на ручном труде.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {fitCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[26px] border border-[#E6E0D8] bg-white p-5 shadow-[0_12px_34px_rgba(72,57,41,0.045)]"
              >
                <h3 className="text-xl font-semibold leading-7">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BusinessPainSection />

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16" aria-labelledby="steps-heading">
        <div className="grid w-full gap-8">
          <div className="grid gap-5 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
            <h2
              id="steps-heading"
              className="text-[clamp(2.25rem,4.6vw,4.7rem)] font-semibold leading-[0.98]"
            >
              Как проходит аудит
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Короткий разбор бизнес-процессов, после которого вы получаете не длинный
              документ, а понятную таблицу с выводами.
            </p>
          </div>

          <ol className="grid gap-4 lg:grid-cols-3">
            {auditSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[28px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_34px_rgba(72,57,41,0.045)]"
              >
                <p className="text-sm font-semibold text-[#6D4AFF]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-8">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#4B4B4B]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16" aria-labelledby="table-heading">
        <div className="grid w-full gap-8">
          <div className="grid gap-5 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
            <h2
              id="table-heading"
              className="text-[clamp(2.25rem,4.6vw,4.7rem)] font-semibold leading-[0.98]"
            >
              Что вы получите после аудита
            </h2>
            <div className="max-w-3xl">
              <p className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6D4AFF] shadow-[0_10px_28px_rgba(72,57,41,0.04)]">
                1. Фрагмент таблицы — конкретика по процессам
              </p>
              <p className="mt-4 text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
                Фиксируем выводы в формате таблицы: процесс, что уже работает, слабое место, потери, возможность для автоматизации, приоритет и комментарий.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[#E6E0D8] bg-white shadow-[0_16px_48px_rgba(72,57,41,0.07)]">
            <div className="hidden lg:block">
              <div className="grid grid-cols-[0.9fr_1fr_1fr_0.95fr_1.25fr_0.75fr_1fr] gap-3 border-b border-[#E6E0D8] bg-[#18181B] px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                {["Процесс", "Что работает", "Слабое место", "Потери", "Возможность", "Приоритет", "Комментарий"].map((head) => (
                  <p key={head}>{head}</p>
                ))}
              </div>
              {auditRows.map((row) => (
                <div
                  key={row.process}
                  className="grid grid-cols-[0.9fr_1fr_1fr_0.95fr_1.25fr_0.75fr_1fr] gap-3 border-b border-[#E6E0D8] px-5 py-5 last:border-b-0"
                >
                  <p className="font-semibold">{row.process}</p>
                  <p className="text-[#6B6B6B]">{row.works}</p>
                  <p className="text-[#6B6B6B]">{row.weak}</p>
                  <p className="text-[#6B6B6B]">{row.loss}</p>
                  <p className="font-semibold">{row.ai}</p>
                  <p className="text-[#6D4AFF]">{row.priority}</p>
                  <p className="text-[#6B6B6B]">{row.comment}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {auditRows.map((row) => (
                <article key={row.process} className="rounded-[24px] border border-[#E6E0D8] bg-[#F6F3EE] p-4">
                  <h3 className="text-2xl font-semibold leading-8">{row.process}</h3>
                  <div className="mt-4 grid gap-3">
                    {[
                      ["Слабое место", row.weak],
                      ["Потери", row.loss],
                      ["Возможность", row.ai],
                      ["Приоритет", row.priority],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[18px] bg-white p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                          {label}
                        </p>
                        <p className="mt-1 text-base font-semibold leading-6">{value}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16" aria-labelledby="processes-heading">
        <div className="grid w-full gap-8">
          <div className="grid gap-5 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
            <h2
              id="processes-heading"
              className="text-[clamp(2.25rem,4.6vw,4.7rem)] font-semibold leading-[0.98]"
            >
              Какие процессы разбираем
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Берём участки, где есть повторяемость, ручная работа, задержки или
              зависимость от отдельных сотрудников.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {processes.map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-[#E6E0D8] bg-white p-5">
                <h3 className="text-xl font-semibold leading-7">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="audit-form">
        <ContactCTA
          title="Запишитесь на аудит процессов"
          text="Заполните форму — мы уточним, какой процесс стоит разобрать первым: заявки, CRM, документы, клиентские вопросы или ручную рутину."
        >
          <ServiceLeadForm
            serviceSlug="ai-audit"
            serviceTitle="Аудит процессов и автоматизации"
          />
        </ContactCTA>
      </div>

      <SiteMarketingFooter />
    </main>
  );
}
