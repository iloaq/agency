import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ServiceLeadForm } from "@/components/services/service-lead-form";
import { LogoText } from "@/components/site/logo";
import { SITE_CONTACTS_FALLBACK } from "@/lib/site/site-contacts-model";
import { siteUrl } from "@/lib/site-url";
import { serviceList } from "@/lib/services/services-data";

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

const approachItems = [
  "Архитектура перед дизайном и кодом",
  "Сайт, CRM и интеграции в одном контуре",
  "Доработки после запуска по фактическим данным",
] as const;

const resultItems = [
  {
    title: "Заявки",
    text: "Маршрут от сайта, Telegram или формы до CRM становится понятнее для команды.",
  },
  {
    title: "Рутина",
    text: "Повторяющиеся действия можно связать через backend, интеграции и сценарии.",
  },
  {
    title: "Контроль",
    text: "Руководитель видит статусы, источники, ответственных и следующий шаг.",
  },
] as const;

const processSteps = [
  ["01", "Погружаемся и анализируем", "Изучаем задачу, систему, аудиторию, ограничения и цель."],
  ["02", "Проектируем решение", "Создаём архитектуру, прототипы и план реализации."],
  ["03", "Разрабатываем и интегрируем", "Пишем код, настраиваем backend, CRM, API и сценарии."],
  ["04", "Запускаем и обучаем", "Проверяем решение, передаём доступы и объясняем логику."],
  ["05", "Поддерживаем и развиваем", "Анализируем результат и улучшаем продукт вместе с вами."],
] as const;

const teamRoles = [
  ["Стратегия", "архитектура продукта"],
  ["Дизайн", "UX/UI и прототипы"],
  ["Разработка", "frontend и backend"],
  ["Интеграции", "CRM, API, Telegram"],
  ["Маркетинг", "SEO и контент"],
] as const;

function JsonLd() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Skybric",
    url: siteUrl,
    email: SITE_CONTACTS_FALLBACK.email,
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

function ArrowBadge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-full border text-lg transition",
        dark
          ? "border-white/18 bg-white/10 text-white"
          : "border-[#DCD3C8] bg-white text-[#121212]",
      ].join(" ")}
    >
      ↗
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit text-sm font-semibold uppercase tracking-[0.12em] text-[#6D4AFF]">
      {children}
    </span>
  );
}

function ServiceIcon() {
  return (
    <div className="grid h-11 w-11 place-items-center rounded-full border border-[#E6E0D8] bg-[#F6F3EE] text-lg font-semibold text-[#6D4AFF]">
      +
    </div>
  );
}

