import type { Metadata } from "next";
import { Container, Card, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Audit Request",
  description: "Запрос аудита: контекст, ограничения, следующий шаг.",
};

export default function AuditPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Audit Request</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Формат: вы даёте вводные, мы возвращаем карту рисков и краткий план работ.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Что нужно от вас</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Ссылка на продукт/прототип или описание</li>
                <li>Цель и метрика успеха</li>
                <li>Ограничения: сроки, команда, данные</li>
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Что дадим мы</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Риски и приоритеты</li>
                <li>Архитектурные решения верхнего уровня</li>
                <li>План релизов на 6–12 недель</li>
              </ul>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Быстрый канал:{" "}
            <a className="focus-ring rounded-md" href="mailto:hello@skybric.digital">
              hello@skybric.digital
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

