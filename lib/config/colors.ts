// Color system configuration
// Source: https://tailwindcss.com/docs/customizing-colors

/**
 * Primitive color variables
 * Базовые цвета палитры без семантики
 */
export const primitiveColors = {
  // Grayscale Neutrals
  white: '#ffffff',
  lightGray: '#f3f4f6',
  lightGrayAlt: '#e5e7eb',
  mediumLightGray: '#d1d5db',
  mediumGray: '#9ca3af',
  darkerGray: '#6b7280',
  darkGray: '#4b5563',
  veryDarkGray: '#1f2937',
  black: '#000000',
  
  // Gray scale (legacy support)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  
  // Blue Neutrals (Brand)
  blueNeutrals: {
    1: '#f0f9ff',
    2: '#e0f2fe',
    3: '#bae6fd',
    4: '#7dd3fc',
    5: '#38bdf8',
    6: '#0ea5e9',
    7: '#0284c7',
    8: '#0369a1',
    9: '#0c4a6e',
  },
  
  // Brand colors (legacy support)
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Green Neutrals (Accent)
  greenNeutrals: {
    1: '#f0fdfa',
    2: '#ccfbf1',
    3: '#99f6e4',
    4: '#5eead4',
    5: '#2dd4bf',
    6: '#14b8a6',
    7: '#0d9488',
    8: '#0f766e',
    9: '#042f2e',
  },
  
  // Accent colors
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },
  
  // Status colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
} as const;

/**
 * Semantic color mappings for light theme
 */
export const lightTheme = {
  // Backgrounds
  background: {
    primary: primitiveColors.white,
    secondary: primitiveColors.gray[50],
    tertiary: primitiveColors.gray[100],
    inverse: primitiveColors.gray[900],
  },
  
  // Foregrounds (text)
  foreground: {
    primary: primitiveColors.gray[900],
    secondary: primitiveColors.gray[700],
    tertiary: primitiveColors.gray[500],
    inverse: primitiveColors.white,
    muted: primitiveColors.gray[400],
  },
  
  // Borders
  border: {
    primary: primitiveColors.gray[200],
    secondary: primitiveColors.gray[300],
    focus: primitiveColors.brand[500],
    error: primitiveColors.error[500],
  },
  
  // Brand colors
  brand: {
    primary: primitiveColors.brand[600],
    hover: primitiveColors.brand[700],
    active: primitiveColors.brand[800],
    light: primitiveColors.brand[100],
    dark: primitiveColors.brand[900],
  },
  
  // Accent
  accent: {
    primary: primitiveColors.accent[600],
    hover: primitiveColors.accent[700],
    light: primitiveColors.accent[100],
  },
  
  // Status
  success: {
    primary: primitiveColors.success[600],
    light: primitiveColors.success[100],
    dark: primitiveColors.success[700],
  },
  
  warning: {
    primary: primitiveColors.warning[500],
    light: primitiveColors.warning[100],
    dark: primitiveColors.warning[700],
  },
  
  error: {
    primary: primitiveColors.error[600],
    light: primitiveColors.error[100],
    dark: primitiveColors.error[700],
  },
  
  info: {
    primary: primitiveColors.info[600],
    light: primitiveColors.info[100],
    dark: primitiveColors.info[700],
  },
} as const;

/**
 * Semantic color mappings for dark theme
 */
export const darkTheme = {
  // Backgrounds
  background: {
    primary: primitiveColors.gray[950],
    secondary: primitiveColors.gray[900],
    tertiary: primitiveColors.gray[800],
    inverse: primitiveColors.white,
  },
  
  // Foregrounds (text)
  foreground: {
    primary: primitiveColors.gray[50],
    secondary: primitiveColors.gray[300],
    tertiary: primitiveColors.gray[500],
    inverse: primitiveColors.gray[900],
    muted: primitiveColors.gray[600],
  },
  
  // Borders
  border: {
    primary: primitiveColors.gray[800],
    secondary: primitiveColors.gray[700],
    focus: primitiveColors.brand[400],
    error: primitiveColors.error[400],
  },
  
  // Brand colors
  brand: {
    primary: primitiveColors.brand[400],
    hover: primitiveColors.brand[300],
    active: primitiveColors.brand[500],
    light: primitiveColors.brand[900],
    dark: primitiveColors.brand[200],
  },
  
  // Accent
  accent: {
    primary: primitiveColors.accent[400],
    hover: primitiveColors.accent[300],
    light: primitiveColors.accent[900],
  },
  
  // Status
  success: {
    primary: primitiveColors.success[400],
    light: primitiveColors.success[900],
    dark: primitiveColors.success[300],
  },
  
  warning: {
    primary: primitiveColors.warning[400],
    light: primitiveColors.warning[900],
    dark: primitiveColors.warning[300],
  },
  
  error: {
    primary: primitiveColors.error[400],
    light: primitiveColors.error[900],
    dark: primitiveColors.error[300],
  },
  
  info: {
    primary: primitiveColors.info[400],
    light: primitiveColors.info[900],
    dark: primitiveColors.info[300],
  },
} as const;

export type ColorScheme = 'light' | 'dark';
