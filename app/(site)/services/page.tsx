import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/shared/content/site";
import { Container, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Набор модулей: стратегия, дизайн, инженерия, AI‑автоматизация, performance.",
};

export default function ServicesHubPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Услуги</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Каждый модуль можно запускать отдельно, но максимальный эффект — когда связка замыкается на измерения и релизы.
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.slug} delay={idx * 0.03}>
              <Link href={`/services/${s.slug}`} className="glass-panel block p-6 focus-ring">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">{s.title}</div>
                  <span className="metric text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">/{s.slug}</span>
                </div>
                <div className="mt-3 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">{s.summary}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

