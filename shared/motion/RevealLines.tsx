"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/shared/hooks/useInView";
import { DURATION_FAST, EASE_STANDARD } from "./config";

export function RevealLines({
  lines,
  className,
  stagger = 0.06,
}: {
  lines: string[];
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    threshold: 0.35,
    rootMargin: "-10% 0px",
  });

  return (
    <div ref={ref} className={className}>
      {lines.map((line, idx) => (
        <div key={`${idx}-${line}`} className="overflow-hidden">
          <motion.div
            initial={reduce ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{
              duration: DURATION_FAST,
              ease: EASE_STANDARD,
              delay: idx * stagger,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

