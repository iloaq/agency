import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Product Design",
  description: "IA, сценарии, прототипы, дизайн‑система и UX‑спеки для разработки.",
};

export default function ProductDesignPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Product Design</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Дизайн для сложных систем — это IA, сценарии и критерии приёмки. Визуал — слой поверх структуры.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <CTA
              title="Нужно быстро выровнять UX?"
              description="Сначала прототип и правила — потом масштабирование."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "Контакт", href: "/contact" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

