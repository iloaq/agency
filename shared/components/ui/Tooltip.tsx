// Tooltip component

import { type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  content: ReactNode;
  title?: ReactNode;
  image?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
};

export function Tooltip({
  content,
  title,
  image,
  position = 'top',
  children,
  className,
}: TooltipProps) {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={cn(
          'absolute z-50 hidden group-hover:block',
          positions[position],
          className
        )}
      >
        <div className="bg-[var(--current-scheme-background)] text-[var(--current-scheme-text)] rounded-lg p-4 shadow-lg border border-[var(--current-scheme-border)] max-w-xs">
          {image && (
            <img
              src={image}
              alt=""
              className="w-full h-32 object-cover rounded mb-3"
            />
          )}
          {title && (
            <div className="font-semibold mb-2">{title}</div>
          )}
          <div className="text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
}
