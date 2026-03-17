"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { services } from "@/shared/content/site";
import type { SiteService } from "@/shared/content/site";
import { useInView } from "@/shared/hooks/useInView";
import { AnimatePresence, motion } from "framer-motion";
import { RevealLines, ScrollMask } from "@/shared/motion";
import { DURATION_FAST, EASE_STANDARD } from "@/shared/motion";

function ServiceStep({
  service,
  onActive,
}: {
  service: SiteService;
  onActive: (slug: SiteService["slug"]) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.55,
    rootMargin: "-30% 0px -40% 0px",
  });

  useEffect(() => {
    if (inView) onActive(service.slug);
  }, [inView, onActive, service.slug]);

  return (
    <div ref={ref} className="relative py-20">
      <div className="absolute left-0 top-0 h-full w-px bg-[rgb(var(--border-subtle-rgb)/0.55)]" />
      <div className="pl-6">
        <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
          MODULE / {service.slug.toUpperCase()}
        </div>
        <RevealLines
          className="heading-3 mt-4 text-[rgb(var(--text-primary-rgb)/0.94)]"
          lines={[service.title]}
        />
        <ScrollMask className="mt-4 max-w-[58ch] text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.72)]">
          {service.summary}
        </ScrollMask>
        <ul className="mt-6 space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.70)]">
          {service.outcomes.map((o) => (
            <li key={o} className="flex gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-secondary-rgb)/0.8)]" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ServicesNarrative() {
  const [active, setActive] = useState<SiteService["slug"]>(services[0]?.slug ?? "strategy");

  const activeService = useMemo(
    () => services.find((s) => s.slug === active) ?? services[0],
    [active]
  );

  return (
    <section id="services" aria-label="Услуги (scroll narrative)" className="relative px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-8">
          {/* Sticky console */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-[92px] space-y-5 pb-10 pt-16">
              <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                OUTCOMES MAP
              </div>
              <div className="glass-premium p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.9)]">
                    Что меняется
                  </div>
                  <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--accent-primary-rgb)/0.85)]">
                    {activeService?.slug.toUpperCase()}
                  </div>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeService?.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: DURATION_FAST, ease: EASE_STANDARD }}
                    className="mt-4"
                  >
                    <div className="text-base text-[rgb(var(--text-primary-rgb)/0.94)]">
                      {activeService?.title}
                    </div>
                    <div className="mt-3 text-sm text-[rgb(var(--text-primary-rgb)/0.70)]">
                      {activeService?.summary}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-5">
                  <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.55)]">
                    АРТЕФАКТЫ (ВЫ ЗАБИРАЕТЕ)
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeService?.outcomes.slice(0, 4).map((o) => (
                      <span
                        key={o}
                        className="rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-base-rgb)/0.22)] px-3 py-2 text-[11px] text-[rgb(var(--text-primary-rgb)/0.68)]"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={`/services/${activeService?.slug}`}
                    className="focus-ring rounded-md border border-[rgb(var(--accent-primary-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.28)] px-4 py-2 text-sm text-[rgb(var(--text-primary-rgb)/0.88)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.85)] hover:bg-[rgb(var(--accent-primary-rgb)/0.08)]"
                  >
                    Открыть детали
                  </Link>
                  <Link
                    href="/services"
                    className="focus-ring rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] px-4 py-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-secondary-rgb)/0.70)] hover:bg-[rgb(var(--accent-secondary-rgb)/0.07)]"
                  >
                    Все услуги
                  </Link>
                  <Link
                    href="/process"
                    className="focus-ring rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] px-4 py-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.55)] hover:bg-[rgb(var(--accent-primary-rgb)/0.06)]"
                  >
                    Понять процесс
                  </Link>
                </div>
              </div>

              <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.55)]">Scroll → смена модуля.</div>
            </div>
          </div>

          {/* Scroll path */}
          <div className="col-span-12 lg:col-span-7">
            <div className="pt-16">
              {services.map((s) => (
                <ServiceStep key={s.slug} service={s} onActive={setActive} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

