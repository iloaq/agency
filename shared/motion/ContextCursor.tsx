"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CursorState = {
  x: number;
  y: number;
  label: string | null;
  visible: boolean;
};

// Контекстный курсор (например, на карточках кейсов: "Смотреть кейс").
// Источник идеи: https://developer.mozilla.org/docs/Web/API/Element/matches
export function ContextCursor() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    label: null,
    visible: false,
  });

  const canUse = useMemo(() => !reduce, [reduce]);

  useEffect(() => {
    if (!canUse) return;

    const onMove = (e: PointerEvent) => {
      setState((s) => ({ ...s, x: e.clientX, y: e.clientY }));
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const host = el?.closest?.("[data-cursor-label]") as HTMLElement | null;
      const label = host?.getAttribute("data-cursor-label");
      if (!label) return;
      setState((s) => ({ ...s, label, visible: true }));
    };

    const onOut = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const host = el?.closest?.("[data-cursor-label]") as HTMLElement | null;
      if (!host) return;
      setState((s) => ({ ...s, visible: false }));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, [canUse]);

  if (!canUse) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{
        transform: `translate3d(${state.x + 14}px, ${state.y + 14}px, 0)`,
        opacity: state.visible ? 1 : 0,
        transition: "opacity var(--duration-quick) var(--ease-standard)",
      }}
    >
      <div className="glass-panel px-3 py-2">
        <span className="text-xs text-[rgb(var(--text-primary-rgb)/0.9)]">
          {state.label}
        </span>
      </div>
    </div>
  );
}

