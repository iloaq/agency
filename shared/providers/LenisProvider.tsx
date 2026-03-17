"use client";

import Lenis from "lenis";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMotionValue } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

type LenisCtx = {
  lenis: Lenis | null;
  scrollY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
};

const LenisContext = createContext<LenisCtx | null>(null);

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenis must be used within <LenisProvider />");
  return ctx;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const scrollY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;

    // Source: https://github.com/darkroomengineering/lenis
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      autoRaf: false,
      anchors: true,
    });

    setLenis(lenis);

    const unsubscribe = lenis.on("scroll", (l) => {
      scrollY.set(l.scroll);
      scrollProgress.set(l.progress);
    });

    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced, scrollProgress, scrollY]);

  const value = useMemo<LenisCtx>(
    () => ({ lenis, scrollY, scrollProgress }),
    [lenis, scrollProgress, scrollY]
  );

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

