// Toggle component

import { type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  description?: ReactNode;
  card?: boolean;
};

export function Toggle({
  label,
  description,
  card = false,
  className,
  checked,
  ...props
}: ToggleProps) {
  const toggle = (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        {...props}
      />
      <div
        className={cn(
          "w-11 h-6 rounded-full peer-focus:ring-2 peer-focus:ring-[var(--current-scheme-accent)] transition-colors",
          checked
            ? "bg-[var(--current-scheme-accent)]"
            : "bg-[var(--current-scheme-border)]"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform",
            checked
              ? "translate-x-5 bg-[var(--current-scheme-background)]"
              : "bg-[var(--current-scheme-text)]"
          )}
        />
      </div>
    </label>
  );

  if (card) {
    return (
      <div className="flex items-center justify-between p-4 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)] hover:bg-[var(--current-scheme-background)] transition-colors">
        <div className="flex-1">
          {label && (
            <div className="text-[var(--current-scheme-text)] font-medium mb-1">{label}</div>
          )}
          {description && (
            <div className="text-[var(--current-scheme-text)]/70 text-sm">{description}</div>
          )}
        </div>
        {toggle}
      </div>
    );
  }

  return toggle;
}
