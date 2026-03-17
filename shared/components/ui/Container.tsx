// Container component for content width management
// Source: https://tailwindcss.com/docs/container

import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: 'full' | 'wide' | 'default' | 'narrow';
  padding?: boolean;
};

const sizes = {
  full: 'max-w-none',
  wide: 'max-w-none',
  default: 'max-w-none',
  narrow: 'max-w-none',
};

export function Container({
  children,
  size = 'default',
  padding = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizes[size],
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
