"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* Референс анимации: https://codepen.io/diegohaz/pen/GgoRjjM?editors=1100 */

export type SegmentedItem<T extends string = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type SegmentedControlProps<T extends string> = {
  items: readonly SegmentedItem<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
};

export function SegmentedControl<T extends string>({
  items,
  value,
  onChange,
  disabled,
  className,
}: SegmentedControlProps<T>) {
  const rowRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });

  const updateThumb = useCallback(() => {
    const row = rowRef.current;
    const idx = items.findIndex((i) => i.value === value);
    const el = btnRefs.current[idx];
    if (!row || !el) {
      setThumb({ left: 0, width: 0 });
      return;
    }
    setThumb({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [items, value]);

  useLayoutEffect(() => {
    updateThumb();
    const row = rowRef.current;
    const ro = new ResizeObserver(updateThumb);
    if (row) ro.observe(row);
    window.addEventListener("resize", updateThumb);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateThumb);
    };
  }, [updateThumb]);

  const root = [
    "relative flex h-12 w-full rounded-[24px] bg-black/[0.06] p-1",
    disabled && "pointer-events-none opacity-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={root}
      role="radiogroup"
      aria-disabled={disabled || undefined}
    >
      <div ref={rowRef} className="relative flex h-full w-full gap-[6px]">
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-button-black transition-[transform,width] duration-200 ease-out"
          style={{
            width: Math.max(thumb.width, 0),
            transform: `translateX(${thumb.left}px)`,
          }}
        />
        {items.map((item, i) => {
          const active = item.value === value;
          const itemDisabled = disabled || item.disabled;
          return (
            <button
              key={String(item.value)}
              type="button"
              role="radio"
              aria-checked={active}
              aria-disabled={itemDisabled || undefined}
              tabIndex={itemDisabled ? -1 : 0}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              disabled={itemDisabled}
              onClick={() => {
                if (!itemDisabled && item.value !== value) {
                  onChange(item.value);
                }
              }}
              className={[
                "relative z-10 min-w-0 flex-1 rounded-full px-2 text-sm font-medium leading-5 transition-colors",
                active ? "text-fonts-white" : "text-fonts-grey",
                itemDisabled ? "cursor-not-allowed" : "cursor-pointer",
                !active && !itemDisabled && "hover:text-fonts-black",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="block truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
