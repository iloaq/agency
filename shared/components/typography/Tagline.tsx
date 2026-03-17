// Typography Tagline Component
import { type ReactNode } from 'react';
import { typography } from '@/shared/lib/typography';
import { cn } from '@/lib/utils/cn';

type TaglineProps = {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
};

export function Tagline({ children, className, as: Component = 'p' }: TaglineProps) {
  return (
    <Component className={cn(typography.tagline, className)}>
      {children}
    </Component>
  );
}
