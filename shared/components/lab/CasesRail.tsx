"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { caseStudies } from "@/shared/content/site";
import { useElementSize } from "@/shared/hooks/useElementSize";
import { useViewportSize } from "@/shared/hooks/useViewportSize";
import { TiltCard } from "@/shared/components/lab/TiltCard";

export function CasesRail() {
  const outerRef = useRef<HTMLElement | null>(null);
  const { ref: trackRef, size: trackSize } = useElementSize<HTMLDivElement>();
  const vp = useViewportSize();

  const scrollDistance = Math.max(0, trackSize.width - vp.width);
  const sectionHeight = Math.max(vp.height, vp.height + scrollDistance);
  const hasMeasurements = vp.height > 0 && trackSize.width > 0;

  // Source: https://www.framer.com/motion/use-scroll/
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section
      id="cases"
      ref={outerRef}
      className="relative"
      style={{ height: hasMeasurements ? sectionHeight : undefined }}
      aria-label="Кейсы (горизонтальная сцена)"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 gridlines opacity-[0.35]" />
      <div className="min-h-[180svh]" aria-hidden={!hasMeasurements} />
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute left-0 top-0 z-10 w-full px-4 pt-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                  CASES
                </div>
                <div className="mt-3 text-sm text-[rgb(var(--text-primary-rgb)/0.82)]">
                  Контекст → система → эффект.
                </div>
              </div>
              <div className="hidden md:block">
                <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
                  HOVER → EXPLORE
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full items-center gap-6 px-4 sm:px-6 lg:px-10"
        >
          {caseStudies.map((c) => (
            <TiltCard key={c.slug} className="shrink-0">
              <Link
                href={`/case-studies/${c.slug}`}
                data-cursor-label="Explore"
                className="glass-premium group block w-[min(78vw,900px)] p-6 focus-ring md:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-base text-[rgb(var(--text-primary-rgb)/0.94)] md:text-lg">
                      {c.title}
                    </div>
                    <div className="mt-2 text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">
                      {c.client} · {c.industry} · {c.timeframe}
                    </div>
                  </div>
                  <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--accent-primary-rgb)/0.85)]">
                    OPEN
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-5">
                    {c.metrics[0] ? (
                      <>
                        <div className="metric text-3xl text-[rgb(var(--text-primary-rgb)/0.94)] md:text-4xl">
                          {c.metrics[0].value}
                        </div>
                        <div className="mt-2 text-[11px] text-[rgb(var(--text-primary-rgb)/0.62)]">
                          {c.metrics[0].label}
                        </div>
                      </>
                    ) : null}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {c.metrics.slice(1, 3).map((m) => (
                        <div key={m.label} className="rounded-md border border-[rgb(var(--border-subtle-rgb)/0.45)] bg-[rgb(var(--bg-base-rgb)/0.25)] px-3 py-2">
                          <div className="metric text-xs text-[rgb(var(--text-primary-rgb)/0.90)]">
                            {m.value}
                          </div>
                          <div className="mt-1 text-[10px] text-[rgb(var(--text-primary-rgb)/0.58)]">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <div className="text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.74)]">
                      {c.summary}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {c.services.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="metric rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.20)] px-3 py-1 text-[10px] tracking-[0.16em] text-[rgb(var(--text-primary-rgb)/0.62)]"
                        >
                          {s.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.60)]">
                    микро‑путь: кейс → процесс → аудит
                  </div>
                </div>

                <div className="pointer-events-none mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(0,174,239,0.45),transparent)] opacity-0 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:opacity-100" />
              </Link>
            </TiltCard>
          ))}

          <div className="w-[20vw]" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}

