import type { Metadata } from "next";
import Link from "next/link";
import { ServiceLeadForm } from "@/components/services/service-lead-form";
import { serviceList } from "@/lib/services/services-data";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Skybric — веб-разработка, автоматизация и digital-системы для бизнеса",
  },
  description:
    "Разрабатываем сайты, веб-сервисы, Telegram-ботов, CRM-интеграции, AI-автоматизацию, SEO и fintech-решения для B2B-компаний в Казахстане и на международном рынке.",
  alternates: {
    canonical: "/",
  },
};

const outputItems = [
  {
    title: "Понятный путь до заявки",
    text: "Сайт, форма, Telegram или кабинет не живут отдельно: пользователь видит следующий шаг, а команда получает контекст.",
  },
  {
    title: "Меньше ручного переноса",
    text: "Связываем формы, CRM, уведомления, документы и внутренние системы там, где команда сейчас копирует данные руками.",
  },
  {
    title: "Больше контроля по процессу",
    text: "Фиксируем статусы, ответственных, историю действий и точки, где заявка или задача теряет скорость.",
  },
  {
    title: "SEO как часть системы",
    text: "Строим структуру money-pages, метаданные, связность и техническую базу, а не отдельный поток статей без роли в продажах.",
  },
] as const;

const taskAnalyses = [
  {
    title: "Заявки приходят из сайта, Telegram и звонков",
    problem: "Часть обращений остаётся в переписках, статус не попадает в CRM, follow-up зависит от менеджера.",
    solution: "Собрать маршрут: форма или бот → CRM → ответственный → задача → напоминание.",
    systems: "сайт, Telegram, CRM, уведомления",
    easier: "команде проще видеть источник, статус и следующий шаг по каждому обращению.",
  },
  {
    title: "Нужен личный кабинет или внутренний портал",
    problem: "Статусы, документы и комментарии живут в таблицах, чатах и ручных пересылках.",
    solution: "Собрать кабинет с ролями, документами, историей действий и backend-логикой.",
    systems: "frontend, backend, CRM, документы, роли",
    easier: "клиент и команда видят один рабочий контур вместо набора разрозненных файлов.",
  },
  {
    title: "SEO не связано с коммерческими страницами",
    problem: "Контент публикуется отдельно, услуги описаны слишком общо, внутренние ссылки не поддерживают money-pages.",
    solution: "Собрать карту спроса: услуги, семантика, контентные кластеры, перелинковка и technical SEO.",
    systems: "сайт, CMS, sitemap, metadata, analytics",
    easier: "маркетинг понимает, какие страницы и материалы работают на коммерческий intent.",
  },
] as const;

const processPreview = [
  ["01", "Разбираем процесс", "Смотрим, где теряются заявки, время, данные и контроль."],
  ["02", "Проектируем архитектуру", "Описываем страницы, роли, интеграции, данные и MVP-объём."],
  ["03", "Собираем и связываем", "Делаем frontend, backend, CRM, Telegram, SEO-базу или AI-слой."],
  ["04", "Запускаем и улучшаем", "Проверяем на реальных сценариях и дорабатываем по фактам."],
] as const;

