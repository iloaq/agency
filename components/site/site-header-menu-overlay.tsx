"use client";

import Close from "@mui/icons-material/Close";
import Link from "next/link";
import type { RefObject } from "react";
import CenterUnderline from "@/components/fancy/text/underline-center";
import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import GoesOutComesInUnderline from "@/components/fancy/text/underline-goes-out-comes-in";
import { Button } from "@/components/ui/button";
import { siteGutterX } from "@/lib/site-gutters";
import { SiteLogoLink } from "@/components/site/site-logo-link";
import { overlayColumns, overlayPrimary } from "@/components/site/site-header-nav-data";

export type SiteHeaderMenuOverlayProps = {
  panelId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

export default function SiteHeaderMenuOverlay({
  panelId,
  closeRef,
  onClose,
}: SiteHeaderMenuOverlayProps) {
  return (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Меню сайта"
      className="fixed inset-0 z-[60] flex flex-col bg-white-primary text-fonts-black"
    >
      <div
        className={`flex h-16 shrink-0 items-center justify-between border-b border-black/10 ${siteGutterX}`}
      >
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

      <div
        className={`min-h-0 flex-1 overflow-y-auto overscroll-contain py-space-lg ${siteGutterX}`}
      >
        <div className="grid w-full gap-space-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-space-xl2">
          <div>
            <nav aria-label="Разделы">
              <ul className="flex flex-col gap-2">
                {overlayPrimary.map((item, idx) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-1 text-4xl font-bold uppercase tracking-wide text-fonts-grey transition-colors hover:text-fonts-black sm:text-5xl lg:text-6xl"
                      onClick={onClose}
                    >
                      <ComesInGoesOutUnderline
                        direction={idx % 2 === 0 ? "left" : "right"}
                        underlineHeightRatio={0.08}
                        underlinePaddingRatio={0.02}
                      >
                        {item.label}
                      </ComesInGoesOutUnderline>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-space-lg flex flex-col gap-space-base border-t border-black/10 pt-space-lg">
              <div className="flex flex-wrap gap-x-space-lg gap-y-2 text-sm">
                <a
                  href="tel:+77772550000"
                  className="inline-flex text-fonts-black transition-colors hover:text-accent-violet"
                >
                  <GoesOutComesInUnderline direction="left">
                    +7 777 255-00-00
                  </GoesOutComesInUnderline>
                </a>
                <a
                  href="mailto:hello@skybric.kz"
                  className="inline-flex text-fonts-black transition-colors hover:text-accent-violet"
                >
                  <GoesOutComesInUnderline direction="right">
                    hello@skybric.kz
                  </GoesOutComesInUnderline>
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-space-lg sm:grid-cols-2">
            {overlayColumns.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fonts-grey">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-flex text-sm text-fonts-grey transition-colors hover:text-fonts-black"
                        onClick={onClose}
                      >
                        <CenterUnderline>{l.label}</CenterUnderline>
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
  );
}
