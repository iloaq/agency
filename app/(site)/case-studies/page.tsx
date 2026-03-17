import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/shared/content/site";
import { Container, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Кейсы",
  description: "Кейсы без шума: контекст, ограничения, решение, эффект.",
};

export default function CaseStudiesHubPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Кейсы</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Формат одинаковый для всех: что было, что мешало, что сделали, что изменилось.
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {caseStudies.map((c, idx) => (
            <Reveal key={c.slug} delay={idx * 0.03}>
              <Link
                href={`/case-studies/${c.slug}`}
                data-cursor-label="Смотреть кейс"
                className="glass-panel block p-6 focus-ring"
              >
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">{c.title}</div>
                <div className="mt-2 text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">
                  {c.client} · {c.industry} · {c.timeframe}
                </div>
                <div className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">{c.summary}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

