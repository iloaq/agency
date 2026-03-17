import type { Metadata } from "next";
import { Container, Card, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Методология",
  description: "Как мы принимаем решения: от ограничений и измерений к релизам.",
};

export default function MethodologyPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Методология</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Мы фиксируем решения в артефактах, чтобы продукт не зависел от «контекста в голове».
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal>
            <Card className="space-y-2">
              <div className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">01</div>
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Ограничения</div>
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Данные, роли, процессы, юридические рамки, сроки.
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="space-y-2">
              <div className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">02</div>
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Измерения</div>
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                События, метрики, критерии приёмки.
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="space-y-2">
              <div className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">03</div>
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Релизы</div>
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Короткие итерации, предсказуемый scope, контроль качества.
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

