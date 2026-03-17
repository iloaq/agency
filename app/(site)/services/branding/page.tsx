import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Branding",
  description: "Айдентика и правила, которые выдерживают рост продукта и команды.",
};

export default function BrandingPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Branding</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Брендинг для enterprise — это система правил: типографика, интерфейсный голос, UI‑паттерны и контроль качества.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <CTA
              title="Нужен бренд‑каркас?"
              description="Сделаем правила и UI‑kit так, чтобы команда не спорила о вкусе."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "Бриф", href: "/brief" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

