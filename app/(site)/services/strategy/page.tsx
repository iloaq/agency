import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Strategy",
  description: "Исследование, сегментация, позиционирование и карта роста с измеримыми критериями.",
};

export default function StrategyPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Strategy</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Результат стратегии — не «видение», а список решений: что строим, для кого, как меряем, что считаем риском.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <CTA
              title="Начать со стратегии"
              description="Если цели размыты — сначала фиксируем критерии и измерения."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "Контакт", href: "/contact" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

