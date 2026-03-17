"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { LabHeroCanvas } from "@/shared/three/LabHeroCanvas";
import { RevealLines } from "@/shared/motion";
import { useLenis } from "@/shared/providers/LenisProvider";

export function HeroLab() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollProgress } = useLenis();

  // "Media card" -> full background (scroll narrative across the whole page).
  // Source: https://www.framer.com/motion/use-transform/
  const cardProgress = useTransform(scrollProgress, [0, 0.12, 0.36], [0, 0.15, 1]);

  // Avoid `inset` shorthand here: some layouts + transitions can cause incorrect measurements.
  // Source: https://developer.mozilla.org/en-US/docs/Web/CSS/inset
  const top = useTransform(cardProgress, (p) => 88 - 88 * Math.min(1, Math.max(0, p)));
  const right = useTransform(cardProgress, (p) => 24 - 24 * Math.min(1, Math.max(0, p)));
  const bottom = useTransform(cardProgress, (p) => 76 - 76 * Math.min(1, Math.max(0, p)));
  const left = useTransform(cardProgress, (p) => 52 - 52 * Math.min(1, Math.max(0, p)));

  const radius = useTransform(cardProgress, [0, 1], [28, 0]);
  const veilOpacity = useTransform(cardProgress, [0, 1], [0.42, 0.76]);

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] overflow-hidden" aria-label="Hero">
      {/* Grid lines (only.digital structure, dark adaptation) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] gridlines opacity-[0.55]" />

      {/* WebGL canvas (fixed, but clipped by motion wrapper) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -z-10 overflow-hidden"
        style={{ top, right, bottom, left, borderRadius: radius }}
      >
        <div className="absolute inset-0">
          <LabHeroCanvas scroll={scrollProgress} />
        </div>
        {/* Glass veil to keep meaning on top */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: reduce ? 0.7 : veilOpacity,
            background:
              "linear-gradient(90deg, rgb(var(--bg-base-rgb)/0.92) 0%, rgb(var(--bg-base-rgb)/0.70) 40%, rgb(var(--bg-base-rgb)/0.28) 66%, transparent 84%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-[100svh] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col">
          {/* Top micro row */}
          <div className="pt-14 md:pt-20">
            <div className="flex items-center justify-between gap-6">
              <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.70)]">
                B2B/ENTERPRISE · ANALYTICS · DESIGN · ENGINEERING
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <span className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
                  LIVE SYSTEM
                </span>
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent-secondary-rgb)/0.78)] shadow-[0_0_0_4px_rgb(var(--accent-secondary-rgb)/0.12)]" />
              </div>
            </div>
          </div>

          {/* Main grid (only.digital layout logic, dark lab aesthetic) */}
          <div className="flex flex-1 items-end pb-12 md:pb-16">
            <div className="grid w-full grid-cols-12 gap-8">
              {/* Left: headline */}
              <div className="col-span-12 lg:col-span-7">
                <RevealLines
                  className="heading-display text-[rgb(var(--text-primary-rgb)/0.96)]"
                  lines={["Рост — это система.", "Мы собираем её"]}
                />

                <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-[rgb(var(--text-primary-rgb)/0.62)]">
                  <span className="glass-panel rounded-md px-3 py-2">
                    48h · Risks → Metrics → Roadmap
                  </span>
                  <span className="glass-panel rounded-md px-3 py-2">≤ 3 параллельных проекта</span>
                  <span className="glass-panel rounded-md px-3 py-2">Ответ ≤ 24h · NDA</span>
                </div>
              </div>

              {/* Right: sticky action stack */}
              <div className="col-span-12 lg:col-span-5">
                <div className="glass-premium p-5 md:p-6">
                  <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                    ВЫБЕРИ ПУТЬ
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    <Link
                      href="/audit"
                      className="focus-ring rounded-md border border-[rgb(var(--accent-primary-rgb)/0.70)] bg-[rgb(var(--accent-primary-rgb)/0.10)] px-4 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.92)] transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.95)] hover:bg-[rgb(var(--accent-primary-rgb)/0.14)] hover:shadow-[0_0_0_3px_rgb(var(--accent-primary-rgb)/0.10)]"
                    >
                      Аудит (48h)
                    </Link>
                    <Link
                      href="/case-studies/fintech-risk-console"
                      data-cursor-label="Open"
                      className="focus-ring rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] px-4 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.86)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-secondary-rgb)/0.78)] hover:bg-[rgb(var(--accent-secondary-rgb)/0.08)]"
                    >
                      1 кейс (90s)
                    </Link>
                    <Link
                      href="/brief"
                      className="focus-ring rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] px-4 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.86)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.62)] hover:bg-[rgb(var(--accent-primary-rgb)/0.07)]"
                    >
                      Бриф (2 мин)
                    </Link>
                    <Link
                      href="/process"
                      className="focus-ring rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] px-4 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.86)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-secondary-rgb)/0.72)] hover:bg-[rgb(var(--accent-secondary-rgb)/0.07)]"
                    >
                      Процесс (3 мин)
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-12 gap-3 text-[10px] text-[rgb(var(--text-primary-rgb)/0.58)]">
                    <div className="col-span-6">
                      <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
                        ПОСЛЕ КЛИКА
                      </div>
                      <div className="mt-2">≤ 24h ответ → 15m скрининг → 48h артефакты</div>
                    </div>
                    <div className="col-span-6">
                      <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
                        TRUST
                      </div>
                      <div className="mt-2">Артефакты остаются у вас · без давления</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row (contacts + micro proof, only.digital vibe) */}
          <div className="pb-10 md:pb-14">
            <div className="glass-panel p-4 md:p-5">
              <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                  <div className="flex items-end gap-3">
                    <div className="metric text-5xl leading-none text-[rgb(var(--text-primary-rgb)/0.92)]">
                      48h
                    </div>
                    <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">
                      артефакты: risks · metrics · roadmap
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.72)]">hello@agency.dev</div>
                  <div className="mt-2 text-xs text-[rgb(var(--text-primary-rgb)/0.72)]">+7 (000) 000‑00‑00</div>
                  <div className="mt-4 text-[11px] text-[rgb(var(--text-primary-rgb)/0.55)]">
                    Telegram · NDA‑friendly
                  </div>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.72)]">
                    Аналитика → дизайн → инженерия для B2B.
                  </div>
                  <div className="mt-4">
                    <Link
                      href="/audit"
                      className="focus-ring inline-flex items-center justify-center rounded-md border border-[rgb(var(--accent-primary-rgb)/0.70)] bg-[rgb(var(--accent-primary-rgb)/0.10)] px-5 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.92)] transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.95)] hover:bg-[rgb(var(--accent-primary-rgb)/0.14)] hover:shadow-[0_0_0_3px_rgb(var(--accent-primary-rgb)/0.10)]"
                    >
                      Начать
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

