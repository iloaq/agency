// Textarea component

import { type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
  className,
  ...props
}: TextareaProps) {
  const baseStyles = 'w-full px-4 py-2 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)] text-[var(--current-scheme-text)] placeholder:text-[var(--current-scheme-text)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--current-scheme-accent)] focus:border-transparent transition-colors resize-none';

  return (
    <textarea
      className={cn(baseStyles, className)}
      {...props}
    />
  );
}
