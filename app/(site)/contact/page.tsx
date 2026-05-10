import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связь и быстрые действия: аудит, бриф, письмо.",
};

export default function ContactPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Контакты</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Для старта достаточно контекста и цели — дальше мы сами зададим правильные вопросы.
          </p>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <CTA
              title="Письмо"
              description="hello@skybric.ru"
              primary={{ label: "Написать", href: "mailto:hello@skybric.ru" }}
              secondary={{ label: "Запросить аудит", href: "/audit" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

