"use client";

import { gsap } from "@/lib/gsap-client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* Fancy-style: https://www.fancycomponents.dev/docs/components/text/underline-animation */
/* GSAP: https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/ */

export type ComesInGoesOutDirection = "left" | "right";

export type UnderlineTransition = {
  duration?: number;
  ease?: string;
};

export type ComesInGoesOutUnderlineProps = {
  children: ReactNode;
  className?: string;
  direction?: ComesInGoesOutDirection;
  transition?: UnderlineTransition;
  underlineHeightRatio?: number;
  underlinePaddingRatio?: number;
};

export default function ComesInGoesOutUnderline({
  children,
  className,
  direction = "left",
  transition = { duration: 0.28, ease: "power3.out" },
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
}: ComesInGoesOutUnderlineProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const apply = () => {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      el.style.setProperty("--underline-h", `${fs * underlineHeightRatio}px`);
      el.style.setProperty("--underline-pad", `${fs * underlinePaddingRatio}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [underlineHeightRatio, underlinePaddingRatio]);

  const enterOrigin = direction === "left" ? "0% 50%" : "100% 50%";
  const exitOrigin = direction === "left" ? "100% 50%" : "0% 50%";

  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    gsap.set(line, { transformOrigin: hover ? enterOrigin : exitOrigin });
    gsap.to(line, {
      scaleX: hover ? 1 : 0,
      duration: transition.duration ?? 0.28,
      ease: transition.ease ?? "power3.out",
      overwrite: true,
    });
    return () => {
      gsap.killTweensOf(line);
    };
  }, [hover, enterOrigin, exitOrigin, transition.duration, transition.ease]);

  return (
    <span
      ref={rootRef}
      className={["relative inline-block", className].filter(Boolean).join(" ")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative z-0">{children}</span>
      <span
        ref={lineRef}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 z-[1] rounded-[1px] bg-current opacity-90"
        style={{
          bottom: "var(--underline-pad, 1px)",
          height: "var(--underline-h, 2px)",
          transformOrigin: enterOrigin,
          transform: "scaleX(0)",
        }}
      />
    </span>
  );
}
