import type { Metadata } from "next";
import Link from "next/link";
import { HeroLab } from "@/shared/components/lab/HeroLab";
import { ServicesNarrative } from "@/shared/components/lab/ServicesNarrative";
import { CasesRail } from "@/shared/components/lab/CasesRail";
import { TrustConsole } from "@/shared/components/lab/TrustConsole";
import { SceneRail } from "@/shared/components/lab/SceneRail";
import { organizationJsonLd } from "@/shared/seo/jsonld";

// Source: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Главная",
  description:
    "Dark Lab (tech luxury R&D): интерактивные сцены, WebGL, motion и системный UX для B2B/enterprise.",
};

export default function HomePage() {
  const org = organizationJsonLd({
    url: "https://skybric.digital",
    name: "SKybric",
    email: "hello@skybric.digital",
    telephone: "+7-495-740-99-79",
  });

  return (
    <>
      <script
        type="application/ld+json"
        // Source: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />

      <SceneRail />
      <HeroLab />

      <CasesRail />

      <ServicesNarrative />

      <TrustConsole />

      <section id="cta" className="relative px-4 py-20 sm:px-6 lg:px-10" aria-label="CTA">
        <div className="mx-auto max-w-[1600px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 gridlines opacity-[0.22]" />
          <div className="glass-premium p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.62)]">
                  NEXT ACTION
                </div>
                <div className="mt-4 text-lg text-[rgb(var(--text-primary-rgb)/0.94)] md:text-xl">
                  Хотите увидеть картину проекта за 48 часов?
                </div>
                <div className="mt-3 max-w-[68ch] text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
                  Риски → метрики → план релизов. Без обязательств: артефакты остаются у вас.
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/audit"
                  className="focus-ring rounded-md border border-[rgb(var(--accent-primary-rgb)/0.65)] bg-[rgb(var(--bg-surface-rgb)/0.25)] px-5 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.92)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-primary-rgb)/0.95)] hover:bg-[rgb(var(--accent-primary-rgb)/0.09)]"
                >
                  Аудит (48h)
                </Link>
                <Link
                  href="/contact"
                  className="focus-ring rounded-md border border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-surface-rgb)/0.18)] px-5 py-3 text-sm text-[rgb(var(--text-primary-rgb)/0.78)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-[rgb(var(--accent-secondary-rgb)/0.75)] hover:bg-[rgb(var(--accent-secondary-rgb)/0.07)]"
                >
                  Связаться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

