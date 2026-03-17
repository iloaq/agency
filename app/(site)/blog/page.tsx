import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/shared/content/site";
import { Container, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export const metadata: Metadata = {
  title: "Insights",
  description: "Заметки про UX, инженерную практику и системный рост.",
};

export default function BlogPage() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">Insights</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Короткие материалы без витрины: как мы принимаем решения и почему это работает.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {articles.map((a, idx) => (
            <Reveal key={a.slug} delay={idx * 0.04}>
              <Link href={`/blog/${a.slug}`} className="glass-panel block p-6 focus-ring">
                <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.92)]">{a.title}</div>
                <div className="mt-2 text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">
                  {new Date(a.publishedAt).toLocaleDateString("ru-RU")}
                  {" · "}
                  {a.tags.join(" · ")}
                </div>
                <div className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">{a.excerpt}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

