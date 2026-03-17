"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { DURATION_FAST, EASE_STANDARD } from "@/shared/motion";

// Source: https://www.framer.com/motion/animate-presence/
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        // Keep page transitions compatible with fixed layers (WebGL backgrounds).
        // Source: https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION_FAST, ease: EASE_STANDARD }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

