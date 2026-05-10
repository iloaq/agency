import Link from "next/link";
import type { ServiceData } from "@/lib/services/services-data";
import {
  ButtonLink,
  ContactCTA,
  FAQAccordion,
  SectionHeader,
  SurfaceCard,
} from "@/components/marketing/light-ui";
import { ServiceLeadForm } from "./service-lead-form";

const sectionClass = "w-full px-5 py-16 sm:px-8 lg:px-10 lg:py-24";

function CommercialSummary({ service }: { service: ServiceData }) {
  return (
    <aside className="rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_14px_42px_rgba(72,57,41,0.055)] lg:p-7">
      <h2 className="text-3xl font-semibold leading-9">Что разбираем в проекте</h2>
      <div className="mt-7 grid gap-5">
        <div className="border-t border-[#E6E0D8] pt-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
            Боль
          </p>
          <p className="mt-2 text-lg font-semibold leading-7">{service.cardPains[0]}</p>
        </div>
        <div className="border-t border-[#E6E0D8] pt-4">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
            Что делаем
          </p>
          <p className="mt-2 text-lg font-semibold leading-7">{service.solutions[0]}</p>
        </div>
        <div className="rounded-[22px] bg-[#F6F3EE] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
            Результат
          </p>
          <p className="mt-2 text-lg font-semibold leading-7">{service.businessResults[0]}</p>
        </div>
      </div>
    </aside>
  );
}

export function ServiceHero({ service }: { service: ServiceData }) {
  return (
    <section className="px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-24 lg:pt-14">
      <div className="w-full min-w-0">
        <h1 className="text-[clamp(2.55rem,6.4vw,7rem)] font-semibold leading-[0.94] tracking-normal text-[#121212]">
          {service.heroTitle}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.54fr_0.46fr] lg:items-end">
          <div className="min-w-0 lg:pb-4">
            <p className="max-w-3xl text-lg leading-8 text-[#4B4B4B] sm:text-xl sm:leading-9">
              {service.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="#service-lead-form">{service.ctaPrimary}</ButtonLink>
              <ButtonLink href="#solutions" variant="secondary">
                {service.ctaSecondary}
              </ButtonLink>
            </div>
          </div>

          <CommercialSummary service={service} />
        </div>
      </div>
    </section>
  );
}

