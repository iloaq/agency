import type { Metadata } from "next";
import { Container, Card, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "О нас",
  description: "Студия Dark Lab: системный подход, строгая инженерия, минимальный шум.",
};

export default function AboutPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">О нас</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Мы работаем как R&amp;D‑команда: фиксируем ограничения, строим систему артефактов и делаем релизы, которые выдерживают рост.
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Принципы</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Quiet authority: меньше обещаний, больше доказательств.</li>
                <li>Системность: токены, компоненты, контракты данных.</li>
                <li>Инженерия: перформанс, доступность, SEO.</li>
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Формат работы</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Короткие итерации и прозрачные статусы.</li>
                <li>Артефакты в репозитории и в доках.</li>
                <li>Чёткие критерии приёмки.</li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

