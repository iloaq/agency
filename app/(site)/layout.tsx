import type { ReactNode } from "react";
import { SiteFooter, SiteNav } from "@/shared/components/site";
import { ContextCursor } from "@/shared/motion";
import { LenisProvider } from "@/shared/providers/LenisProvider";
import { GlobalBackground } from "@/shared/components/lab/GlobalBackground";
import { PageTransition } from "@/shared/components/transitions/PageTransition";

// Source: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <GlobalBackground />

      <div className="relative z-10">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus-ring fixed left-4 top-4 z-[100] rounded-md bg-[rgb(var(--bg-surface-rgb)/0.92)] px-3 py-2 text-sm text-[rgb(var(--text-primary-rgb)/0.92)]"
        >
          Пропустить к содержимому
        </a>

        <SiteNav />

        <main id="content" className="min-h-[70vh]">
          <PageTransition>{children}</PageTransition>
        </main>

        <SiteFooter />
      </div>

      <ContextCursor />
    </LenisProvider>
  );
}