export function PainCards({ service }: { service: ServiceData }) {
  return (
    <section className={sectionClass} aria-labelledby="pains-heading">
      <SectionHeader
        eyebrow="Проблемы"
        title="Какие проблемы закрываем"
        text="Показываем конкретные места, где бизнес теряет скорость, контроль и качество данных."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {service.pains.map((pain) => (
          <SurfaceCard key={pain.problem} className="p-6">
            <h3 className="text-2xl font-semibold leading-8 text-[#121212]">{pain.problem}</h3>
            <div className="mt-6 grid gap-5">
              <div className="border-t border-[#E6E0D8] pt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                  Как проявляется
                </p>
                <p className="mt-2 text-base leading-7 text-[#4B4B4B]">{pain.manifestation}</p>
              </div>
              <div className="rounded-[20px] bg-[#F6F3EE] p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">
                  Бизнес-последствие
                </p>
                <p className="mt-2 text-base font-semibold leading-7 text-[#121212]">
                  {pain.consequence}
                </p>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}

export function SolutionList({ service }: { service: ServiceData }) {
  return (
    <section id="solutions" className={sectionClass} aria-labelledby="solutions-heading">
      <SectionHeader
        eyebrow="Решения"
        title="Что внедряем"
        text="Собираем рабочую систему из интерфейса, backend-логики, интеграций и правил обработки данных."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {service.solutions.map((solution) => (
          <div
            key={solution}
            className="rounded-[24px] border border-[#E6E0D8] bg-[#F6F3EE] p-5 text-xl font-semibold leading-7 text-[#121212]"
          >
            {solution}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessSteps({ service }: { service: ServiceData }) {
  return (
    <section className={sectionClass} aria-labelledby="process-heading">
      <SectionHeader
        eyebrow="Процесс"
        title="Как это работает"
        text="Стартуем с понятного участка, запускаем MVP и дорабатываем по фактическим сценариям пользователей и команды."
      />
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {service.processSteps.map((step, index) => (
          <li key={step} className="rounded-[26px] border border-[#E6E0D8] bg-white p-5 shadow-[0_12px_34px_rgba(72,57,41,0.045)]">
            <p className="text-sm font-semibold text-[#6D4AFF]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-8 text-2xl font-semibold leading-8 text-[#121212]">{step}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function BusinessResult({ service }: { service: ServiceData }) {
  return (
    <section className={sectionClass} aria-labelledby="result-heading">
      <SectionHeader
        eyebrow="Результат"
        title="Результат для бизнеса"
        text="Формулируем эффект аккуратно: скорость, порядок в данных, меньше ручных операций и понятнее контроль."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {service.businessResults.map((result) => (
          <div
            key={result}
            className="rounded-[24px] border border-[#DCD3C8] bg-white p-5 text-lg font-semibold leading-7 text-[#121212]"
          >
            {result}
          </div>
        ))}
      </div>
    </section>
  );
}

export function UseCases({ service }: { service: ServiceData }) {
  return (
    <section className={sectionClass} aria-labelledby="use-cases-heading">
      <SectionHeader
        eyebrow="Кому подходит"
        title="Для кого подходит"
        text="Лучше всего работает там, где уже есть регулярные заявки, данные, операционная рутина и повторяемые сценарии."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {service.useCases.map((useCase) => (
          <div
            key={useCase}
            className="rounded-[22px] border border-[#E6E0D8] bg-white p-4 text-base font-semibold text-[#4B4B4B]"
          >
            {useCase}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Deliverables({ service }: { service: ServiceData }) {
  return (
    <section className={sectionClass} aria-labelledby="deliverables-heading">
      <SectionHeader
        eyebrow="Состав работ"
        title="Что входит в работу"
        text="Закрываем не только экран или промпт, а весь путь: логика, интерфейс, backend, интеграции, тестирование и запуск."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {service.deliverables.map((item) => (
          <div
            key={item}
            className="rounded-[22px] border border-[#E6E0D8] bg-[#F6F3EE] p-4 text-base font-semibold text-[#121212]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhyCustomSolution({ service }: { service: ServiceData }) {
  return (
    <section className={sectionClass} aria-labelledby="why-custom-heading">
      <div className="grid gap-8 rounded-[34px] border border-[#E6E0D8] bg-white p-6 shadow-[0_16px_50px_rgba(72,57,41,0.06)] sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
        <div>
          <h2 id="why-custom-heading" className="text-[clamp(2.3rem,4.6vw,4.5rem)] font-semibold leading-[0.98] text-[#121212]">
            Почему не готовое решение
          </h2>
          <p className="mt-5 text-base leading-7 text-[#4B4B4B]">
            Шаблон закрывает простую задачу. Сложные процессы требуют логики, которая учитывает роли, данные, документы и текущие системы.
          </p>
        </div>
        <div className="grid gap-3">
          {service.whyCustom.map((item) => (
            <div key={item} className="rounded-[20px] border border-[#E6E0D8] bg-[#F6F3EE] p-4 text-lg font-semibold leading-7 text-[#121212]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceFAQ({ service }: { service: ServiceData }) {
  return (
    <section className={sectionClass} aria-labelledby="faq-heading">
      <SectionHeader eyebrow="FAQ" title="Частые вопросы" center />
      <FAQAccordion items={service.faq} />
    </section>
  );
}

export function InternalServiceLinks({
  currentSlug,
  relatedServices,
}: {
  currentSlug: ServiceData["slug"];
  relatedServices: ServiceData[];
}) {
  return (
    <section className="px-5 py-12 sm:px-8 lg:px-10">
      <div className="border-t border-[#E6E0D8] pt-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
          Другие услуги
        </p>
        <div className="flex flex-wrap gap-3">
          {relatedServices
            .filter((service) => service.slug !== currentSlug)
            .map((service) => (
              <Link
                key={service.slug}
                href={service.path}
                className="rounded-full border border-[#E6E0D8] bg-white px-5 py-3 text-sm font-semibold text-[#4B4B4B] transition hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF]"
              >
                {service.title}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ service }: { service: ServiceData }) {
  return (
    <div id="service-lead-form">
      <ContactCTA title={service.finalCta.title} text={service.finalCta.text}>
        <ServiceLeadForm serviceSlug={service.slug} serviceTitle={service.title} />
      </ContactCTA>
    </div>
  );
}

export function ServiceSupportVisual() {
  return null;
}