function SystemMap() {
  const lanes = [
    ["Вход", "Сайт", "Telegram", "SEO"],
    ["Логика", "Формы", "CRM", "Backend"],
    ["Контроль", "Статусы", "Задачи", "Отчёты"],
  ] as const;

  return (
    <div className="grid min-h-[360px] content-between rounded-[32px] bg-[#111113] p-5 lg:min-h-[430px] lg:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#B8FF5C]">
            единый контур
          </p>
          <p className="mt-4 max-w-md text-3xl font-semibold leading-[1.08] text-white">
            Маршрут заявки и данных без разрыва между каналами
          </p>
        </div>
        <div className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/74">
          от входа до follow-up
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {lanes.map(([title, ...items], index) => (
          <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm font-semibold text-[#B8FF5C]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
            <div className="mt-5 grid gap-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="rounded-[16px] border border-white/10 bg-[#151519] px-4 py-3 text-sm font-semibold text-white/78"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      <JsonLd />

      <section className="px-5 pb-14 pt-10 sm:px-8 lg:px-10 lg:pb-20 lg:pt-14">
        <div className="w-full min-w-0">
          <SectionLabel>Технологический партнёр</SectionLabel>
          <h1 className="mt-7 text-[clamp(2.55rem,6.4vw,7rem)] font-semibold leading-[0.94] tracking-normal">
            Цифровые системы, которые <span className="text-[#6D4AFF]">масштабируют</span> ваш бизнес
          </h1>

          <div className="mt-8 max-w-3xl">
            <p className="text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
              Создаём сайты, сервисы и автоматизацию, которые увеличивают управляемость
              процессов, сокращают ручную работу и помогают команде быстрее доводить
              клиента до следующего шага.
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
              href="/services"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-[#E6E0D8] bg-white px-7 text-center text-base font-semibold text-[#121212] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Все услуги <ArrowBadge />
            </Link>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {approachItems.map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-[#E6E0D8] bg-white px-5 py-4 text-sm font-semibold leading-5 text-[#4B4B4B] shadow-[0_12px_34px_rgba(72,57,41,0.045)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="w-full min-w-0">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Что мы делаем</SectionLabel>
              <h2 className="mt-5 max-w-xl text-[clamp(2.05rem,3.4vw,3.6rem)] font-semibold leading-[1.05]">
                Системы, которые закрывают конкретные задачи
              </h2>
            </div>
            <Link href="/services" className="w-fit text-sm font-semibold underline underline-offset-4">
              Все услуги ↗
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceList.map((service) => (
              <Link
                key={service.slug}
                href={service.path}
                className="group flex min-h-[220px] flex-col rounded-[24px] border border-[#E6E0D8] bg-white p-5 shadow-[0_12px_34px_rgba(72,57,41,0.045)] transition hover:-translate-y-0.5 hover:border-[#6D4AFF]/30 hover:shadow-[0_18px_52px_rgba(72,57,41,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <ServiceIcon />
                <h3 className="mt-6 text-lg font-semibold leading-6">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#6B6B6B]">
                  {service.valuePoints[0]}
                </p>
                <ArrowBadge />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="w-full rounded-[34px] bg-[#18181B] p-6 text-white shadow-[0_24px_70px_rgba(24,24,27,0.16)] sm:p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(2.2rem,4vw,4.2rem)] font-semibold leading-[1.02]">
                Не набор услуг, а единая система роста
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/68">
                Объединяем технологии, аналитику и автоматизацию, чтобы сайт, CRM,
                Telegram, SEO и внутренние процессы работали на общую цель.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex min-h-13 items-center justify-center rounded-2xl bg-[#6D4AFF] px-6 text-base font-semibold text-white transition hover:bg-[#5D3EE4]"
              >
                Обсудить архитектуру ↗
              </Link>
            </div>
            <SystemMap />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid w-full gap-5 rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_16px_46px_rgba(72,57,41,0.055)] lg:grid-cols-[0.36fr_0.64fr] lg:p-8">
          <div>
              <SectionLabel>Результаты</SectionLabel>
              <h2 className="mt-5 text-[clamp(2rem,3vw,3.2rem)] font-semibold leading-[1.04]">
              Технологии, которые дают измеримый результат
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6B6B6B]">
              Мы не ставим неподтверждённые проценты. Результат фиксируем в процессах:
              скорость реакции, меньше ручной работы, чище данные и понятнее контроль.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {resultItems.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-[#E6E0D8] bg-[#F6F3EE] p-5">
                <ServiceIcon />
                <h3 className="mt-6 text-3xl font-semibold text-[#121212]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="w-full min-w-0">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel>Как мы работаем</SectionLabel>
              <h2 className="mt-5 max-w-xl text-[clamp(2.05rem,3.4vw,3.6rem)] font-semibold leading-[1.05]">
                Прозрачный процесс — понятный результат
              </h2>
            </div>
            <Link href="/process" className="w-fit text-sm font-semibold underline underline-offset-4">
              Подробнее о подходе ↗
            </Link>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map(([number, title, text]) => (
              <li key={title} className="rounded-[26px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_34px_rgba(72,57,41,0.045)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#6D4AFF]/10 text-sm font-semibold text-[#6D4AFF]">
                  {number}
                </span>
                <h3 className="mt-12 text-xl font-semibold leading-7">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="team" className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="w-full min-w-0">
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
            <div>
              <SectionLabel>Команда</SectionLabel>
              <h2 className="mt-5 max-w-2xl text-[clamp(2.05rem,3.4vw,3.6rem)] font-semibold leading-[1.05]">
                Эксперты, которые думают как партнёры
              </h2>
            </div>
            <p className="text-base leading-7 text-[#6B6B6B]">
              Стратегия, дизайн, разработка, интеграции и SEO работают вместе, чтобы
              решение не распалось на отдельные куски.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {teamRoles.map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-[#E6E0D8] bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D4AFF]">
                  роль
                </p>
                <div className="mt-12 flex items-end justify-between gap-4 border-t border-[#E6E0D8] pt-5">
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-[#6B6B6B]">{text}</p>
                  </div>
                  <ArrowBadge />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-10 pt-8 sm:px-8 lg:px-10">
        <div className="grid w-full gap-8 rounded-[30px] bg-[#18181B] p-6 text-white shadow-[0_24px_70px_rgba(24,24,27,0.16)] lg:grid-cols-[0.42fr_0.58fr] lg:p-8">
          <div>
            <h2 className="text-[clamp(2rem,3vw,3.2rem)] font-semibold leading-[1.05]">
              Готовы обсудить ваш проект?
            </h2>
            <p className="mt-4 text-base leading-7 text-white/64">
              Оставьте заявку — мы свяжемся в ближайшее время и предложим решение под
              вашу задачу.
            </p>
            <div className="mt-10 grid gap-6 text-white/72">
              <div>
                <p className="font-semibold text-white">Contact Us</p>
                <a href={`mailto:${SITE_CONTACTS_FALLBACK.email}`} className="mt-3 block hover:text-white">
                  {SITE_CONTACTS_FALLBACK.email}
                </a>
                <a href={SITE_CONTACTS_FALLBACK.phoneHref} className="mt-2 block hover:text-white">
                  {SITE_CONTACTS_FALLBACK.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Channels</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <span>Telegram</span>
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>
            <div className="mt-16 w-fit">
              <LogoText alt="Skybric" width={138} height={40} className="!h-9 !w-auto sm:!h-10" />
            </div>
          </div>
          <div className="min-w-0">
            <ServiceLeadForm serviceSlug="homepage" serviceTitle="Главная страница Skybric" />
          </div>
        </div>
        <footer className="flex w-full flex-col gap-4 px-4 py-5 text-sm text-[#6B6B6B] sm:flex-row sm:items-center sm:justify-between">
          <div className="shrink-0">
            <LogoText alt="Skybric" width={138} height={40} className="!h-7 !w-auto sm:!h-8" />
          </div>
          <p>© 2026 Skybric. Все права защищены.</p>
          <Link href="/contact" className="hover:text-[#6D4AFF]">
            Контакты
          </Link>
        </footer>
      </section>
    </main>
  );
}
