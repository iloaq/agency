import type { Metadata } from "next";
import { Container, Card, Grid, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Industries",
  description: "Отрасли и сценарии: как меняется UX и архитектура в зависимости от домена.",
};

export default function IndustriesPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Grid>
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Industries</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                Мы не «подгоняем шаблон». Доменные ограничения определяют IA, роли, данные и риск‑контроль.
              </p>
            </Reveal>
          </div>
        </Grid>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { t: "Fintech", d: "Аудит‑логи, роли, комплаенс, объяснимость." },
            { t: "B2B SaaS", d: "Онбординг, self‑serve, CRM‑контракты." },
            { t: "Enterprise", d: "Процессы, SLA, интеграции, доступность." },
          ].map((x, idx) => (
            <Reveal key={x.t} delay={idx * 0.04}>
              <Card className="space-y-2">
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">{x.t}</div>
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">{x.d}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

