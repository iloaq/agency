import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/shared/content/site";
import { caseStudyJsonLd } from "@/shared/seo/jsonld";
import { Container, Card, Grid, Metric, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = caseStudies.find((x) => x.slug === params.slug);
  if (!c) return { title: "Кейс не найден" };
  return {
    title: c.title,
    description: c.summary,
  };
}

// Source: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);
  if (!c) notFound();

  const jsonLd = caseStudyJsonLd({
    url: `https://skybric.digital/case-studies/${c.slug}`,
    caseStudy: c,
  });

  return (
    <>
      <script
        type="application/ld+json"
        // Source: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section className="pt-10 md:pt-16">
        <Container size="full">
          <Grid>
            <div className="col-span-12 lg:col-span-8">
              <Reveal>
                <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.72)]">
                  CASE STUDY
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="heading-1 mt-4 text-[rgb(var(--text-primary-rgb)/0.96)]">
                  {c.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.74)]">
                  {c.summary}
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-4 text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">
                  {c.client} · {c.industry} · {c.timeframe}
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 mt-8 lg:col-span-4 lg:mt-0">
              <Reveal>
                <Card className="space-y-3">
                  <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Сервисы</div>
                  <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                    {c.services.map((s) => (
                      <li key={s} className="metric text-xs tracking-[0.14em]">
                        {s.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </Grid>

          <div className="mt-10 border-t border-[rgb(var(--border-subtle-rgb)/0.55)] pt-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {c.metrics.map((m, idx) => (
                <Reveal key={m.label} delay={idx * 0.04}>
                  <Metric label={m.label} value={m.value} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="full">
          <Grid>
            <div className="col-span-12 lg:col-span-6">
              <Reveal>
                <h2 className="heading-3 text-[rgb(var(--text-primary-rgb)/0.94)]">
                  Ограничения и контекст
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <ul className="mt-6 space-y-3 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                  <li>Разные источники данных и неодинаковые трактовки метрик.</li>
                  <li>Роли и доступы должны быть аудитируемыми.</li>
                  <li>Нужно сохранить скорость интерфейса на больших объёмах.</li>
                </ul>
              </Reveal>
            </div>
            <div className="col-span-12 mt-8 lg:col-span-6 lg:mt-0">
              <Reveal>
                <h2 className="heading-3 text-[rgb(var(--text-primary-rgb)/0.94)]">
                  Решение
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <ul className="mt-6 space-y-3 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                  {c.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="full">
          <Reveal>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Технический стек</div>
              <div className="flex flex-wrap gap-2">
                {c.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.35)] px-3 py-1 text-xs text-[rgb(var(--text-primary-rgb)/0.72)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

