// Typography Text Component
import { type ReactNode, type CSSProperties } from 'react';
import { typography, type TextVariant, type FontWeight } from '@/shared/lib/typography';
import { cn } from '@/lib/utils/cn';

type TextProps = {
  variant?: TextVariant;
  weight?: FontWeight;
  as?: 'p' | 'span' | 'div';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Text({
  variant = 'regular',
  weight,
  as: Component = 'p',
  children,
  className,
  style,
}: TextProps) {
  const textClass = typography.text[variant];
  const weightClass = weight ? typography.weight[weight] : '';

  return (
    <Component className={cn(textClass, weightClass, className)} style={style}>
      {children}
    </Component>
  );
}
