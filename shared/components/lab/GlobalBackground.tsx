"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GlobalBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-base)]" />

      {/* Slow orb drift (very low contrast) */}
      <motion.div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-primary-rgb)/0.20) 0%, transparent 62%)",
        }}
        animate={reduce ? {} : { x: [0, 120, -40, 0], y: [0, 60, 140, 0] }}
        transition={reduce ? {} : { duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-secondary-rgb)/0.16) 0%, transparent 64%)",
        }}
        animate={reduce ? {} : { x: [0, -140, 60, 0], y: [0, -90, 80, 0] }}
        transition={reduce ? {} : { duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle noise layer */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_0%,rgb(var(--bg-base-rgb)/0.65)_72%,rgb(var(--bg-base-rgb)/0.92)_100%)]" />
    </div>
  );
}

