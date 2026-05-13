import type { Metadata } from "next";
import { AuditScrollLink } from "@/components/ai-audit/audit-scroll-link";
import { BusinessPainSection } from "@/components/ai-audit/business-pain-section";
import { ContactCTA } from "@/components/marketing/light-ui";
import { ServiceLeadForm } from "@/components/services/service-lead-form";
import { SiteMarketingFooter } from "@/components/site/site-marketing-footer";

/** Карточки секции: сегмент → типичная боль → направление улучшения. Семантика секции: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section */
const businessSegmentCards = [
  {
    segment: "Юридические, бухгалтерские, миграционные, визовые и консалтинговые компании",
    pain: "Много однотипных запросов и документов, эксперты тратят время на первичку, клиенты ждут ответа.",
    solution:
      "ИИ-ассистент первичной консультации, генератор чек-листов/документов, база знаний, помощник менеджера.",
  },
  {
    segment: "E-commerce / интернет-магазины / локальные бренды",
    pain: "Много ручного описания товаров и ответов, конкуренция, нужно быстрее обновлять ассортимент.",
    solution: "Генерация карточек и описаний, ассистент поддержки, рекомендации, рассылки.",
  },
  {
    segment: "Онлайн-школы / образовательные проекты",
    pain: "Менеджеры не успевают, много повторяющихся вопросов, дорого держать поддержку, нужен постоянный контент.",
    solution:
      "Бот/ассистент поддержки, генератор контента и рассылок, ассистент РОПа, база знаний для кураторов.",
  },
  {
    segment: "Сервисный бизнес с потоком заявок: студии, салоны, ремонт, частные услуги",
    pain: "Заявки приходят в разные каналы, администратор перегружен, часть клиентов теряется.",
    solution: "Ассистент заявок и записи, автоответы, напоминания, сбор отзывов, FAQ-бот.",
  },
  {
    segment: "Недвижимость / агентства / девелоперские продажи",
    pain: "Лиды холодеют, менеджеры не успевают отвечать, много повторяющихся вопросов.",
    solution: "Ассистент квалификации лида, генератор описаний, база объектов, follow-up помощник.",
  },
  {
    segment: "HR и рекрутинговые агентства",
    pain: "Много ручной сортировки, кандидаты теряются, рекрутеры перегружены.",
    solution: "ИИ-скрининг резюме, ассистент коммуникаций, генератор вакансий, отчёты.",
  },
  {
    segment: "Туризм, визовые центры, миграционные сервисы",
    pain: "Клиенты задают одинаковые вопросы, документы проверяются вручную, менеджеры перегружены.",
    solution: "Ассистент FAQ, генератор чек-листов, проверка полноты анкеты, база знаний.",
  },
  {
    segment: "Производственные и торговые B2B-компании",
    pain: "Долгая подготовка КП, зависимость от опытных менеджеров, много внутренней рутины.",
    solution: "Генератор КП, внутренний ассистент по продуктам, база знаний, аналитика обращений.",
  },
] as const;

