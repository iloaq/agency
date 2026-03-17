// Select component

import { type SelectHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  iconLeft?: ReactNode;
};

export function Select({
  iconLeft,
  className,
  children,
  ...props
}: SelectProps) {
  const baseStyles = 'w-full px-4 py-2 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)] text-[var(--current-scheme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--current-scheme-accent)] focus:border-transparent transition-colors appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")] bg-no-repeat bg-right-4 bg-[length:20px]';

  return (
    <div className="relative flex items-center">
      {iconLeft && (
        <span className="absolute left-4 text-[var(--current-scheme-text)]/70 pointer-events-none z-10">
          {iconLeft}
        </span>
      )}
      <select
        className={cn(
          baseStyles,
          iconLeft && 'pl-10',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
