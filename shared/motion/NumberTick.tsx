"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { DURATION_FAST } from "./config";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

// Source: https://www.framer.com/motion/ (анимации можно делать и без motion.div, через rAF)
export function NumberTick({
  to,
  decimals = 0,
  className,
}: {
  to: number;
  decimals?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  const formatter = useMemo(() => {
    return new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, [decimals]);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const durationMs = clamp(DURATION_FAST * 1000, 120, 280);

    const tick = (t: number) => {
      const p = clamp((t - start) / durationMs, 0, 1);
      setValue(to * p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, to]);

  return <span className={className}>{formatter.format(value)}</span>;
}

