import type { Metadata } from "next";
import { Container, Card, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Brief",
  description: "2‑минутный бриф: цель, аудитория, ограничения.",
};

export default function BriefPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Brief</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Здесь будет короткая форма (2 минуты). Сейчас — структура вопросов, чтобы команда понимала, что собирать.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Цель</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Какая метрика должна вырасти?</li>
                <li>Что считается успехом через 8 недель?</li>
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Ограничения</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Сроки, команда, зависимости</li>
                <li>Данные/интеграции/безопасность</li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

