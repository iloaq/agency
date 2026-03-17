"use client";

import { useEffect, useMemo, useState } from "react";
import { useLenis } from "@/shared/providers/LenisProvider";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Scene = {
  id: string;
  label: string;
  hint: string;
};

const SCENES: Scene[] = [
  { id: "hero", label: "Оффер", hint: "что вы получите" },
  { id: "cases", label: "Доказательства", hint: "1 кейс → эффект" },
  { id: "services", label: "Outcomes", hint: "модули и артефакты" },
  { id: "trust", label: "Trust", hint: "процесс и ограничения" },
  { id: "cta", label: "Старт", hint: "следующий шаг" },
];

function getVisible(entries: IntersectionObserverEntry[]) {
  const visible = entries
    .filter((e) => e.isIntersecting)
    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
  return visible[0]?.target as HTMLElement | undefined;
}

export function SceneRail({ className }: { className?: string }) {
  const { lenis } = useLenis();
  const reduce = useReducedMotion();

  const [activeId, setActiveId] = useState<string>("hero");

  const scenes = useMemo(() => SCENES, []);

  useEffect(() => {
    if (reduce) return;
    const els = scenes
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    // Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const obs = new IntersectionObserver(
      (entries) => {
        const el = getVisible(entries);
        if (el?.id) setActiveId(el.id);
      },
      {
        root: null,
        // Active zone around viewport center.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35, 0.5, 0.7],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [reduce, scenes]);

  if (reduce) return null;

  return (
    <nav
      aria-label="Навигация по сценам"
      className={cn(
        "pointer-events-none fixed left-4 top-1/2 z-[70] hidden -translate-y-1/2 md:block",
        className
      )}
    >
      <div className="pointer-events-auto glass-panel px-3 py-3">
        <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
          SCENES
        </div>
        <div className="mt-3 space-y-2">
          {scenes.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                className={cn(
                  "focus-ring group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left",
                  active
                    ? "bg-[rgb(var(--accent-primary-rgb)/0.10)]"
                    : "hover:bg-[rgb(var(--bg-surface-rgb)/0.25)]"
                )}
                onClick={() => {
                  const el = document.getElementById(s.id);
                  if (!el) return;
                  lenis?.scrollTo(el, { lerp: 0.1, offset: -24 });
                }}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-2 w-2 rounded-full transition-[background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                    active
                      ? "bg-[rgb(var(--accent-primary-rgb)/0.9)] shadow-[0_0_0_4px_rgb(var(--accent-primary-rgb)/0.12)]"
                      : "bg-[rgb(var(--text-primary-rgb)/0.35)] group-hover:bg-[rgb(var(--text-primary-rgb)/0.55)]"
                  )}
                />
                <span className="min-w-0">
                  <span className="block text-xs text-[rgb(var(--text-primary-rgb)/0.86)]">
                    {s.label}
                  </span>
                  <span className="block truncate text-[10px] text-[rgb(var(--text-primary-rgb)/0.55)]">
                    {s.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

