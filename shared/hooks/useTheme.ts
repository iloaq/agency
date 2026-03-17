// Theme hook for manual theme switching
// Source: https://nextjs.org/docs/app/building-your-application/styling/css-modules#css-variables-and-themes

'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored || 'system';
    setTheme(initialTheme);

    // Resolve system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateResolvedTheme = () => {
      if (initialTheme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(initialTheme);
      }
    };

    updateResolvedTheme();
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateResolvedTheme);
    };
  }, []);

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    const root = document.documentElement;
    if (newTheme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', systemDark ? 'dark' : 'light');
      setResolvedTheme(systemDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', newTheme);
      setResolvedTheme(newTheme);
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeValue,
  };
}
