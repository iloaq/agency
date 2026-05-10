"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap-client";
import { useEffect, type ReactNode } from "react";

/* Lenis + ScrollTrigger: https://github.com/darkroomengineering/lenis#gsap-scrolltrigger */

export function LenisGsapProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      /* Меньше «липкого» скролла на тач — меньше событий. https://github.com/darkroomengineering/lenis#instance-settings */
      syncTouch: false,
    });

    let stPending: number | null = null;
    let stRafMounted = true;
    const onLenisScroll = () => {
      if (stPending != null) return;
      stPending = requestAnimationFrame(() => {
        stPending = null;
        if (stRafMounted) ScrollTrigger.update();
      });
    };
    lenis.on("scroll", onLenisScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      stRafMounted = false;
      if (stPending != null) cancelAnimationFrame(stPending);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
