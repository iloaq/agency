// Color Schemes showcase page
'use client';

import { Heading, Text } from '@/shared/components/typography';

export default function ColorSchemesPage() {
  const schemes = [
    {
      id: 1,
      name: 'Color Scheme 1',
      text: { label: 'Color/White', value: 'var(--scheme-1-text)' },
      background: { label: 'Color/Neutral Darker', value: 'var(--scheme-1-background)' },
      foreground: { label: 'Color/Neutral Darkest', value: 'var(--scheme-1-foreground)' },
      border: { label: 'Opacity/White 20', value: 'var(--scheme-1-border)' },
      accent: { label: 'Color/White', value: 'var(--scheme-1-accent)' },
    },
    {
      id: 2,
      name: 'Color Scheme 2',
      text: { label: 'Color/White', value: 'var(--scheme-2-text)' },
      background: { label: 'Color/Neutral Darkest', value: 'var(--scheme-2-background)' },
      foreground: { label: 'Color/Neutral Darker', value: 'var(--scheme-2-foreground)' },
      border: { label: 'Opacity/White 20', value: 'var(--scheme-2-border)' },
      accent: { label: 'Color/White', value: 'var(--scheme-2-accent)' },
    },
    {
      id: 3,
      name: 'Color Scheme 3',
      text: { label: 'Color/Neutral Darkest', value: 'var(--scheme-3-text)' },
      background: { label: 'Color/Neutral Lightest', value: 'var(--scheme-3-background)' },
      foreground: { label: 'Color/White', value: 'var(--scheme-3-foreground)' },
      border: { label: 'Opacity/Neutral Darkest 15', value: 'var(--scheme-3-border)' },
      accent: { label: 'Color/Neutral Darkest', value: 'var(--scheme-3-accent)' },
    },
  ];

  return (
    <div className="p-8 space-y-12" style={{ backgroundColor: 'var(--color-neutral-darkest)' }}>
      <section>
        <Heading variant="h1" style={{ color: 'var(--color-white)' }}>
          COLOR SCHEMES
        </Heading>
        <Text variant="medium" className="mt-4" style={{ color: 'var(--color-white)' }}>
          Easily manage colors of your website with global color schemes—use variables to quickly style sections.
        </Text>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="space-y-6">
            {/* Color Scheme Controls */}
            <div>
              <Heading variant="h2" style={{ color: 'var(--color-white)', marginBottom: '1.5rem' }}>
                {scheme.name}
              </Heading>
              
              <div className="space-y-3">
                {/* Text */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-darker)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">Aa</span>
                    <Text variant="small" style={{ color: 'var(--color-white)' }}>
                      Text
                    </Text>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-8 rounded border"
                      style={{ backgroundColor: scheme.text.value }}
                    />
                    <Text variant="small" style={{ color: 'var(--color-white)', fontFamily: 'monospace' }}>
                      {scheme.text.label}
                    </Text>
                  </div>
                </div>

                {/* Background */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-darker)' }}>
                  <Text variant="small" style={{ color: 'var(--color-white)' }}>
                    Background
                  </Text>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-8 rounded border"
                      style={{ backgroundColor: scheme.background.value }}
                    />
                    <Text variant="small" style={{ color: 'var(--color-white)', fontFamily: 'monospace' }}>
                      {scheme.background.label}
                    </Text>
                  </div>
                </div>

                {/* Foreground */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-darker)' }}>
                  <Text variant="small" style={{ color: 'var(--color-white)' }}>
                    Foreground
                  </Text>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-8 rounded border"
                      style={{ backgroundColor: scheme.foreground.value }}
                    />
                    <Text variant="small" style={{ color: 'var(--color-white)', fontFamily: 'monospace' }}>
                      {scheme.foreground.label}
                    </Text>
                  </div>
                </div>

                {/* Border */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-darker)' }}>
                  <Text variant="small" style={{ color: 'var(--color-white)' }}>
                    Border
                  </Text>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-8 rounded border"
                      style={{ backgroundColor: scheme.border.value }}
                    />
                    <Text variant="small" style={{ color: 'var(--color-white)', fontFamily: 'monospace' }}>
                      {scheme.border.label}
                    </Text>
                  </div>
                </div>

                {/* Accent */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-darker)' }}>
                  <Text variant="small" style={{ color: 'var(--color-white)' }}>
                    Accent
                  </Text>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-8 rounded border"
                      style={{ backgroundColor: scheme.accent.value }}
                    />
                    <Text variant="small" style={{ color: 'var(--color-white)', fontFamily: 'monospace' }}>
                      {scheme.accent.label}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheme Preview */}
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: scheme.background.value,
                borderColor: scheme.border.value,
              }}
            >
              <Heading variant="h3" style={{ color: scheme.text.value, marginBottom: '1rem' }}>
                SCHEME PREVIEW
              </Heading>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xl"
                    style={{ color: scheme.accent.value }}
                  >
                    •
                  </span>
                  <Text variant="small" style={{ color: scheme.text.value }}>
                    Accent color
                  </Text>
                </div>
                
                <div
                  className="p-4 rounded border"
                  style={{
                    backgroundColor: scheme.foreground.value,
                    borderColor: scheme.border.value,
                  }}
                >
                  <Text variant="small" style={{ color: scheme.text.value }}>
                    Foreground color
                  </Text>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
