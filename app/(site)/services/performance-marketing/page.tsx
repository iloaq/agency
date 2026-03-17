import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Performance Marketing",
  description: "Аналитика, трекинг, эксперименты и оптимизация под прибыль.",
};

export default function PerformanceMarketingPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Performance Marketing</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Ставим измерения и эксперименты так, чтобы маркетинг не конфликтовал с продуктом и инженерией.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <CTA
              title="Нужна система экспериментов?"
              description="Сначала события/метрики и трекинг — потом масштабирование каналов."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "Контакт", href: "/contact" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

