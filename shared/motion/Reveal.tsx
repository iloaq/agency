"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION_FAST, EASE_STANDARD } from "./config";

type RevealVariant = "fade-up" | "reveal-line";

// Source: https://www.framer.com/motion/scroll-animations/
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const variants =
    variant === "reveal-line"
      ? {
          hidden: { opacity: 0, scaleX: 0.96, originX: 0 },
          show: { opacity: 1, scaleX: 1, originX: 0 },
        }
      : {
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0 },
        };

  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={variants}
      transition={{
        duration: DURATION_FAST,
        ease: EASE_STANDARD,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

