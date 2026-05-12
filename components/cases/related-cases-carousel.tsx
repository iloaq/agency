"use client";

import Link from "next/link";
import type { CaseCardFromDb } from "@/lib/cases/case-study-helpers";

function clip(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

/** Горизонтальная лента кейсов: нативный scroll + snap (без библиотек). */
export function RelatedCasesCarousel({ cases }: { cases: CaseCardFromDb[] }) {
  if (cases.length === 0) return null;

  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-10" aria-labelledby="related-cases-heading">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="related-cases-heading"
          className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6B6B6B]"
        >
          Другие кейсы
        </h2>
        <Link
          href="/cases"
          className="text-sm font-semibold text-[#6D4AFF] underline-offset-4 transition hover:underline"
        >
          Все кейсы →
        </Link>
      </div>
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "thin" }}
      >
        {cases.map((item, i) => {
          const accent = i % 3 === 1;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={[
                "snap-start shrink-0 rounded-[24px] border p-5 transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                "flex w-[min(82vw,300px)] flex-col sm:w-[280px]",
                accent
                  ? "border-transparent bg-[#6D4AFF] text-white shadow-[0_18px_50px_rgba(109,74,255,0.22)] hover:shadow-[0_22px_58px_rgba(109,74,255,0.3)]"
                  : "border-[#E6E0D8] bg-white shadow-[0_14px_40px_rgba(72,57,41,0.06)] hover:border-[#6D4AFF]/30",
              ].join(" ")}
            >
              <p
                className={[
                  "text-xs font-semibold uppercase tracking-[0.12em]",
                  accent ? "text-white/75" : "text-[#6D4AFF]",
                ].join(" ")}
              >
                {item.sector ?? "Кейс"}
              </p>
              <h3
                className={[
                  "mt-3 min-h-[3.5rem] text-lg font-semibold leading-snug tracking-tight",
                  accent ? "text-white" : "text-[#121212]",
                ].join(" ")}
              >
                {item.task}
              </h3>
              <p
                className={[
                  "mt-3 line-clamp-3 text-sm leading-6",
                  accent ? "text-white/78" : "text-[#4B4B4B]",
                ].join(" ")}
              >
                {clip(item.loss, 140)}
              </p>
              <span
                className={[
                  "mt-5 inline-flex size-9 items-center justify-center rounded-full border text-sm",
                  accent
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-[#E6E0D8] bg-[#F6F3EE] text-[#121212]",
                ].join(" ")}
                aria-hidden
              >
                ↗
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
