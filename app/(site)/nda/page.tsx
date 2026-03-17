import type { Metadata } from "next";
import { Container, Card, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "NDA‑friendly",
  description: "Страница для проектов под NDA: как мы показываем доказательства без раскрытия данных.",
};

export default function NdaFriendlyPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">NDA‑friendly</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Мы можем показать качество работы без раскрытия бренда и данных: структуры, метод, артефакты, проверяемые критерии.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Что показываем</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Схемы модулей и контрактов</li>
                <li>UX‑структуры и критерии</li>
                <li>Метрики и подход к измерениям</li>
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="space-y-3">
              <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">Что скрываем</div>
              <ul className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>Бренд и идентификаторы</li>
                <li>Чувствительные данные</li>
                <li>Внутренние URL/ключи</li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

