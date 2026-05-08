"use client";

import Menu from "@mui/icons-material/Menu";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/components/site/site-header-nav-data";
import { SiteLogoLink } from "@/components/site/site-logo-link";
import { siteGutterX } from "@/lib/site-gutters";

/* Тяжёлое меню (MUI + GSAP) — только после открытия. https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading */

const SiteHeaderMenuOverlay = dynamic(
  () => import("@/components/site/site-header-menu-overlay"),
  { ssr: false },
);

const linkBarClass =
  "text-body-2-semibold text-fonts-black transition-colors hover:text-accent-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-violet";

const navLinkUnderline = `${linkBarClass} relative inline-flex pb-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-current after:opacity-90 after:transition-transform after:duration-200 motion-reduce:after:transition-none hover:after:scale-x-100`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.dataset.agencyMenu = "open";
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.agencyMenu;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#E6E0D8]/80 bg-[#F6F3EE]/92 backdrop-blur">
        <div className={`flex h-16 items-center justify-between gap-4 ${siteGutterX}`}>
          <SiteLogoLink />

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex"
            aria-label="Основная навигация"
          >
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkUnderline}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <Link
              href="/contact"
              className="hidden min-h-10 items-center justify-center rounded-full bg-[#18181B] px-5 text-sm font-semibold text-white transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF] lg:inline-flex"
            >
              Обсудить проект
            </Link>
            <Button
              type="button"
              size="medium"
              variant="secondary"
              mode="icon"
              icon={<Menu sx={{ fontSize: 22 }} aria-hidden />}
              aria-label="Открыть меню"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </header>

      {open ? (
        <Suspense fallback={null}>
          <SiteHeaderMenuOverlay
            panelId={panelId}
            closeRef={closeRef}
            onClose={close}
          />
        </Suspense>
      ) : null}
    </>
  );
}
