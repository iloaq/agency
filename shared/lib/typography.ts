// Typography utility classes and types
// Source: Design system typography specification

export const typography = {
  heading: {
    display: 'heading-display',
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
    h4: 'heading-4',
    h5: 'heading-5',
    h6: 'heading-6',
  },
  text: {
    large: 'text-large',
    medium: 'text-medium',
    regular: 'text-regular',
    small: 'text-small',
    tiny: 'text-tiny',
  },
  tagline: 'tagline',
  weight: {
    extrabold: 'font-extrabold',
    bold: 'font-bold',
    semibold: 'font-semibold',
    medium: 'font-medium',
    normal: 'font-normal',
    light: 'font-light',
  },
} as const;

export type HeadingVariant = keyof typeof typography.heading;
export type TextVariant = keyof typeof typography.text;
export type FontWeight = keyof typeof typography.weight;
