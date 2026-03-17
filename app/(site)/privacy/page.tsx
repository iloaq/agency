import type { Metadata } from "next";
import { Container, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Политика конфиденциальности (шаблон).",
};

export default function PrivacyPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Privacy Policy</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.74)]">
            Текст политики будет зависеть от фактических форм, аналитики и интеграций. Этот раздел оставлен как место под юридически корректный документ.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

