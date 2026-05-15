"use client";

import Close from "@mui/icons-material/Close";
import Link from "next/link";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { SiteLogoLink } from "@/components/site/site-logo-link";
import {
  buildOverlayColumns,
  overlayPrimary,
  type HeaderNavLink,
} from "@/components/site/site-header-nav-data";
import type { SiteContacts } from "@/lib/site/site-contacts-model";
import { siteGutterX } from "@/lib/site-gutters";

export type SiteHeaderMenuOverlayProps = {
  panelId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  contacts: SiteContacts;
  serviceLinks: HeaderNavLink[];
};

export default function SiteHeaderMenuOverlay({
  panelId,
  closeRef,
  onClose,
  contacts,
  serviceLinks,
}: SiteHeaderMenuOverlayProps) {
  const overlayColumns = buildOverlayColumns(contacts, serviceLinks);

  return (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Меню сайта"
      className="fixed inset-0 z-[60] flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-[#F6F3EE] text-[#121212]"
    >
      {/* 100dvh: https://developer.mozilla.org/en-US/docs/Web/CSS/length#dvh — шапка как у SiteHeader (72px + siteGutterX), чтобы иконка закрытия совпадала с «Открыть меню». */}
      <div
        className={`flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-[#E6E0D8] ${siteGutterX}`}
      >
        <SiteLogoLink />
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          {/* Как в SiteHeader: на lg слева от иконки — CTA; дубликат только для ширины, чтобы крестик не прыгал. */}
          <Link
            href="/contact"
            tabIndex={-1}
            aria-hidden
            className="invisible pointer-events-none hidden min-h-12 select-none items-center justify-center rounded-2xl px-6 text-sm font-semibold lg:inline-flex"
          >
            Обсудить проект ↗
          </Link>
          <Button
            ref={closeRef}
            type="button"
            size="medium"
            variant="ghost"
            mode="icon"
            icon={<Close sx={{ fontSize: 24 }} aria-hidden />}
            aria-label="Закрыть меню"
            onClick={onClose}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div
          className={`flex min-h-full flex-col justify-center py-8 sm:justify-start lg:min-h-0 lg:py-12 ${siteGutterX}`}
        >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <nav aria-label="Основные разделы">
                <ul className="grid gap-3">
                {overlayPrimary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-5 border-b border-[#E6E0D8] py-4 text-[clamp(2.4rem,7vw,5.8rem)] font-semibold uppercase leading-[0.95] tracking-normal text-[#121212] transition hover:text-[#6D4AFF]"
                      onClick={onClose}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#DCD3C8] bg-white text-2xl transition group-hover:border-[#6D4AFF] group-hover:bg-[#6D4AFF] group-hover:text-white"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              </nav>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:pt-2">
              {overlayColumns.map((col) => (
                  <div key={col.title}>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B]">
                    {col.title}
                  </p>
                  <ul className="grid gap-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-flex text-base font-medium leading-6 text-[#4B4B4B] transition hover:text-[#6D4AFF]"
                          onClick={onClose}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
