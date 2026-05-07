import type { Metadata } from "next";
import Link from "next/link";
import { ServiceLeadForm } from "@/components/services/service-lead-form";
import { serviceList } from "@/lib/services/services-data";

export const metadata: Metadata = {
  title: "Skybric — ИИ, автоматизация и разработка для бизнеса",
  description:
    "Проектируем ИИ-агентов, CRM-интеграции, сайты, веб-приложения и мобильные продукты под процессы компании.",
  alternates: {
    canonical: "/",
  },
};

const businessProblems = [
  {
    title: "Заявки теряются",
    problem: "Клиенты приходят из сайта, Telegram, WhatsApp и звонков, но часть обращений не фиксируется.",
    solution: "Единый маршрут заявки, фиксация в CRM и напоминание о следующем шаге.",
  },
  {
    title: "Команда делает рутину вручную",
    problem: "Менеджеры отвечают на похожие вопросы, собирают документы и переносят данные между системами.",
    solution: "ИИ-агент, шаблоны, подсказки и интеграции между текущими инструментами.",
  },
  {
    title: "Руководитель не видит контроль",
    problem: "CRM заполнена неполно, переписки живут отдельно, follow-up зависит от памяти менеджера.",
    solution: "Порядок в карточках, резюме коммуникаций и понятная картина по процессу.",
  },
] as const;

const caseExamples = [
  {
    title: "AI-агент для входящих заявок",
    text: "Квалификация обращения, быстрый черновик ответа, фиксация контакта и задачи в CRM.",
  },
  {
    title: "Генерация КП и документов",
    text: "Черновики по шаблонам компании, проверка полноты данных и контроль человека перед отправкой.",
  },
  {
    title: "Личный кабинет или внутренний портал",
    text: "Роли, статусы, заявки, документы и интеграции вместо ручной работы в таблицах.",
  },
] as const;

const workSteps = [
  ["01", "Разбираем процесс", "Смотрим, где теряются заявки, данные, время и контроль."],
  ["02", "Проектируем решение", "Определяем MVP, интерфейс, backend-логику и интеграции."],
  ["03", "Запускаем и дорабатываем", "Проверяем на реальных сценариях и улучшаем по данным."],
] as const;

function HeroSummary() {
  return (
    <aside className="rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_24px_70px_rgba(72,57,41,0.1)] lg:p-7">
      <h2 className="text-3xl font-semibold leading-9 text-[#121212]">
        Что обычно закрываем в первом проекте
      </h2>
      <div className="mt-7 grid gap-4">
        {[
          ["Входящие заявки", "сайт, мессенджеры, звонки, CRM"],
          ["Ручная работа", "ответы, документы, перенос данных"],
          ["Контроль процесса", "статусы, follow-up, понятная картина"],
        ].map(([title, text]) => (
          <div key={title} className="border-t border-[#E6E0D8] pt-4">
            <p className="text-lg font-semibold leading-7">{title}</p>
            <p className="mt-1 text-base leading-7 text-[#4B4B4B]">{text}</p>
          </div>
        ))}
      </div>
      <Link
        href="/ai-audit"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F6F3EE] px-5 text-center text-sm font-semibold text-[#121212] transition hover:bg-[#EFE9DF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        Начать с бесплатного ИИ-аудита
      </Link>
    </aside>
  );
}

export default function Home() {
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      <section className="grid gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.48fr)] lg:items-end lg:px-10 lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <h1 className="max-w-6xl text-[clamp(2.7rem,7vw,6.1rem)] font-semibold leading-[1.01] tracking-normal">
            ИИ, автоматизация и разработка под реальные процессы бизнеса
          </h1>
          <p className="mt-7 max-w-4xl text-base leading-7 text-[#3F3F3F] sm:text-xl sm:leading-9">
            Проектируем ИИ-агентов, CRM-интеграции, сайты, веб-приложения и мобильные
            продукты там, где бизнес теряет заявки, время команды и управляемость.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#18181B] px-7 text-center text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.25)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Обсудить проект
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#E6E0D8] bg-white px-7 text-center text-base font-semibold text-[#121212] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
            >
              Посмотреть услуги
            </Link>
          </div>
        </div>
        <HeroSummary />
      </section>

      <section id="services" className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.8rem)] font-semibold leading-[0.98]">
            Услуги, которые закрывают конкретные потери
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
            Не продаём “просто ИИ” или “просто сайт”. Берём процесс, где есть ручная работа,
            задержки, потери заявок или разрозненные данные, и собираем рабочее решение.
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
              <div className="mt-6 border-t border-[#E6E0D8] pt-5">
                <p className="text-sm font-semibold text-[#6D4AFF]">Что закрывает</p>
                <p className="mt-2 text-base font-semibold leading-7">
                  {service.cardPains[0]}
                </p>
              </div>
              <Link
                href={service.path}
                className="mt-7 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[#18181B] px-5 text-sm font-semibold text-white transition hover:bg-[#2B2B31]"
              >
                Подробнее
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.8rem)] font-semibold leading-[0.98]">
            Где бизнес чаще всего теряет деньги
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
            Эти зоны обычно видно уже на первом разборе. Для каждой можно выбрать первый
            безопасный участок и не начинать с большой перестройки.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {businessProblems.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-[#E6E0D8] bg-white p-6 shadow-[0_18px_55px_rgba(72,57,41,0.07)]"
            >
              <h3 className="text-2xl font-semibold leading-8">{item.title}</h3>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                Как проявляется
              </p>
              <p className="mt-2 text-base leading-7 text-[#4B4B4B]">{item.problem}</p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                Что делаем
              </p>
              <p className="mt-2 text-base font-semibold leading-7">{item.solution}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cases" className="bg-[#EFE9DF] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.8rem)] font-semibold leading-[0.98]">
            Примеры задач вместо выдуманных кейсов
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8 lg:justify-self-end">
            Без неподтверждённых процентов и фейковых логотипов. Показываем типовые
            рабочие сценарии, которые можно разобрать и превратить в MVP.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseExamples.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-[#DCD3C8] bg-white p-6">
              <h3 className="text-2xl font-semibold leading-8">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#4B4B4B]">{item.text}</p>
            </article>
          ))}
        </div>
        <Link
          href="/cases"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-[#DCD3C8] bg-white px-6 text-sm font-semibold text-[#121212] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF]"
        >
          Посмотреть примеры
        </Link>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-8 rounded-[34px] border border-[#DCD3C8] bg-white p-6 shadow-[0_24px_75px_rgba(72,57,41,0.09)] sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
          <h2 className="text-[clamp(2.15rem,4.4vw,4.2rem)] font-semibold leading-[0.98]">
            Как превращаем задачу в рабочее решение
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {workSteps.map(([number, title, text]) => (
              <article key={title} className="border-t border-[#E6E0D8] pt-5">
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
              Есть процесс, который забирает время или теряет заявки?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
              Опишите задачу. Мы посмотрим, что можно автоматизировать, с чего лучше начать
              и какой формат решения подойдёт вашему бизнесу.
            </p>
          </div>
          <ServiceLeadForm serviceSlug="homepage" serviceTitle="Главная страница Skybric" />
        </div>
      </section>
    </main>
  );
}
