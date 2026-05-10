"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

/*
  Анимация: spring cubic-bezier(0.34, 1.56, 0.64, 1).
  Зелёный ON/hover: в globals `charts-green-primary` тёмный; для визуала как в макете — `charts-green-data`.
*/

type Native = Omit<ComponentProps<"button">, "type" | "role">;

export type SwitcherProps = Native & {
  label?: ReactNode;
  caption?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
};

export const Switcher = forwardRef<HTMLButtonElement, SwitcherProps>(
  function Switcher(
    {
      label,
      caption,
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      className,
      id: idProp,
      onClick,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const controlled = checkedProp !== undefined;
    const checked = controlled ? Boolean(checkedProp) : uncontrolled;

    const setChecked = useCallback(
      (next: boolean) => {
        onCheckedChange?.(next);
        if (!controlled) setUncontrolled(next);
      },
      [controlled, onCheckedChange],
    );

    const toggle = useCallback(() => {
      if (disabled) return;
      setChecked(!checked);
    }, [checked, disabled, setChecked]);

    const track = [
      "relative inline-flex h-6 w-11 shrink-0 items-center rounded-[12px] border-2 p-0.5",
      "transition-[background-color,border-color] duration-300",
      checked
        ? "border-charts-green-data bg-charts-green-data"
        : "border-background-quaternary bg-background-secondary group-hover/switch:border-charts-green-data",
      disabled &&
        "pointer-events-none border-background-fivefold bg-background-fivefold group-hover/switch:border-background-fivefold",
    ]
      .filter(Boolean)
      .join(" ");

    const knob = [
      "pointer-events-none absolute left-0.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full",
      "transition-[transform,background-color] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
      disabled
        ? checked
          ? "translate-x-5 bg-icons-grey"
          : "translate-x-0 bg-icons-grey"
        : checked
          ? "translate-x-5 bg-icons-white group-hover/switch:bg-black-primary"
          : "translate-x-0 bg-black-primary",
    ].join(" ");

    const hasText = label != null || caption != null;

    return (
      <label
        htmlFor={id}
        className={[
          "group/switch inline-flex max-w-full cursor-pointer items-center gap-2 has-[:disabled]:cursor-not-allowed",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {hasText ? (
          <span
            id={`${id}-text`}
            className="flex min-w-0 flex-1 flex-col gap-1"
          >
            {label != null && label !== "" ? (
              <span className="text-sm font-medium leading-5 text-fonts-black">
                {label}
              </span>
            ) : null}
            {caption != null && caption !== "" ? (
              <span className="text-xs leading-4 text-fonts-grey">{caption}</span>
            ) : null}
          </span>
        ) : null}
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={hasText ? `${id}-text` : undefined}
          disabled={disabled}
          onClick={(e) => {
            onClick?.(e);
            if (!e.defaultPrevented) toggle();
          }}
          className={[
            track,
            "[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
            "outline-none focus-visible:ring-2 focus-visible:ring-accent-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          <span className={knob} aria-hidden />
        </button>
      </label>
    );
  },
);

Switcher.displayName = "Switcher";
