// Typography Heading Component
import { type ReactNode, type CSSProperties } from 'react';
import { typography, type HeadingVariant, type FontWeight } from '@/shared/lib/typography';
import { cn } from '@/lib/utils/cn';

type HeadingProps = {
  variant?: HeadingVariant;
  weight?: FontWeight;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const variantToTag = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const;

export function Heading({
  variant = 'h1',
  weight,
  as,
  children,
  className,
  style,
}: HeadingProps) {
  const Tag = as || variantToTag[variant];
  const headingClass = typography.heading[variant];
  const weightClass = weight ? typography.weight[weight] : '';

  return (
    <Tag className={cn(headingClass, weightClass, className)} style={style}>
      {children}
    </Tag>
  );
}
