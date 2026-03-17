"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export function TiltCard({
  children,
  className,
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const srx = useSpring(rx, { stiffness: 260, damping: 26, mass: 0.25 });
  const sry = useSpring(ry, { stiffness: 260, damping: 26, mass: 0.25 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{
        transformStyle: "preserve-3d",
        rotateX: srx,
        rotateY: sry,
      }}
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const x = (0.5 - py) * (max * 0.7);
        const y = (px - 0.5) * (max * 0.7);
        rx.set(x);
        ry.set(y);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <div style={{ transform: "translateZ(0px)" }}>{children}</div>
    </motion.div>
  );
}

