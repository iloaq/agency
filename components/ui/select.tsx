"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { useId, useMemo, useState, type ReactNode } from "react";

/* Source: https://www.radix-ui.com/primitives/docs/components/select */

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SelectSize = "large" | "regular" | "medium" | "small";

export type SelectProps = {
  items: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  label?: ReactNode;
  caption?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  id?: string;
};

const triggerSizes: Record<SelectSize, string> = {
  large:
    "min-h-[56px] h-[56px] gap-2 px-4 text-base leading-6 data-[placeholder]:text-fonts-grey",
  regular:
    "min-h-12 h-12 gap-2 px-4 text-base leading-6 data-[placeholder]:text-fonts-grey",
  medium:
    "min-h-10 h-10 gap-1 px-4 text-sm leading-5 data-[placeholder]:text-fonts-grey",
  small:
    "min-h-8 h-8 gap-1 px-3 text-sm leading-5 data-[placeholder]:text-fonts-grey",
};

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={["shrink-0 text-icons-grey", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <path
        d="M4.5 6L8 9.5L11.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 10L8 6.5L11.5 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Select({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Выбрать",
  size = "regular",
  label,
  caption,
  error,
  disabled,
  searchable,
  searchPlaceholder = "Найти",
  className,
  id: idProp,
}: SelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const text =
        typeof item.label === "string"
          ? item.label
          : String(item.value).toLowerCase();
      return text.toLowerCase().includes(q);
    });
  }, [items, query]);

  const controlled = value !== undefined;

  const trigger = [
    "inline-flex w-full min-w-0 items-center justify-between rounded-xl border border-black/10 bg-background-secondary text-left text-fonts-black outline-none transition-colors",
    "hover:bg-background-tertiary focus-visible:border-accent-violet focus-visible:bg-background-tertiary",
    "data-[state=open]:border-accent-violet data-[state=open]:bg-background-tertiary",
    "disabled:cursor-not-allowed disabled:opacity-50",
    error && "border-system-error focus-visible:border-system-error data-[state=open]:border-system-error",
    triggerSizes[size],
  ]
    .filter(Boolean)
    .join(" ");

  const hasHint = Boolean(caption || error);

  return (
    <div
      className={["flex w-full flex-col gap-3", className].filter(Boolean).join(" ")}
    >
      {label != null && label !== "" ? (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-5 text-fonts-grey"
        >
          {label}
        </label>
      ) : null}
      <SelectPrimitive.Root
        disabled={disabled}
        {...(controlled
          ? { value, onValueChange }
          : { defaultValue, onValueChange })}
      >
        <SelectPrimitive.Trigger
          id={id}
          className={trigger}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={hasHint ? hintId : undefined}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <span className="inline-flex size-8 shrink-0 items-center justify-center">
              <ChevronIcon />
            </span>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-50 max-h-[min(320px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-black/10 bg-background-secondary text-fonts-black shadow-lg"
          >
            {searchable ? (
              <div
                className="border-b border-black/10 p-2"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-lg border border-black/10 bg-background-primary px-3 py-2 text-sm text-fonts-black outline-none placeholder:text-fonts-grey focus-visible:border-accent-violet"
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            ) : null}
            <SelectPrimitive.Viewport className="max-h-[260px] overflow-y-auto p-1">
              {filtered.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-fonts-grey">
                  Ничего не найдено
                </div>
              ) : (
                filtered.map((item) => (
                  <SelectPrimitive.Item
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm leading-5 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-background-tertiary data-[state=checked]:bg-background-quaternary"
                  >
                    <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {hasHint ? (
        <p
          id={hintId}
          className={[
            "text-sm leading-5",
            error ? "text-fonts-error" : "text-fonts-grey",
          ].join(" ")}
        >
          {error ?? caption}
        </p>
      ) : null}
    </div>
  );
}
