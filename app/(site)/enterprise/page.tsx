import type { Metadata } from "next";
import { Container, CTA, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Enterprise",
  description: "Для enterprise: управление рисками, доступы, аудит‑логи, перформанс и предсказуемые релизы.",
};

export default function EnterprisePage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Enterprise</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Мы проектируем интерфейсы и инженерную основу так, чтобы их можно было защищать: безопасность, логирование,
            роли, SLA‑поведение и доступность.
          </p>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <CTA
              title="Нужно оценить риски?"
              description="Аудит показывает, где система сломается при росте и как это закрыть."
              primary={{ label: "Запросить аудит", href: "/audit" }}
              secondary={{ label: "Контакт", href: "/contact" }}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

