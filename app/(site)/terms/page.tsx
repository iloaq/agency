import type { Metadata } from "next";
import { Container, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Terms",
  description: "Пользовательское соглашение (шаблон).",
};

export default function TermsPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Terms</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.74)]">
            Этот раздел предназначен под юридически корректные условия. Контент нужно согласовать с юристом и привязать к реальным процессам.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

