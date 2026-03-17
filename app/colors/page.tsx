// Color system showcase page
'use client';

import { Heading, Text } from '@/shared/components/typography';

export default function ColorsPage() {
  const grayscaleNeutrals = [
    { name: 'White', value: '#ffffff' },
    { name: 'Light Gray', value: '#f3f4f6' },
    { name: 'Light Gray', value: '#e5e7eb' },
    { name: 'Medium Light Gray', value: '#d1d5db' },
    { name: 'Medium Gray', value: '#9ca3af' },
    { name: 'Darker Gray', value: '#6b7280' },
    { name: 'Dark Gray', value: '#4b5563' },
    { name: 'Very Dark Gray', value: '#1f2937' },
    { name: 'Black', value: '#000000' },
  ];

  const blueNeutrals = [
    { name: 'Blue Neutral 1', value: '#f0f9ff' },
    { name: 'Blue Neutral 2', value: '#e0f2fe' },
    { name: 'Blue Neutral 3', value: '#bae6fd' },
    { name: 'Blue Neutral 4', value: '#7dd3fc' },
    { name: 'Blue Neutral 5', value: '#38bdf8' },
    { name: 'Blue Neutral 6', value: '#0ea5e9' },
    { name: 'Blue Neutral 7', value: '#0284c7' },
    { name: 'Blue Neutral 8', value: '#0369a1' },
    { name: 'Blue Neutral 9', value: '#0c4a6e' },
  ];

  const greenNeutrals = [
    { name: 'Green Neutral 1', value: '#f0fdfa' },
    { name: 'Green Neutral 2', value: '#ccfbf1' },
    { name: 'Green Neutral 3', value: '#99f6e4' },
    { name: 'Green Neutral 4', value: '#5eead4' },
    { name: 'Green Neutral 5', value: '#2dd4bf' },
    { name: 'Green Neutral 6', value: '#14b8a6' },
    { name: 'Green Neutral 7', value: '#0d9488' },
    { name: 'Green Neutral 8', value: '#0f766e' },
    { name: 'Green Neutral 9', value: '#042f2e' },
  ];

  return (
    <div className="p-8 space-y-12" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <section>
        <Heading variant="h1" style={{ color: 'var(--color-fg-primary)' }}>
          PRIMITIVE VARIABLES
        </Heading>
        <Text variant="medium" className="mt-4" style={{ color: 'var(--color-fg-secondary)' }}>
          Primitive colors are the foundational building blocks of a design system's color palette. 
          They serve as the base for more specific design decisions.
        </Text>
      </section>

      {/* Grayscale Neutrals */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--color-fg-primary)' }}>
          NEUTRALS
        </Heading>
        <div className="space-y-2 mt-6">
          {grayscaleNeutrals.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <div
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color.value }}
              />
              <div className="flex-1">
                <Text variant="small" weight="medium" style={{ color: 'var(--color-fg-primary)' }}>
                  {color.name}
                </Text>
              </div>
              <div
                className="w-16 h-16 rounded border"
                style={{ backgroundColor: color.value }}
              />
              <Text variant="small" style={{ color: 'var(--color-fg-tertiary)', fontFamily: 'monospace' }}>
                {color.value.toUpperCase()}
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* Blue Neutrals */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--color-fg-primary)' }}>
          NEUTRALS
        </Heading>
        <div className="space-y-2 mt-6">
          {blueNeutrals.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <div
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color.value }}
              />
              <div className="flex-1">
                <Text variant="small" weight="medium" style={{ color: 'var(--color-fg-primary)' }}>
                  {color.name}
                </Text>
              </div>
              <div
                className="w-16 h-16 rounded border"
                style={{ backgroundColor: color.value }}
              />
              <Text variant="small" style={{ color: 'var(--color-fg-tertiary)', fontFamily: 'monospace' }}>
                {color.value.toUpperCase()}
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* Green Neutrals */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--color-fg-primary)' }}>
          NEUTRALS
        </Heading>
        <div className="space-y-2 mt-6">
          {greenNeutrals.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <div
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color.value }}
              />
              <div className="flex-1">
                <Text variant="small" weight="medium" style={{ color: 'var(--color-fg-primary)' }}>
                  {color.name}
                </Text>
              </div>
              <div
                className="w-16 h-16 rounded border"
                style={{ backgroundColor: color.value }}
              />
              <Text variant="small" style={{ color: 'var(--color-fg-tertiary)', fontFamily: 'monospace' }}>
                {color.value.toUpperCase()}
              </Text>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
