import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { asStack, asStringArray, formatStackLine } from "@/lib/cases/case-study-helpers";
import { fetchCaseStudyBySlug } from "@/lib/cases/fetch-case-studies";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const row = await fetchCaseStudyBySlug(slug);
  if (!row) {
    return { title: "Кейс не найден" };
  }
  return {
    title: { absolute: `${row.title} — Skybric` },
    description: row.context ?? row.goal ?? row.title,
    alternates: { canonical: `/cases/${slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const row = await fetchCaseStudyBySlug(slug);
  if (!row) notFound();

  const problems = asStringArray(row.problems);
  const whatWeDid = asStringArray(row.what_we_did);
  const outcomes = asStringArray(row.outcomes);
  const stack = asStack(row.stack);

  return (
    <main className="min-h-screen bg-[#F6F3EE] px-5 pb-24 pt-12 text-[#121212] sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
      <nav className="text-sm text-[#6B6B6B]">
        <Link href="/cases" className="underline-offset-4 hover:text-[#121212] hover:underline">
          Все разборы
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#121212]">{row.title}</span>
      </nav>

      <header className="mt-8 grid gap-4">
        {row.sector ? (
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6D4AFF]">{row.sector}</p>
        ) : null}
        <h1 className="max-w-5xl text-[clamp(2.1rem,4.5vw,3.5rem)] font-semibold leading-[1.05]">
          {row.title}
        </h1>
      </header>

      <div className="mt-12 grid max-w-3xl gap-10">
        {row.context ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
              С чем пришли
            </h2>
            <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{row.context}</p>
          </section>
        ) : null}

        {problems.length > 0 ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
              Проблемы
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-7 text-[#4B4B4B]">
              {problems.map((p, i) => (
                <li key={`${i}-${p.slice(0, 40)}`}>{p}</li>
              ))}
            </ol>
          </section>
        ) : null}

        {row.goal ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">Цель</h2>
            <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{row.goal}</p>
          </section>
        ) : null}

        {whatWeDid.length > 0 ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
              Что сделали
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-[#4B4B4B]">
              {whatWeDid.map((w, i) => (
                <li key={`${i}-${w.slice(0, 40)}`}>{w}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {row.architecture_flow ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
              Поток / архитектура
            </h2>
            <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{row.architecture_flow}</p>
          </section>
        ) : null}

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">Стек</h2>
          <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{formatStackLine(stack)}</p>
        </section>

        {outcomes.length > 0 ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
              Результат
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-[#4B4B4B]">
              {outcomes.map((o, i) => (
                <li key={`${i}-${o.slice(0, 40)}`}>{o}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {row.conclusion ? (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">Вывод</h2>
            <p className="mt-3 text-base leading-7 text-[#4B4B4B]">{row.conclusion}</p>
          </section>
        ) : null}
      </div>

      <Link
        href="/contact"
        className="mt-12 inline-flex min-h-12 items-center justify-center rounded-full bg-[#18181B] px-6 text-sm font-semibold text-white transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
      >
        Разобрать похожую задачу
      </Link>
    </main>
  );
}