/** Ритм 11·2·3 / 4·55·6 на xl (4 колонки); хвост после полных шестёрок без пустых ячеек. // Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout */
function segmentCardColSpanClass(index: number, total: number): string {
  const r = total % 6;
  if (r === 2 && index >= total - 2) return "xl:col-span-2";
  if (r === 1 && index === total - 1) return "xl:col-span-4";
  if (r === 4 && index >= total - 4) return "xl:col-span-2";
  if (r === 5 && index >= total - 5) {
    const i = index - (total - 5);
    if (i === 0 || i === 3 || i === 4) return "xl:col-span-2";
    return "";
  }
  if (index % 6 === 0 || index % 6 === 4) return "xl:col-span-2";
  return "";
}

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
    comment: "где заявка теряет скорость и какой шаг проверить первым",
  },
  {
    process: "Документы и КП",
    works: "шаблоны уже есть",
    weak: "черновики собираются из разных файлов",
    loss: "время специалистов",
    ai: "черновик КП и проверка комплектности",
    priority: "средний",
    comment: "какие шаблоны и данные нужны для быстрого черновика",
  },
  {
    process: "База знаний",
    works: "материалы накоплены",
    weak: "ответ сложно найти",
    loss: "повторные вопросы",
    ai: "поиск по внутренним материалам",
    priority: "средний",
    comment: "какие материалы собрать и какие вопросы повторяются чаще",
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
          <h1 className=" text-[clamp(2.55rem,5.8vw,6.8rem)] font-semibold leading-[0.94] tracking-normal text-[#121212]">
            Проведём бесплатный аудит бизнес-процессов и покажем, что можно автоматизировать, где и как внедрить ИИ.
          </h1>

          <div className="mt-9 max-w-4xl">
            <p className="text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9">
              За 20 минут разберём 2 рабочих процесса в вашем бизнесе. После аудита
              отправим таблицу: где есть просадка, какие точки можно улучшить, что
              конкретно стоит сделать, какой результат это может дать в цифрах и с
              чего лучше начать в первую очередь.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <AuditScrollLink
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#18181B] px-7 text-center text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
              >
                Записаться на аудит ↗
              </AuditScrollLink>
              <p className="text-sm leading-6 text-[#6B6B6B] sm:text-base">
                Таблица с выводами — в течение 2 дней.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section
        className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16"
        aria-labelledby="segments-heading"
      >
        <div className="grid w-full gap-8">
          <div className="grid gap-5 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
            <h2
              id="segments-heading"
              className="text-[clamp(2.25rem,4.6vw,4.7rem)] font-semibold leading-[0.98]"
            >
              Кому подходит аудит
            </h2>
            <p className="max-w-3xl text-right leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Конкретные зоны бизнеса: как боль проявляется в работе и какое направление улучшения
              обычно даёт быстрый эффект после аудита.
            </p>
          </div>

          {/* Сетка 4 колонки на xl: ряд 1 — [2+1+1], ряд 2 — [1+2+1]; хвосты см. segmentCardColSpanClass */}
          <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {businessSegmentCards.map((item, index) => (
              <article
                key={item.segment}
                className={`group flex h-full min-w-0 flex-col rounded-[28px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_36px_rgba(72,57,41,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#6D4AFF]/35 hover:shadow-[0_18px_52px_rgba(72,57,41,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${segmentCardColSpanClass(
                  index,
                  businessSegmentCards.length,
                )}`}
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1EAFF] text-sm font-bold text-[#6D4AFF] ring-1 ring-[#D8CCFF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-[1.38rem] font-semibold leading-[1.18] text-[#121212] sm:text-2xl">
                  {item.segment}
                </h3>

                <div className="mt-6 flex flex-1 flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                      Как проявляется
                    </p>
                    <p className="mt-2 text-[15px] leading-[1.58] text-[#4B4B4B]">{item.pain}</p>
                  </div>

                  <div className="mt-auto rounded-[18px] bg-[#18181B] p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8FF5C]">
                      Возможное решение
                    </p>
                    <p className="mt-2 text-[15px] font-semibold leading-[1.55] text-white/90">
                      {item.solution}
                    </p>
                  </div>
                </div>
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
              <p className="text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
                Получаете короткую таблицу по двум рабочим процессам: где есть просадка,
                что улучшить, какое действие сделать первым и какой результат можно
                оценить в цифрах.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[#E6E0D8] bg-white shadow-[0_16px_48px_rgba(72,57,41,0.07)]">
            <div className="hidden lg:block">
              <div className="grid grid-cols-[0.9fr_1fr_1fr_0.95fr_1.25fr_0.75fr_1fr] gap-3 border-b border-[#E6E0D8] bg-[#18181B] px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                {["Процесс", "Что работает", "Слабое место", "Потери", "Возможность", "Приоритет", "Что получите"].map((head) => (
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
                      ["Что получите", row.comment],
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
