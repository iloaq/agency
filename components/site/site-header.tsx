"use client";

import Menu from "@mui/icons-material/Menu";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/components/site/site-header-nav-data";
import type { HeaderNavLink } from "@/components/site/site-header-nav-data";
import { SiteLogoLink } from "@/components/site/site-logo-link";
import type { SiteContacts } from "@/lib/site/site-contacts-model";
import { SITE_CONTACTS_FALLBACK } from "@/lib/site/site-contacts-model";
import { siteGutterX } from "@/lib/site-gutters";

const SiteHeaderMenuOverlay = dynamic(
  () => import("@/components/site/site-header-menu-overlay"),
  { ssr: false },
);

const navLinkClass =
  "relative inline-flex pb-1 text-base font-semibold text-[#121212] transition-colors hover:text-[#6D4AFF] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]";

export function SiteHeader({
  contacts = SITE_CONTACTS_FALLBACK,
  serviceLinks = [],
}: {
  contacts?: SiteContacts;
  serviceLinks?: HeaderNavLink[];
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F6F3EE]/88 backdrop-blur">
        <div className={`flex h-[72px] items-center justify-between gap-4 ${siteGutterX}`}>
          <SiteLogoLink />

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex"
            aria-label="Основная навигация"
          >
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <Link
              href="/contact"
              className="hidden min-h-12 items-center justify-center rounded-2xl bg-[#18181B] px-6 text-sm font-semibold text-white transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF] lg:inline-flex"
            >
              Обсудить проект ↗
            </Link>
            <Button
              type="button"
              size="medium"
              variant="ghost"
              mode="icon"
              icon={<Menu sx={{ fontSize: 24 }} aria-hidden />}
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
            contacts={contacts}
            serviceLinks={serviceLinks}
          />
        </Suspense>
      ) : null}
    </>
  );
}
