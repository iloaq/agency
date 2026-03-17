// Utility for merging class names
// Source: https://github.com/dcastil/tailwind-merge
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
