import type { Metadata } from "next";
import { Container, Card, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Процесс",
  description: "Прозрачный процесс: от диагностики к релизам и измеримому эффекту.",
};

export default function ProcessPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Процесс</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                У вас всегда есть ответы: что делаем, почему, что будет готово, как проверяем.
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Диагностика", d: "Цели, ограничения, риски." },
            { n: "02", t: "План", d: "Roadmap, критерии приёмки." },
            { n: "03", t: "Сборка", d: "UI, инженерия, интеграции." },
            { n: "04", t: "Верификация", d: "Перформанс, a11y, SEO." },
          ].map((s, idx) => (
            <Reveal key={s.n} delay={idx * 0.04}>
              <Card className="space-y-2">
                <div className="metric text-xs text-[rgb(var(--accent-secondary-rgb)/0.9)]">
                  {s.n}
                </div>
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">{s.t}</div>
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">{s.d}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

