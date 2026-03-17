import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Startups",
  description: "Для стартапов: скорость без долгов и измерения с первого релиза.",
};

export default function StartupsPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Startups</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Быстро запускаем систему: чёткие сценарии, минимальный UI‑шум, измерения и путь к масштабированию.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <CTA
              title="Нужен быстрый старт?"
              description="Аудит → план релизов → сборка без переписываний."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "Бриф", href: "/brief" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

