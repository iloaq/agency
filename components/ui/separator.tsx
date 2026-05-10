import type { ComponentProps } from "react";

/* Source: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role */

export type SeparatorProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  orientation = "horizontal",
  className,
  role = "separator",
  "aria-orientation": ariaOrientation,
  ...props
}: SeparatorProps) {
  const styles =
    orientation === "vertical"
      ? "w-1 min-h-12 shrink-0 self-stretch bg-background-tertiary"
      : "h-1 w-full shrink-0 bg-background-tertiary";

  return (
    <div
      role={role}
      aria-orientation={ariaOrientation ?? orientation}
      className={[styles, "rounded-none", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
