import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { NumberTick } from "@/shared/motion";

export function Metric({
  label,
  value,
  hint,
  className,
  tick,
}: {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
  tick?: boolean;
}) {
  const renderedValue =
    typeof value === "number" ? (
      tick ? (
        <NumberTick to={value} className="metric text-2xl text-[rgb(var(--text-primary-rgb)/0.95)]" />
      ) : (
        <span className="metric text-2xl text-[rgb(var(--text-primary-rgb)/0.95)]">{value}</span>
      )
    ) : (
      <span className="metric text-2xl text-[rgb(var(--text-primary-rgb)/0.95)]">{value}</span>
    );

  return (
    <div className={cn("space-y-2", className)}>
      <div>{renderedValue}</div>
      <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.78)]">{label}</div>
      {hint ? (
        <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.62)]">{hint}</div>
      ) : null}
    </div>
  );
}

