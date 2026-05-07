import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Кейсы и примеры задач Skybric — ИИ, CRM, сайты и приложения",
  description:
    "Примеры B2B-задач, которые Skybric берёт в работу: ИИ-агенты, CRM, документы, веб-приложения, кабинеты и интеграции.",
  alternates: {
    canonical: "/cases",
  },
};

const examples = [
  {
    title: "Заявки из сайта и Telegram теряются до CRM",
    situation:
      "Клиенты пишут в несколько каналов, менеджеры отвечают вручную, статусы фиксируются нерегулярно.",
    result:
      "Проектируем единый маршрут заявки: первичная квалификация, запись в CRM, задача менеджеру и follow-up.",
  },
  {
    title: "КП и документы собираются вручную",
    situation:
      "Специалисты копируют шаблоны, ищут данные в таблицах и переписках, вручную проверяют комплектность.",
    result:
      "Собираем генератор черновиков по правилам компании и оставляем контроль человека перед отправкой.",
  },
  {
    title: "Клиентам нужен личный кабинет",
    situation:
      "Статусы, документы и обращения идут через менеджеров, поэтому команда тратит время на повторные уточнения.",
    result:
      "Проектируем кабинет с ролями, статусами, документами, уведомлениями и интеграциями с backend/CRM.",
  },
  {
    title: "CRM есть, но контроля нет",
    situation:
      "Карточки неполные, звонки и переписки живут отдельно, руководитель не видит реальную картину.",
    result:
      "Добавляем резюме коммуникаций, контроль полей, подсказку следующего шага и понятный срез по воронке.",
  },
] as const;

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#F6F3EE] px-5 pb-24 pt-12 text-[#121212] sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <h1 className="max-w-6xl text-[clamp(2.7rem,7vw,6rem)] font-semibold leading-[1.01]">
          Кейсы без выдуманных цифр: примеры задач, которые можно автоматизировать
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9 lg:justify-self-end">
          Если нет подтверждённой статистики, мы не придумываем “рост на 300%”.
          Ниже — типовые B2B-сценарии, которые можно разобрать и превратить в рабочий MVP.
        </p>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        {examples.map((item) => (
          <article key={item.title} className="rounded-[32px] border border-[#E6E0D8] bg-white p-6 shadow-[0_18px_55px_rgba(72,57,41,0.08)] sm:p-8">
            <h2 className="text-3xl font-semibold leading-10">{item.title}</h2>
            <div className="mt-8 grid gap-5">
              <div className="border-t border-[#E6E0D8] pt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                  Ситуация
                </p>
                <p className="mt-2 text-base leading-7 text-[#4B4B4B]">{item.situation}</p>
              </div>
              <div className="rounded-[22px] bg-[#F6F3EE] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                  Что можно сделать
                </p>
                <p className="mt-2 text-base font-semibold leading-7">{item.result}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <Link
        href="/contact"
        className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-[#18181B] px-7 text-base font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31]"
      >
        Обсудить похожую задачу
      </Link>
    </main>
  );
}
