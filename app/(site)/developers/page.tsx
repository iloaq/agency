import type { Metadata } from "next";
import { Container, Card, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Developers / Tech",
  description: "Для технических команд: архитектура, DX, типизация и скорость релизов.",
};

export default function DevelopersPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Developers / Tech</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Мы делаем систему, с которой удобно жить: границы модулей, дизайн‑токены, читабельные компоненты, стабильные шаблоны страниц.
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { t: "DX", d: "Типизация и предсказуемые API компонентов." },
            { t: "Performance", d: "RSC там, где можно. Client — по необходимости." },
            { t: "A11y", d: "Фокус‑контуры и семантика по умолчанию." },
          ].map((x, idx) => (
            <Reveal key={x.t} delay={idx * 0.04}>
              <Card className="space-y-2">
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">{x.t}</div>
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">{x.d}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

