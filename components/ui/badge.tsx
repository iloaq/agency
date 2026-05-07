import type { ComponentProps, ReactNode } from "react";

export type BadgeVariant =
  | "primary"
  | "default"
  | "muted"
  | "purple"
  | "success"
  | "warning"
  | "danger";

export type BadgeSize = "md" | "sm";

const variants: Record<BadgeVariant, string> = {
  primary: "border-transparent bg-black-primary text-fonts-white",
  default:
    "border border-black/10 bg-background-tertiary text-fonts-black",
  muted: "border-transparent bg-background-fivefold text-fonts-black",
  purple:
    "border-transparent bg-accent-violet/15 text-button-violet-pressed",
  success:
    "border-transparent bg-charts-green-data/15 text-charts-green-data",
  warning:
    "border-transparent bg-system-info/25 text-black-primary",
  danger:
    "border-transparent bg-system-error/15 text-system-error",
};

const sizes: Record<BadgeSize, string> = {
  md: "rounded-md px-3 py-1 text-sm font-medium leading-5",
  sm: "rounded-md px-2 py-0.5 text-xs font-normal leading-4",
};

export type BadgeProps = Omit<ComponentProps<"span">, "children"> & {
  children?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge({
  children = "Badge",
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex max-w-full shrink-0 items-center justify-center whitespace-nowrap",
        variants[variant],
        sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
