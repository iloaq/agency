import type { Metadata } from "next";
import { Container, Card, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Careers",
  description: "Роли, ожидания и формат работы.",
};

export default function CareersPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Careers</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Мы нанимаем под системность: умение фиксировать решения, держать качество и работать прозрачно.
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Frontend Engineer</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Next.js App Router, RSC/Client границы</li>
                <li>TypeScript и читабельные компоненты</li>
                <li>A11y и performance как стандарт</li>
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Product Designer</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>IA и сценарии для enterprise</li>
                <li>Дизайн‑токены и системные паттерны</li>
                <li>Работа с ограничениями и критериями</li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

