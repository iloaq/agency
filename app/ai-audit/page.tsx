import type { Metadata } from "next";
import { BusinessPainSection } from "@/components/ai-audit/business-pain-section";
import { AiAuditForm } from "./ai-audit-form";

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
    title: "Непонятно, с чего начать с ИИ",
    text: "Вы слышали про ИИ, но не понимаете, какой процесс стоит улучшать первым.",
  },
] as const;

const auditSteps = [
  {
    badge: "Знакомство",
    title: "Знакомимся с вашим бизнесом (Телемост, Google meet, Zoom и тд.)",
    text: "Фиксируем контекст, роли, каналы заявок и процессы, которые стоит разобрать первыми.",
  },
  {
    badge: "Разбор процессов",
    title: "Разбираем конкретно 2 процесса",
    text: "Смотрим, где есть ручная работа, задержки, потери данных и зависимость от сотрудников.",
  },
  {
    badge: "Фиксация, обмен контактами",
    title: "В течение 2 дней отправляем таблицу",
    text: "Отправляем краткий результат: что работает, где слабое место и что можно проверить первым.",
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
    weak: "черновики из разных файлов",
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
  {
    title: "Заявки",
    focus: "вход, статус, ответственный, follow-up.",
  },
  {
    title: "Клиентские вопросы",
    focus: "типовые ответы, FAQ, поддержка.",
  },
  {
    title: "Документы и КП",
    focus: "шаблоны, анкеты, отчёты, предложения.",
  },
  {
    title: "CRM и продажи",
    focus: "поля, этапы, следующий шаг.",
  },
  {
    title: "База знаний",
    focus: "инструкции, регламенты, внутренние ответы.",
  },
  {
    title: "Обучение сотрудников",
    focus: "адаптация, повторяющиеся объяснения, онбординг.",
  },
  {
    title: "Контент и маркетинг",
    focus: "идеи, посты, рассылки, скрипты.",
  },
] as const;

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Аудит процессов и автоматизации",
  serviceType: "Аудит процессов и автоматизации",
  description:
    "Разбор заявок, документов, CRM, клиентских вопросов и повторяющихся задач с краткой таблицей выводов.",
};

