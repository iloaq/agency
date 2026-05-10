"use client";

import { gsap } from "@/lib/gsap-client";
import { useEffect, useRef, type ReactNode } from "react";

/* Fancy Simple Marquee: https://www.fancycomponents.dev/docs/components/blocks/simple-marquee */
/* GSAP xPercent: https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/ */

const wrap = (min: number, max: number, value: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export type SimpleMarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Текст едет влево при `left`. */
  direction?: "left" | "right";
  /** Условная «скорость» в тех же единицах, что и wrap 0…−100 (чем больше — быстрее). */
  baseVelocity?: number;
  /** Сколько копий подряд (убирает рывок при сшивке). */
  repeat?: number;
  slowdownOnHover?: boolean;
  /** Учитывать скорость вертикального скролла страницы. */
  scrollAware?: boolean;
};

export default function SimpleMarquee({
  children,
  className,
  direction = "left",
  baseVelocity = 32,
  repeat = 5,
  slowdownOnHover = true,
  scrollAware = false,
}: SimpleMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseX = useRef(0);
  const hovering = useRef(false);
  const reduced = useRef(false);
  const lastScrollY = useRef(0);
  const smoothScrollVel = useRef(0);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) return;

    const vx =
      direction === "left"
        ? -Math.abs(baseVelocity)
        : Math.abs(baseVelocity);
    let last = performance.now();
    let id = 0;

    const tick = (t: number) => {
      const delta = Math.min(64, t - last);
      last = t;
      const fac =
        slowdownOnHover && hovering.current ? 0.28 : 1;

      let moveBy = (vx * delta) / 1000 * fac;

      if (scrollAware) {
        const sy = window.scrollY;
        const inst = (sy - lastScrollY.current) / Math.max(delta, 0.5);
        lastScrollY.current = sy;
        smoothScrollVel.current +=
          (inst * 16 - smoothScrollVel.current) * Math.min(1, delta / 45);
        const boost = Math.max(
          -1,
          Math.min(1, smoothScrollVel.current / 720),
        );
        moveBy *= 1 + boost * 0.55;
      }

      baseX.current += moveBy;
      const xPct = wrap(0, -100, baseX.current);
      const el = rootRef.current;
      if (el) gsap.set(el, { xPercent: xPct });
      id = requestAnimationFrame(tick);
    };

    lastScrollY.current = window.scrollY;
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [baseVelocity, direction, slowdownOnHover, scrollAware]);

  return (
    <div
      ref={rootRef}
      className={[
        "flex w-max max-w-none flex-nowrap items-center gap-x-space-xl will-change-transform",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
      }}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className="flex shrink-0 items-center whitespace-nowrap"
          aria-hidden={i > 0}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
