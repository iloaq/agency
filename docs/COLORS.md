# Color System Documentation

## Структура

### 1. Primitive Variables (Примитивные переменные)

Базовые цвета палитры без семантики. Определены в `app/globals.css`:

```css
--color-gray-50 до --color-gray-950
--color-brand-50 до --color-brand-950
--color-accent-50 до --color-accent-950
--color-success-50 до --color-success-950
--color-warning-50 до --color-warning-950
--color-error-50 до --color-error-950
--color-info-50 до --color-info-950
```

### 2. Semantic Colors (Семантические цвета)

Цвета с назначением, автоматически меняются в light/dark темах:

```css
/* Backgrounds */
--color-bg-primary
--color-bg-secondary
--color-bg-tertiary
--color-bg-inverse

/* Foregrounds (text) */
--color-fg-primary
--color-fg-secondary
--color-fg-tertiary
--color-fg-inverse
--color-fg-muted

/* Borders */
--color-border-primary
--color-border-secondary
--color-border-focus
--color-border-error

/* Brand */
--color-brand-primary
--color-brand-hover
--color-brand-active
--color-brand-light
--color-brand-dark

/* Accent */
--color-accent-primary
--color-accent-hover
--color-accent-light

/* Status */
--color-success-primary
--color-warning-primary
--color-error-primary
--color-info-primary
```

## Использование

### В CSS

```css
.my-element {
  background: var(--color-bg-primary);
  color: var(--color-fg-primary);
  border: 1px solid var(--color-border-primary);
}
```

### В Tailwind (inline styles)

```tsx
<div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
  <p style={{ color: 'var(--color-fg-primary)' }}>Text</p>
</div>
```

### В Tailwind (классы)

Используй утилиты из `shared/lib/colors.ts`:

```tsx
import { colorClasses } from '@/shared/lib/colors';

<div className={colorClasses.bg.primary}>
  <p className={colorClasses.text.primary}>Text</p>
</div>
```

### Примитивные цвета в Tailwind

```tsx
<div className="bg-[var(--color-brand-500)]">
<div className="text-[var(--color-gray-700)]">
<div className="border-[var(--color-accent-600)]">
```

## Color Schemes

### Автоматическая тема (prefers-color-scheme)

Система автоматически переключается между light/dark на основе системных настроек.

### Ручное переключение

Используй `useTheme` hook:

```tsx
'use client';
import { useTheme } from '@/shared/hooks/useTheme';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## Примеры

См. `/colors` страницу для визуального примера всех цветов.
