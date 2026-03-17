// Slider Arrows component

import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type SliderArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export function SliderArrows({ onPrev, onNext, className }: SliderArrowsProps) {
  const buttonStyles = 'w-10 h-10 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)] text-[var(--current-scheme-text)] hover:bg-[var(--current-scheme-background)] transition-colors flex items-center justify-center';

  return (
    <div className={cn('flex gap-2', className)}>
      <button onClick={onPrev} className={buttonStyles} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={onNext} className={buttonStyles} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
