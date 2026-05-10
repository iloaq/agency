/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MENU = [
  { href: "/case-studies", label: "Проекты" },
  { href: "/about", label: "Компания" },
  { href: "/services", label: "Направления" },
  { href: "/careers", label: "Карьера" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакты" },
] as const;

// Source: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
export function SiteNav() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[80] border-b border-[rgb(var(--border-subtle-rgb)/0.45)] bg-[rgb(var(--bg-base-rgb)/0.72)] backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Link href="/" className="focus-ring inline-flex items-center rounded-md" aria-label="На главную">
            <span className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.88)]">
              SKYBRIC
            </span>
          </Link>

          <button
            type="button"
            className="focus-ring inline-flex items-center gap-3 rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.35)] px-3 py-2 text-sm text-[rgb(var(--text-primary-rgb)/0.92)] transition-[border-color,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.55)] hover:bg-[rgb(var(--bg-surface-rgb)/0.45)]"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="fullscreen-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.75)]">
              MENU
            </span>
            <span aria-hidden className="relative h-3 w-4">
              <span
                className={
                  "absolute left-0 top-0 h-px w-full bg-[rgb(var(--text-primary-rgb)/0.86)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
                  (open ? "translate-y-[6px] rotate-45" : "")
                }
              />
              <span
                className={
                  "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[rgb(var(--text-primary-rgb)/0.62)] transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
                  (open ? "opacity-0" : "opacity-100")
                }
              />
              <span
                className={
                  "absolute left-0 bottom-0 h-px w-full bg-[rgb(var(--text-primary-rgb)/0.86)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
                  (open ? "-translate-y-[6px] -rotate-45" : "")
                }
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            id="fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            className="fixed inset-0 z-[100] overflow-y-auto bg-[rgb(var(--bg-base-rgb)/0.92)]"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.4, 0.0, 0.2, 1] }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 gridlines opacity-[0.45]" />

            <div className="relative px-4 py-6 sm:px-6 lg:px-10">
              <div className="mx-auto max-w-[1600px]">
                <div className="flex items-center justify-between">
                  <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.70)]">
                    NAVIGATION
                  </div>
                  <button
                    type="button"
                    className="focus-ring rounded-md px-3 py-2 text-sm text-[rgb(var(--text-primary-rgb)/0.78)] hover:text-[rgb(var(--text-primary-rgb)/0.95)]"
                    onClick={() => setOpen(false)}
                  >
                    Закрыть
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-12 gap-10">
                  <div className="col-span-12 lg:col-span-7">
                    <nav aria-label="Разделы">
                      <ul className="space-y-2">
                        {MENU.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="focus-ring block rounded-xl px-4 py-4 text-3xl tracking-[-0.02em] text-[rgb(var(--text-primary-rgb)/0.92)] transition-[background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-[rgb(var(--bg-surface-rgb)/0.28)]"
                              onClick={() => setOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  <div className="col-span-12 lg:col-span-5">
                    <div className="glass-premium p-6">
                      <div className="metric text-[10px] tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                        QUICK ACTIONS
                      </div>
                      <div className="mt-4 grid gap-2">
                        <Link
                          href="/audit"
                          className="focus-ring rounded-md border border-[rgb(var(--accent-primary-rgb)/0.70)] bg-[rgb(var(--accent-primary-rgb)/0.10)] px-4 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.92)] transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.95)] hover:bg-[rgb(var(--accent-primary-rgb)/0.14)] hover:shadow-[0_0_0_3px_rgb(var(--accent-primary-rgb)/0.10)]"
                          onClick={() => setOpen(false)}
                        >
                          Аудит (48h)
                        </Link>
                        <Link
                          href="/brief"
                          className="focus-ring rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.22)] px-4 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.86)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-secondary-rgb)/0.78)] hover:bg-[rgb(var(--accent-secondary-rgb)/0.08)]"
                          onClick={() => setOpen(false)}
                        >
                          Бриф (2 мин)
                        </Link>
                      </div>

                      <div className="mt-6 border-t border-[rgb(var(--border-subtle-rgb)/0.45)] pt-5">
                        <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">Связь</div>
                        <div className="mt-3 space-y-2">
                          <a
                            className="focus-ring block rounded-md text-sm text-[rgb(var(--text-primary-rgb)/0.82)] hover:text-[rgb(var(--text-primary-rgb)/0.95)]"
                            href="mailto:hello@skybric.ru"
                          >
                            hello@skybric.ru
                          </a>
                          <a
                            className="focus-ring block rounded-md text-sm text-[rgb(var(--text-primary-rgb)/0.82)] hover:text-[rgb(var(--text-primary-rgb)/0.95)]"
                            href="tel:+77773365602"
                          >
                            +7(777)336-56-02
                          </a>
                        </div>
                        <div className="mt-4 text-[11px] text-[rgb(var(--text-primary-rgb)/0.55)]">
                          Trust-first · process-driven · outcomes-first.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