export const metadata: Metadata = {
  title: "Аудит процессов и автоматизации — найдём потери заявок, времени и рутины",
  description:
    "Разберём заявки, документы, CRM, клиентские вопросы и повторяющиеся задачи. Покажем, где теряется время и какие процессы можно автоматизировать.",
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

      <section className="px-5 pb-14 pt-10 sm:px-8 lg:px-10 lg:pb-20 lg:pt-14">
        <div className="w-full min-w-0">
          <h1 className="break-words text-[clamp(2.55rem,6.4vw,7rem)] font-semibold leading-[0.94] tracking-normal text-[#121212]">
            Проведём бесплатный аудит процессов и покажем, где вы теряете заявки,
            время сотрудников и деньги
          </h1>

          <div className="mt-8 max-w-4xl">
            <p className="text-base leading-7 text-[#3F3F3F] sm:text-lg sm:leading-8">
              За 20 минут разберём, как у вас обрабатываются заявки, клиентские вопросы,
              документы, CRM и повторяющиеся задачи. После аудита отправим таблицу с выводами:
              где слабые места, что конкретно можно улучшить и какой участок стоит проверить первым.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#audit-form"
              className="inline-flex min-h-14 w-full min-w-0 items-center justify-center rounded-[18px] bg-[#18181B] px-7 text-center text-base font-semibold leading-6 text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF] sm:w-auto"
            >
              <span className="min-w-0 max-w-full whitespace-normal break-words">
                Записаться на бесплатный аудит
              </span>
            </a>
            <p className="max-w-xl text-sm leading-6 text-[#6B6B6B] sm:text-base">
              20 минут общения. Таблица с выводами — в течение 2 дней.
            </p>
          </div>
        </div>
      </section>

      <section
        className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
        aria-labelledby="fit-heading"
      >
        <div className="grid w-full min-w-0 gap-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2
                id="fit-heading"
                className="max-w-4xl text-[clamp(2.3rem,4.6vw,4.5rem)] font-semibold leading-[0.98] tracking-normal text-[#121212]"
              >
                Кому подходит аудит?
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
              Аудит полезен компаниям, где уже есть заявки, клиенты, сотрудники и
              повторяющиеся процессы — но часть работы всё ещё держится на ручном труде.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {fitCards.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[26px] border border-[#DCD3C8] bg-white p-5 shadow-[0_12px_34px_rgba(72,57,41,0.05)]"
              >
                <p className="text-sm font-semibold text-[#6D4AFF]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-7 text-[#121212]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BusinessPainSection />

      <section
        className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
        aria-labelledby="includes-heading"
      >
        <div className="grid w-full min-w-0 gap-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
            <h2
              id="includes-heading"
              className="max-w-4xl text-[clamp(2.4rem,4.8vw,4.8rem)] font-semibold leading-[0.98] tracking-normal text-[#121212]"
            >
              Как проходит аудит
            </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
              Это короткий разбор бизнес-процессов, после которого вы получаете не длинный
              документ, а понятную таблицу с выводами.
            </p>
          </div>

          <ol className="grid min-w-0 gap-4 lg:grid-cols-3">
            {auditSteps.map((item, index) => (
              <li
                key={item.title}
                className="rounded-[30px] border border-[#DCD3C8] bg-white p-6 shadow-[0_12px_36px_rgba(72,57,41,0.055)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[#6D4AFF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-[#6B6B6B]">{item.badge}</span>
                </div>
                <h3 className="mt-10 text-3xl font-semibold leading-9 text-[#121212]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#4B4B4B]">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24" aria-labelledby="table-heading">
        <div className="flex w-full min-w-0 flex-col">
          <div className="grid gap-8 lg:items-end">
            <div>
              <h2
                id="table-heading"
                className="text-[clamp(2.4rem,4.8vw,4.8rem)] font-semibold leading-[0.98] tracking-normal text-[#121212]"
              >
                Фрагмент таблицы после аудита
              </h2>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[32px] border border-[#E6E0D8] bg-white shadow-[0_16px_48px_rgba(72,57,41,0.07)]">
            <div className="flex flex-col gap-4 border-b border-[#E6E0D8] bg-[#18181B] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="mt-2 text-2xl font-semibold">Быстро видно, где болит процесс</p>
              </div>
              <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#121212]">
                после аудита
              </span>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-[0.9fr_1fr_1fr_0.95fr_1.25fr_0.75fr_1fr] gap-3 border-b border-[#E6E0D8] bg-[#F6F3EE] px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                {[
                  "Процесс",
                  "Что работает",
                  "Слабое место",
                  "Потери",
                  "Возможность для ИИ",
                  "Приоритет",
                  "Комментарий",
                ].map((head) => (
                  <p key={head}>{head}</p>
                ))}
              </div>
              {auditRows.map((row) => (
                <div
                  key={row.process}
                  className="grid grid-cols-[0.9fr_1fr_1fr_0.95fr_1.25fr_0.75fr_1fr] gap-3 border-b border-[#E6E0D8] px-5 py-5 last:border-b-0"
                >
                  <p className="font-semibold text-[#121212]">{row.process}</p>
                  <p className="text-[#6B6B6B]">{row.works}</p>
                  <p className="text-[#6B6B6B]">{row.weak}</p>
                  <p className="text-[#6B6B6B]">{row.loss}</p>
                  <p className="font-semibold text-[#121212]">{row.ai}</p>
                  <p>
                    <span className="rounded-full bg-[#6D4AFF]/10 px-3 py-1 text-sm font-semibold text-[#6D4AFF]">
                      {row.priority}
                    </span>
                  </p>
                  <p className="text-[#6B6B6B]">{row.comment}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {auditRows.map((row) => (
                <article
                  key={row.process}
                  className="rounded-[24px] border border-[#E6E0D8] bg-[#F6F3EE] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold leading-7">{row.process}</h3>
                    <span className="rounded-full bg-[#6D4AFF]/10 px-3 py-1 text-sm font-semibold text-[#6D4AFF]">
                      {row.priority}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[
                      ["Слабое место", row.weak],
                      ["Потери", row.loss],
                      ["Возможность для ИИ", row.ai],
                      ["Комментарий", row.comment],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[18px] bg-white p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                          {label}
                        </p>
                        <p className="mt-1 text-base font-semibold leading-6 text-[#121212]">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
        aria-labelledby="process-heading"
      >
        <div className="grid w-full min-w-0 gap-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2
                id="process-heading"
                className="max-w-4xl text-[clamp(2.4rem,4.8vw,4.8rem)] font-semibold leading-[0.98] tracking-normal text-[#121212]"
              >
                Какие процессы разбираем
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
              Берём участки, где есть повторяемость, ручная работа, задержки или зависимость
              от отдельных сотрудников.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[28px] bg-[#18181B] p-6 text-white shadow-[0_16px_46px_rgba(24,24,27,0.14)] xl:col-span-1">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#B8FF5C]">
                критерий
              </p>
              <p className="mt-8 text-3xl font-semibold leading-9">
                Повторяется, задерживает или зависит от человека
              </p>
            </div>
            {processes.map((process, index) => (
              <article
                key={process.title}
                className="rounded-[28px] border border-[#E6E0D8] bg-[#F6F3EE] p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_55px_rgba(72,57,41,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <p className="text-sm font-semibold text-[#6D4AFF]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-7 text-[#121212]">
                  {process.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#6B6B6B]">{process.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="audit-form"
        className="px-5 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24"
        aria-labelledby="form-heading"
      >
        <div className="grid w-full min-w-0 gap-8 rounded-[34px] border border-[#DCD3C8] bg-white p-5 shadow-[0_24px_70px_rgba(72,57,41,0.08)] sm:p-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:p-10">
          <div className="min-w-0">
            <div>
              <h2
                id="form-heading"
                className="text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[0.98] tracking-normal text-[#121212]"
              >
                Записаться на бесплатный аудит
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#4B4B4B]">
                Заполните форму — мы свяжемся с вами в течение 2 часов, чтобы уточнить дату созвона.
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <AiAuditForm />
          </div>
        </div>
      </section>
    </main>
  );
}
