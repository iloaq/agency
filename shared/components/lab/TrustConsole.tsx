"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { DURATION_FAST, EASE_STANDARD } from "@/shared/motion";

type TrustSlide = {
  key: "artifacts" | "process" | "capacity" | "risk";
  title: string;
  label: string;
  bullets: string[];
  ctas: Array<{ href: string; label: string; kind: "primary" | "secondary" }>;
};

export function TrustConsole() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<TrustSlide["key"]>("artifacts");

  const slides = useMemo<TrustSlide[]>(
    () => [
      {
        key: "artifacts",
        label: "АРТЕФАКТЫ",
        title: "Вы платите за артефакты и предсказуемость",
        bullets: [
          "Карта рисков и ограничений (что может сломать проект)",
          "События/метрики и план измерений (как доказываем эффект)",
          "План релизов на 6–12 недель (что и когда будет готово)",
          "UX‑спеки и критерии приёмки (без споров «на вкус»)",
        ],
        ctas: [
          { href: "/audit", label: "Запросить аудит", kind: "primary" },
          { href: "/case-studies", label: "Смотреть кейсы", kind: "secondary" },
        ],
      },
      {
        key: "process",
        label: "ПРОЦЕСС",
        title: "Прозрачные этапы, чтобы не терять недели на неопределённость",
        bullets: [
          "Ответ ≤ 24 часа: подтверждаем fit и ограничения",
          "15 минут скрининг: цели, метрика, риски",
          "Артефакты в 48h: риски → измерения → план релизов",
          "Короткие итерации: демо, критерии приёмки, стабильные релизы",
        ],
        ctas: [
          { href: "/process", label: "Понять процесс", kind: "primary" },
          { href: "/methodology", label: "Методология", kind: "secondary" },
        ],
      },
      {
        key: "capacity",
        label: "СИГНАЛЫ",
        title: "High‑ticket режим: фокус и ограничения",
        bullets: [
          "≤ 3 параллельных проекта (без распыления)",
          "B2B/enterprise only (сложные роли/данные/риски)",
          "NDA‑friendly (показываем метод, не раскрывая данные)",
          "Quality baseline: WCAG AA + Core Web Vitals как чек‑лист",
        ],
        ctas: [
          { href: "/nda", label: "NDA‑friendly", kind: "primary" },
          { href: "/contact", label: "Связаться", kind: "secondary" },
        ],
      },
      {
        key: "risk",
        label: "RISK‑REVERSAL",
        title: "Без давления: безопасный первый шаг",
        bullets: [
          "Первичный аудит бесплатно (короткий формат, без «продажи»)",
          "Без обязательств: вы забираете артефакты",
          "Прозрачные этапы и критерии «готово» заранее",
          "Если не fit — честно скажем и предложим следующий шаг",
        ],
        ctas: [
          { href: "/brief", label: "Короткий бриф (2 мин)", kind: "primary" },
          { href: "/audit", label: "Запросить аудит", kind: "secondary" },
        ],
      },
    ],
    []
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const idx = Math.min(slides.length - 1, Math.max(0, Math.floor(v * slides.length)));
    const next = slides[idx]?.key;
    if (next && next !== active) setActive(next);
  });

  const activeSlide = slides.find((s) => s.key === active) ?? slides[0];

  return (
    <section
      id="trust"
      ref={ref}
      className="relative"
      style={{ height: "240svh" }}
      aria-label="Trust Console"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 gridlines opacity-[0.25]" />
      <div className="sticky top-0 flex h-[100svh] items-center px-4 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                TRUST CONSOLE
              </div>
              <div className="mt-4 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">Артефакты → процесс → ограничения → risk‑reversal.</div>

              <div className="mt-8 space-y-3">
                {slides.map((s) => {
                  const isActive = s.key === active;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      className={
                        "focus-ring w-full rounded-md border px-4 py-3 text-left transition-[border-color,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
                        (isActive
                          ? "border-[rgb(var(--accent-primary-rgb)/0.65)] bg-[rgb(var(--accent-primary-rgb)/0.08)]"
                          : "border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] hover:border-[rgb(var(--text-primary-rgb)/0.35)]")
                      }
                      onClick={() => setActive(s.key)}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                          {s.label}
                        </div>
                        <span
                          className="metric text-[10px] tracking-[0.22em]"
                          style={{
                            color: isActive
                              ? "rgb(var(--accent-secondary-rgb) / 0.9)"
                              : "rgb(var(--text-primary-rgb) / 0.45)",
                          }}
                        >
                          {isActive ? "ACTIVE" : "—"}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-[rgb(var(--text-primary-rgb)/0.84)]">
                        {s.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="glass-premium relative overflow-hidden p-6 md:p-8">
                {/* Scanline */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(9,233,212,0.55),transparent)]"
                  animate={reduce ? {} : { y: ["-20%", "120%"] }}
                  transition={reduce ? {} : { duration: 6.5, repeat: Infinity, ease: "linear" }}
                />

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                      {activeSlide.label}
                    </div>
                    <div className="mt-3 text-xl text-[rgb(var(--text-primary-rgb)/0.94)] md:text-2xl">
                      {activeSlide.title}
                    </div>
                  </div>
                  <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
                    SCROLL → STORY
                  </div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeSlide.key}
                    initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: DURATION_FAST, ease: EASE_STANDARD }}
                    className="mt-6"
                  >
                    <ul className="space-y-3 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                      {activeSlide.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-secondary-rgb)/0.8)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {activeSlide.ctas.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={
                            "focus-ring rounded-md border px-4 py-2 text-sm transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
                            (c.kind === "primary"
                              ? "border-[rgb(var(--accent-primary-rgb)/0.70)] bg-[rgb(var(--accent-primary-rgb)/0.10)] text-[rgb(var(--text-primary-rgb)/0.92)] hover:border-[rgb(var(--accent-primary-rgb)/0.95)] hover:bg-[rgb(var(--accent-primary-rgb)/0.14)] hover:shadow-[0_0_0_3px_rgb(var(--accent-primary-rgb)/0.10)]"
                              : "border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] text-[rgb(var(--text-primary-rgb)/0.78)] hover:border-[rgb(var(--accent-secondary-rgb)/0.75)] hover:bg-[rgb(var(--accent-secondary-rgb)/0.07)]")
                          }
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 text-[10px] text-[rgb(var(--text-primary-rgb)/0.55)]">
                      Micro‑trust: мы фиксируем критерии «готово» заранее и проверяем результат по метрикам, а не по вкусу.
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

