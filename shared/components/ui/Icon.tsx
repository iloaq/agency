// Icon component wrapper for react-icons
// Source: https://react-icons.github.io/react-icons/

import { type IconType } from 'react-icons';
import { cn } from '@/lib/utils/cn';

type IconProps = {
  icon: IconType;
  size?: number | string;
  className?: string;
};

export function Icon({ icon: IconComponent, size = 20, className }: IconProps) {
  return (
    <IconComponent
      size={size}
      className={cn('flex-shrink-0', className)}
    />
  );
}
