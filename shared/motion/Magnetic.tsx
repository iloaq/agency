"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION_QUICK, EASE_STANDARD } from "./config";

// Мягкий «magnetic» эффект для CTA (только hover, без лишней кинематики).
// Source: https://www.framer.com/motion/gesture/
export function Magnetic({
  children,
  className,
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate3d(${(x / r.width) * strength}px, ${(y / r.height) * strength}px, 0)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate3d(0,0,0)";
      }}
      transition={{ duration: DURATION_QUICK, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}

