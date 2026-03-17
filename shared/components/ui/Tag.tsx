// Tag component

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type TagProps = {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
};

export function Tag({ children, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--current-scheme-foreground)] text-[var(--current-scheme-text)] text-sm border border-[var(--current-scheme-border)]',
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
