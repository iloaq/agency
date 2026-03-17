// Filters component

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type FilterItem = {
  id: string;
  label: ReactNode;
};

type FiltersProps = {
  items: FilterItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

export function Filters({ items, activeId, onChange, className }: FiltersProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-colors',
            activeId === item.id
              ? 'bg-[var(--current-scheme-accent)] text-[var(--current-scheme-background)]'
              : 'border border-[var(--current-scheme-border)] bg-transparent text-[var(--current-scheme-text)] hover:bg-[var(--current-scheme-foreground)]'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
