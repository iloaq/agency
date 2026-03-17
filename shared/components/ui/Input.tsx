// Input component

import { type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  prefix?: string;
  suffix?: string;
};

export function Input({
  iconLeft,
  iconRight,
  prefix,
  suffix,
  className,
  ...props
}: InputProps) {
  const baseStyles = 'w-full px-4 py-2 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)] text-[var(--current-scheme-text)] placeholder:text-[var(--current-scheme-text)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--current-scheme-accent)] focus:border-transparent transition-colors';
  
  const hasAddon = iconLeft || iconRight || prefix || suffix;

  if (hasAddon) {
    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-[var(--current-scheme-text)]/70 pointer-events-none">
            {prefix}
          </span>
        )}
        {iconLeft && (
          <span className="absolute left-4 text-[var(--current-scheme-text)]/70 pointer-events-none">
            {iconLeft}
          </span>
        )}
        <input
          className={cn(
            baseStyles,
            prefix && 'pl-20',
            iconLeft && !prefix && 'pl-10',
            iconRight && !suffix && 'pr-10',
            suffix && 'pr-20',
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 text-[var(--current-scheme-text)]/70 pointer-events-none">
            {suffix}
          </span>
        )}
        {iconRight && (
          <span className="absolute right-4 text-[var(--current-scheme-text)]/70 pointer-events-none">
            {iconRight}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      className={cn(baseStyles, className)}
      {...props}
    />
  );
}
