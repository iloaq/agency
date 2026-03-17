// Color utility functions and Tailwind class helpers
// Source: https://tailwindcss.com/docs/customizing-colors

/**
 * Tailwind color classes for semantic colors
 */
export const colorClasses = {
  // Backgrounds
  bg: {
    primary: 'bg-[var(--color-bg-primary)]',
    secondary: 'bg-[var(--color-bg-secondary)]',
    tertiary: 'bg-[var(--color-bg-tertiary)]',
    inverse: 'bg-[var(--color-bg-inverse)]',
  },
  
  // Foregrounds (text)
  text: {
    primary: 'text-[var(--color-fg-primary)]',
    secondary: 'text-[var(--color-fg-secondary)]',
    tertiary: 'text-[var(--color-fg-tertiary)]',
    inverse: 'text-[var(--color-fg-inverse)]',
    muted: 'text-[var(--color-fg-muted)]',
  },
  
  // Borders
  border: {
    primary: 'border-[var(--color-border-primary)]',
    secondary: 'border-[var(--color-border-secondary)]',
    focus: 'border-[var(--color-border-focus)]',
    error: 'border-[var(--color-border-error)]',
  },
  
  // Brand
  brand: {
    primary: 'bg-[var(--color-brand-primary)]',
    hover: 'hover:bg-[var(--color-brand-hover)]',
    active: 'active:bg-[var(--color-brand-active)]',
    light: 'bg-[var(--color-brand-light)]',
    dark: 'bg-[var(--color-brand-dark)]',
    text: 'text-[var(--color-brand-primary)]',
  },
  
  // Accent
  accent: {
    primary: 'bg-[var(--color-accent-primary)]',
    hover: 'hover:bg-[var(--color-accent-hover)]',
    light: 'bg-[var(--color-accent-light)]',
    text: 'text-[var(--color-accent-primary)]',
  },
  
  // Status
  success: {
    primary: 'bg-[var(--color-success-primary)]',
    light: 'bg-[var(--color-success-light)]',
    dark: 'bg-[var(--color-success-dark)]',
    text: 'text-[var(--color-success-primary)]',
  },
  
  warning: {
    primary: 'bg-[var(--color-warning-primary)]',
    light: 'bg-[var(--color-warning-light)]',
    dark: 'bg-[var(--color-warning-dark)]',
    text: 'text-[var(--color-warning-primary)]',
  },
  
  error: {
    primary: 'bg-[var(--color-error-primary)]',
    light: 'bg-[var(--color-error-light)]',
    dark: 'bg-[var(--color-error-dark)]',
    text: 'text-[var(--color-error-primary)]',
  },
  
  info: {
    primary: 'bg-[var(--color-info-primary)]',
    light: 'bg-[var(--color-info-light)]',
    dark: 'bg-[var(--color-info-dark)]',
    text: 'text-[var(--color-info-primary)]',
  },
} as const;

/**
 * Get primitive color CSS variable name
 */
export function getPrimitiveColorVar(color: string, shade?: number): string {
  if (shade !== undefined) {
    return `var(--color-${color}-${shade})`;
  }
  return `var(--color-${color})`;
}

/**
 * Get semantic color CSS variable name
 */
export function getSemanticColorVar(category: string, variant: string): string {
  return `var(--color-${category}-${variant})`;
}
