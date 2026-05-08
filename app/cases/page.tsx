import type { Metadata } from "next";
import Link from "next/link";
import { rowToCaseCard } from "@/lib/cases/case-study-helpers";
import { fetchPublishedCaseStudies } from "@/lib/cases/fetch-case-studies";

export const metadata: Metadata = {
  title: {
    absolute: "Разборы задач Skybric — сайты, CRM, Telegram, SEO и автоматизация",
  },
  description:
    "Разборы B2B-задач: где ломался процесс, что можно собрать вместо ручной работы, какие системы связать и что станет проще после запуска.",
  alternates: {
    canonical: "/cases",
  },
};

/** Примеры карточек, если в Supabase ещё нет опубликованных кейсов (см. seed `case_studies` / Dashboard). */
const staticExamples = [
  {
    task: "Заявки приходят из сайта, Telegram и звонков",
    loss:
      "Часть обращений остаётся в чатах, статус не фиксируется, follow-up зависит от памяти менеджера.",
    build:
      "Маршрут заявки: форма или бот принимает данные, CRM создаёт карточку, менеджер получает задачу и напоминание.",
    systems: "сайт, Telegram, CRM, уведомления, аналитика",
    easier:
      "Команде проще видеть источник, ответственного, статус и следующий шаг по каждому обращению.",
  },
  {
    task: "Корпоративный сайт не объясняет сложный продукт",
    loss:
      "Посетитель не понимает, чем отличаются услуги, почему стоит оставить заявку и какой следующий шаг.",
    build:
      "Структуру money-pages, понятные CTA, формы, SEO-метаданные и маршрут заявки в CRM или почту.",
    systems: "сайт, формы, SEO, аналитика, CRM",
    easier:
      "Маркетинг быстрее тестирует офферы, а клиент получает ясную структуру без лишнего визуального шума.",
  },
  {
    task: "Клиентам нужен личный кабинет",
    loss:
      "Статусы, документы, комментарии и вопросы идут через менеджеров, таблицы и ручные пересылки.",
    build:
      "Кабинет с ролями, статусами, документами, историей действий, уведомлениями и backend-логикой.",
    systems: "frontend, backend, CRM, документы, роли",
    easier:
      "Клиент и команда видят один рабочий контур, а не набор разрозненных сообщений и файлов.",
  },
  {
    task: "CRM есть, но руководитель не видит реальную картину",
    loss:
      "Карточки неполные, переписки живут отдельно, данные переносятся вручную, следующие шаги забываются.",
    build:
      "Интеграции с формами, Telegram, задачами, контролем обязательных полей и резюме коммуникаций.",
    systems: "CRM, сайт, Telegram, телефония, email",
    easier:
      "Проще увидеть, где зависают сделки, какие данные не заполнены и кто отвечает за следующий шаг.",
  },
  {
    task: "SEO не связано с продажами",
    loss:
      "Статьи публикуются отдельно, страницы услуг не закрывают коммерческий intent, внутренняя связность слабая.",
    build:
      "Карту service-pages, семантику, структуру контента, внутренние ссылки, sitemap и корректные metadata.",
    systems: "сайт, CMS, sitemap, metadata, Search Console",
    easier:
      "Команда понимает, какие страницы работают на спрос, а не просто наполняет сайт материалами.",
  },
  {
    task: "Telegram-бот нужен не для эффекта, а для процесса",
    loss:
      "Пользователь пишет в чат, менеджер вручную уточняет данные, отправляет статус и переносит заявку.",
    build:
      "Сценарий бота с вопросами, статусами, уведомлениями, оплатой при необходимости и записью в CRM.",
    systems: "Telegram Bot API, CRM, backend, уведомления",
    easier:
      "Повторяемый сценарий проходит одинаково, а данные не остаются только в переписке.",
  },
] as const;

type CaseCard = {
  key: string;
  href?: string;
  task: string;
  loss: string;
  build: string;
  systems: string;
  easier: string;
};

function staticFallbackCards(): CaseCard[] {
  return staticExamples.map((item) => ({
    key: `static-${item.task.slice(0, 48)}`,
    task: item.task,
    loss: item.loss,
    build: item.build,
    systems: item.systems,
    easier: item.easier,
  }));
}

export default async function CasesPage() {
  const rows = await fetchPublishedCaseStudies();
  const cards: CaseCard[] =
    rows.length > 0 ? rows.map(rowToCaseCard) : staticFallbackCards();

  return (
    <main className="min-h-screen bg-[#F6F3EE] px-5 pb-24 pt-12 text-[#121212] sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <h1 className="max-w-6xl text-[clamp(2.55rem,6.2vw,5.7rem)] font-semibold leading-[1.01]">
          Разборы задач: где ломался процесс и что можно собрать вместо ручной работы
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9 lg:justify-self-end">
          Показываем не абстрактные услуги, а рабочую логику: контекст, ограничения,
          архитектуру решения, стек, интеграции и следующий шаг для бизнеса.
        </p>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        {cards.map((item) => {
          const body = (
            <article className="rounded-[32px] border border-[#E6E0D8] bg-white p-6 shadow-[0_18px_55px_rgba(72,57,41,0.08)] sm:p-8">
              <h2 className="text-3xl font-semibold leading-10">{item.task}</h2>
              <div className="mt-8 grid gap-5">
                <div className="border-t border-[#E6E0D8] pt-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                    Где терялось время / контроль / заявка
                  </p>
                  <p className="mt-2 text-base leading-7 text-[#4B4B4B]">{item.loss}</p>
                </div>
                <div className="rounded-[22px] bg-[#F6F3EE] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                    Что можно собрать
                  </p>
                  <p className="mt-2 text-base font-semibold leading-7">{item.build}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border-t border-[#E6E0D8] pt-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                      Какие системы связать
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#4B4B4B]">{item.systems}</p>
                  </div>
                  <div className="border-t border-[#E6E0D8] pt-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                      Что станет проще
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#4B4B4B]">{item.easier}</p>
                  </div>
                </div>
              </div>
            </article>
          );

          return item.href ? (
            <Link key={item.key} href={item.href} className="block text-inherit no-underline">
              {body}
            </Link>
          ) : (
            <div key={item.key}>{body}</div>
          );
        })}
      </section>

      <Link
        href="/contact"
        className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-[#18181B] px-7 text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        Разобрать похожую задачу
      </Link>
    </main>
  );
}
