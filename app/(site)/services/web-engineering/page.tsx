import type { Metadata } from "next";
import { Container, CTA, Card, Grid, Metric, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

// Source: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Web Engineering",
  description:
    "Next.js App Router, TypeScript, Tailwind tokens, Framer Motion, SEO-first и WCAG AA — без лишней сложности.",
};

export default function WebEngineeringPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <Container size="full">
          <Grid className="items-end">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.72)]">
                  SERVICE · WEB ENGINEERING
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="heading-1 mt-4 text-[rgb(var(--text-primary-rgb)/0.96)]">
                  Инженерия, которая не ломается при росте
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.74)]">
                  Мы строим фронтенд как продуктовую инфраструктуру: понятные границы RSC/Client, строгая типизация,
                  предсказуемые анимации, SEO‑метаданные и доступность по умолчанию.
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 mt-8 lg:col-span-5 lg:mt-0">
              <Reveal>
                <Card className="space-y-4">
                  <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.9)]">
                    Что вы получите
                  </div>
                  <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                    <li>Архитектурную схему модулей</li>
                    <li>UI‑примитивы и токены</li>
                    <li>SEO/OG/JSON‑LD на шаблонах</li>
                    <li>Набор motion‑примитивов &lt; 300ms</li>
                  </ul>
                </Card>
              </Reveal>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="full">
          <Grid>
            <div className="col-span-12 lg:col-span-4">
              <Reveal>
                <h2 className="heading-3 text-[rgb(var(--text-primary-rgb)/0.94)]">
                  Критерии качества
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                  Мы фиксируем «готово» заранее: скорость, доступность, SEO, стабильность компонентов.
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 mt-8 lg:col-span-8 lg:mt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Reveal>
                  <Metric label="Анимации" value="≤ 240мс" hint="Одна кривая ease." />
                </Reveal>
                <Reveal delay={0.05}>
                  <Metric label="SEO" value="Metadata API" hint="OG/Twitter + шаблоны." />
                </Reveal>
                <Reveal delay={0.1}>
                  <Metric label="A11y" value="WCAG AA" hint="Фокус, семантика, контраст." />
                </Reveal>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="full">
          <Grid>
            <div className="col-span-12 lg:col-span-6">
              <Reveal>
                <h2 className="heading-3 text-[rgb(var(--text-primary-rgb)/0.94)]">
                  Как мы работаем (коротко)
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <ol className="mt-6 space-y-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                  <li>
                    <span className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">01</span>{" "}
                    Диагностика: ограничения, зависимости, риски.
                  </li>
                  <li>
                    <span className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">02</span>{" "}
                    Каркас: маршруты, layout‑ы, UI‑примитивы, токены.
                  </li>
                  <li>
                    <span className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">03</span>{" "}
                    Шаблоны SEO и контента: метаданные, JSON‑LD, компоненты страниц.
                  </li>
                  <li>
                    <span className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">04</span>{" "}
                    Верификация: Lighthouse, a11y‑чек, регрессии.
                  </li>
                </ol>
              </Reveal>
            </div>
            <div className="col-span-12 mt-8 lg:col-span-6 lg:mt-0">
              <Reveal>
                <Card className="space-y-3">
                  <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">
                    Риски (мы их проговариваем)
                  </div>
                  <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                    <li>Размытые требования → фиксируем критерии приёмки.</li>
                    <li>Непрозрачные источники данных → делаем контракты и схемы.</li>
                    <li>«Сделайте красиво» → сначала IA и сценарии, потом визуал.</li>
                  </ul>
                </Card>
              </Reveal>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="full">
          <Reveal>
            <CTA
              title="Нужна инженерная оценка?"
              description="Начнём с аудита: что сломается при росте и как это закрыть без переписываний."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "2‑минутный бриф", href: "/brief" }}
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

