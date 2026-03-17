import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/shared/content/site";
import { Container, Section } from "@/shared/components/ui";
import { Reveal } from "@/shared/motion";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) return { title: "Статья не найдена" };
  return { title: a.title, description: a.excerpt };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) notFound();

  return (
    <Section className="pt-10 md:pt-16">
      <Container size="full">
        <Reveal>
          <h1 className="heading-1 text-[rgb(var(--text-primary-rgb)/0.96)]">{a.title}</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-3 text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">
            {new Date(a.publishedAt).toLocaleDateString("ru-RU")} · {a.tags.join(" · ")}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.74)]">
            {a.excerpt}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-6 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
            Текст‑шаблон здесь минимальный: в проде подключим CMS или MDX и будем генерировать структуру статьи из контента.
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

