"use client";

import Close from "@mui/icons-material/Close";
import Link from "next/link";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { SiteLogoLink } from "@/components/site/site-logo-link";
import { buildOverlayColumns, overlayPrimary } from "@/components/site/site-header-nav-data";
import type { SiteContacts } from "@/lib/site/site-contacts-model";

export type SiteHeaderMenuOverlayProps = {
  panelId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  contacts: SiteContacts;
};

export default function SiteHeaderMenuOverlay({
  panelId,
  closeRef,
  onClose,
  contacts,
}: SiteHeaderMenuOverlayProps) {
  const overlayColumns = buildOverlayColumns(contacts);

  return (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Меню сайта"
      className="fixed inset-0 z-[60] bg-[#121212]/28 p-3 text-[#121212] backdrop-blur-sm sm:p-4"
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-[#E6E0D8] bg-[#F6F3EE] shadow-[0_24px_80px_rgba(18,18,18,0.2)]">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E6E0D8] px-5 sm:px-8">
          <SiteLogoLink />
          <Button
            ref={closeRef}
            type="button"
            size="medium"
            variant="secondary"
            mode="icon"
            icon={<Close sx={{ fontSize: 24 }} aria-hidden />}
            aria-label="Закрыть меню"
            onClick={onClose}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
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

            <div className="grid gap-8 md:grid-cols-3 lg:pt-2">
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
