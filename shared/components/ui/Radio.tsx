// Radio component

import { type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  card?: boolean;
};

export function Radio({
  label,
  description,
  icon,
  card = false,
  className,
  onChange,
  checked,
  ...props
}: RadioProps) {
  // Use defaultChecked for uncontrolled components
  const isControlled = onChange !== undefined;
  const radioProps = isControlled
    ? { checked, onChange, ...props }
    : { defaultChecked: checked, ...props };

  const radio = (
    <input
      type="radio"
      className={cn(
        'w-5 h-5 border-2 border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)] text-[var(--current-scheme-accent)] focus:ring-2 focus:ring-[var(--current-scheme-accent)] focus:ring-offset-0 cursor-pointer checked:bg-[var(--current-scheme-accent)] checked:border-[var(--current-scheme-accent)]',
        className
      )}
      {...radioProps}
    />
  );

  if (card) {
    return (
      <label className="flex items-start gap-4 p-4 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)] cursor-pointer hover:bg-[var(--current-scheme-background)] transition-colors">
        {icon && <span className="flex-shrink-0 text-[var(--current-scheme-text)]">{icon}</span>}
        <div className="flex-1">
          {label && (
            <div className="text-[var(--current-scheme-text)] font-medium mb-1">{label}</div>
          )}
          {description && (
            <div className="text-[var(--current-scheme-text)]/70 text-sm">{description}</div>
          )}
        </div>
        {radio}
      </label>
    );
  }

  if (label) {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        {radio}
        <span className="text-[var(--current-scheme-text)]">{label}</span>
      </label>
    );
  }

  return radio;
}