function JsonLd() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Skybric",
    url: siteUrl,
    email: "hello@skybric.kz",
    areaServed: ["Kazakhstan", "Worldwide"],
    knowsAbout: [
      "web development",
      "CRM integrations",
      "Telegram bots",
      "SEO",
      "AI automation",
      "fintech development",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Skybric",
    url: siteUrl,
    inLanguage: "ru",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

function HeroSystemCard() {
  const rows = [
    ["Сайт / лендинг", "объясняет продукт и собирает заявку"],
    ["Telegram / форма", "принимает данные и передаёт контекст"],
    ["CRM / backend", "фиксирует статус, ответственного и следующий шаг"],
    ["SEO / аналитика", "поддерживает спрос и измерение"],
  ] as const;

  return (
    <aside className="rounded-[30px] border border-[#E6E0D8] bg-white p-5 shadow-[0_24px_70px_rgba(72,57,41,0.1)] lg:p-7">
      <h2 className="text-3xl font-semibold leading-9 text-[#121212]">
        Цифровой контур под задачу бизнеса
      </h2>
      <div className="mt-7 grid gap-3">
        {rows.map(([title, text], index) => (
          <div
            key={title}
            className="grid gap-3 rounded-[22px] border border-[#E6E0D8] bg-[#F6F3EE] p-4 sm:grid-cols-[3rem_minmax(0,1fr)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-[#6D4AFF] ring-1 ring-[#E6E0D8]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-base font-semibold leading-6">{title}</p>
              <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      <JsonLd />

      <section className="grid gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.46fr)] lg:items-end lg:px-10 lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <h1 className="max-w-6xl text-[clamp(2.55rem,6.6vw,5.9rem)] font-semibold leading-[1.01] tracking-normal">
            Сайты, веб-сервисы и автоматизация, которые двигают продажи и операционку
          </h1>
          <p className="mt-7 max-w-4xl text-base leading-7 text-[#3F3F3F] sm:text-xl sm:leading-9">
            Skybric проектирует цифровые системы для B2B и fintech: от продающих сайтов
            и личных кабинетов до Telegram-ботов, CRM-интеграций и SEO-роста. AI
            подключаем там, где он реально сокращает ручную работу, ускоряет команду и
            даёт больше контроля.
          </p>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-[#121212]">
            Web-разработка • Telegram • CRM • SEO • AI-automation • B2B / fintech
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#18181B] px-7 text-center text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.25)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Обсудить архитектуру проекта
            </Link>
            <Link
              href="/cases"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#E6E0D8] bg-white px-7 text-center text-base font-semibold text-[#121212] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Посмотреть разборы задач
            </Link>
          </div>
        </div>
        <HeroSystemCard />
      </section>

      <section id="services" className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4.6rem)] font-semibold leading-[1]">
            Что мы собираем для бизнеса
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
            Каждое направление связано с конкретным процессом: привлечь заявку,
            объяснить продукт, связать CRM, убрать ручной перенос данных или построить
            органический спрос.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceList.map((service) => (
            <article
              key={service.slug}
              className="flex min-h-full flex-col rounded-[28px] border border-[#E6E0D8] bg-[#F6F3EE] p-6 transition hover:bg-white hover:shadow-[0_22px_70px_rgba(72,57,41,0.1)]"
            >
              <h3 className="text-2xl font-semibold leading-8">{service.title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-[#4B4B4B]">
                {service.shortDescription}
              </p>
              <ul className="mt-6 grid gap-2 border-t border-[#E6E0D8] pt-5">
                {service.valuePoints.map((point) => (
                  <li key={point} className="text-sm font-semibold leading-6 text-[#121212]">
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={service.path}
                className="mt-7 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[#18181B] px-5 text-sm font-semibold text-white transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
              >
                Подробнее
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4.6rem)] font-semibold leading-[1]">
            Что получает бизнес на выходе
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
            Мы не отделяем дизайн от процесса. Смотрим, как заявка, пользователь,
            менеджер, CRM, контент и данные проходят через систему.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {outputItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-[#E6E0D8] bg-white p-6 shadow-[0_18px_55px_rgba(72,57,41,0.07)]"
            >
              <h3 className="text-2xl font-semibold leading-8">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#4B4B4B]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#EFE9DF] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-8 rounded-[34px] border border-[#DCD3C8] bg-white p-6 shadow-[0_24px_75px_rgba(72,57,41,0.09)] sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
          <div>
            <h2 className="text-[clamp(2.2rem,4.4vw,4.4rem)] font-semibold leading-[1]">
              Компактная senior-команда, которая ведёт проект руками
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Skybric — небольшая технологическая команда из 5 специалистов. Мы не
              раздуваем процесс и не передаём клиента между отделами. Тот, кто
              проектирует архитектуру, остаётся в проекте до запуска и доработок.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "проектирование архитектуры",
              "frontend и backend",
              "интеграции и автоматизация",
              "контент, SEO и запуск",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#E6E0D8] bg-[#F6F3EE] p-5 text-lg font-semibold leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4.6rem)] font-semibold leading-[1]">
            Разборы задач вместо выдуманных кейсов
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
            Не используем неподтверждённые проценты, логотипы и истории. Показываем
            рабочую логику: что ломалось, что можно собрать и какие системы связать.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {taskAnalyses.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-[#E6E0D8] bg-white p-6">
              <h3 className="text-2xl font-semibold leading-8">{item.title}</h3>
              <div className="mt-6 grid gap-4">
                <div className="border-t border-[#E6E0D8] pt-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                    Где терялся контроль
                  </p>
                  <p className="mt-2 text-base leading-7 text-[#4B4B4B]">{item.problem}</p>
                </div>
                <div className="rounded-[20px] bg-[#F6F3EE] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                    Что можно собрать
                  </p>
                  <p className="mt-2 text-base font-semibold leading-7">{item.solution}</p>
                </div>
                <p className="text-sm leading-6 text-[#6B6B6B]">
                  Системы: {item.systems}. После запуска: {item.easier}
                </p>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/cases"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-[#DCD3C8] bg-white px-6 text-sm font-semibold text-[#121212] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
        >
          Посмотреть все разборы
        </Link>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-8 rounded-[34px] border border-[#E6E0D8] bg-[#F6F3EE] p-6 sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
          <h2 className="text-[clamp(2.15rem,4.2vw,4.1rem)] font-semibold leading-[1]">
            Как мы переводим задачу в рабочую систему
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {processPreview.map(([number, title, text]) => (
              <article key={title} className="border-t border-[#DCD3C8] pt-5">
                <p className="text-sm font-semibold text-[#6D4AFF]">{number}</p>
                <h3 className="mt-4 text-xl font-semibold leading-7">{title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="grid gap-10 rounded-[34px] border border-[#2B2B31] bg-[#18181B] p-5 text-white shadow-[0_34px_100px_rgba(24,24,27,0.2)] sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
          <div>
            <h2 className="text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[0.98]">
              Есть задача, где сайт, CRM, Telegram или SEO должны работать как система?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
              Опишите задачу — посмотрим, какой формат решения подойдёт, что стоит
              собрать первым и какие интеграции нужны для запуска.
            </p>
            <Link
              href="/ai-audit"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white/82 transition hover:border-white/35 hover:text-white"
            >
              Аудит процессов и автоматизации
            </Link>
          </div>
          <ServiceLeadForm serviceSlug="homepage" serviceTitle="Главная страница Skybric" />
        </div>
      </section>
    </main>
  );
}
