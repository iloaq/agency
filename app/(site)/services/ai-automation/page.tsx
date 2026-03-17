import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "AI & Automation",
  description: "Автоматизация процессов и ассистенты с контролем качества и рисков.",
};

export default function AiAutomationPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">AI &amp; Automation</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Мы внедряем AI там, где есть экономика: снижение ручного труда, контроль качества, ускорение цикла решения.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <CTA
              title="Найти сценарии автоматизации"
              description="Сначала выбираем сценарии и метрики — потом интеграции."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "Бриф", href: "/brief" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

