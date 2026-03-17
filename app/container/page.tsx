// Container showcase page
'use client';

import { Heading, Text } from '@/shared/components/typography';
import { Container } from '@/shared/components/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import { useEffect } from 'react';

export default function ContainerPage() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'light') {
      root.style.setProperty('--current-scheme-text', 'var(--scheme-3-text)');
      root.style.setProperty('--current-scheme-background', 'var(--scheme-3-background)');
      root.style.setProperty('--current-scheme-foreground', 'var(--scheme-3-foreground)');
      root.style.setProperty('--current-scheme-border', 'var(--scheme-3-border)');
      root.style.setProperty('--current-scheme-accent', 'var(--scheme-3-accent)');
    } else {
      root.style.setProperty('--current-scheme-text', 'var(--scheme-2-text)');
      root.style.setProperty('--current-scheme-background', 'var(--scheme-2-background)');
      root.style.setProperty('--current-scheme-foreground', 'var(--scheme-2-foreground)');
      root.style.setProperty('--current-scheme-border', 'var(--scheme-2-border)');
      root.style.setProperty('--current-scheme-accent', 'var(--scheme-2-accent)');
    }
  }, [resolvedTheme]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--current-scheme-background)' }}>
      {/* Full width section */}
      <section className="py-16">
        <div className="border-b-2 border-dashed border-[var(--current-scheme-border)]">
          <Container>
            <Heading variant="h1" style={{ color: 'var(--current-scheme-text)' }}>
              Container System
            </Heading>
            <Text variant="medium" className="mt-4" style={{ color: 'var(--current-scheme-text)' }}>
              max-width: 1312px с автоматическим центрированием
            </Text>
          </Container>
        </div>
      </section>

      {/* Default container (1312px) */}
      <section className="py-16">
        <Container>
          <div className="p-8 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)]">
            <Heading variant="h2" style={{ color: 'var(--current-scheme-text)' }}>
              Default Container (1312px)
            </Heading>
            <Text variant="medium" className="mt-4" style={{ color: 'var(--current-scheme-text)' }}>
              Контент ограничен max-width: 1312px, автоматически центрирован
            </Text>
            <div className="mt-4 p-4 rounded bg-[var(--current-scheme-background)]">
              <Text variant="small" style={{ color: 'var(--current-scheme-text)', fontFamily: 'monospace' }}>
                max-width: 1312px
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Wide container (1600px) */}
      <section className="py-16">
        <Container size="wide">
          <div className="p-8 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)]">
            <Heading variant="h2" style={{ color: 'var(--current-scheme-text)' }}>
              Wide Container (1600px)
            </Heading>
            <Text variant="medium" className="mt-4" style={{ color: 'var(--current-scheme-text)' }}>
              Для широкого контента
            </Text>
            <div className="mt-4 p-4 rounded bg-[var(--current-scheme-background)]">
              <Text variant="small" style={{ color: 'var(--current-scheme-text)', fontFamily: 'monospace' }}>
                max-width: 1600px
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Narrow container (1024px) */}
      <section className="py-16">
        <Container size="narrow">
          <div className="p-8 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)]">
            <Heading variant="h2" style={{ color: 'var(--current-scheme-text)' }}>
              Narrow Container (1024px)
            </Heading>
            <Text variant="medium" className="mt-4" style={{ color: 'var(--current-scheme-text)' }}>
              Для узкого контента (статьи, формы)
            </Text>
            <div className="mt-4 p-4 rounded bg-[var(--current-scheme-background)]">
              <Text variant="small" style={{ color: 'var(--current-scheme-text)', fontFamily: 'monospace' }}>
                max-width: 1024px
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Full width section */}
      <section className="py-16">
        <Container size="full">
          <div className="p-8 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)]">
            <Heading variant="h2" style={{ color: 'var(--current-scheme-text)' }}>
              Full Width Container
            </Heading>
            <Text variant="medium" className="mt-4" style={{ color: 'var(--current-scheme-text)' }}>
              Растягивается на всю ширину экрана
            </Text>
            <div className="mt-4 p-4 rounded bg-[var(--current-scheme-background)]">
              <Text variant="small" style={{ color: 'var(--current-scheme-text)', fontFamily: 'monospace' }}>
                max-width: 100%
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Container without padding */}
      <section className="py-16">
        <Container padding={false}>
          <div className="p-8 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)]">
            <Heading variant="h2" style={{ color: 'var(--current-scheme-text)' }}>
              Container без padding
            </Heading>
            <Text variant="medium" className="mt-4" style={{ color: 'var(--current-scheme-text)' }}>
              padding={false} для полного контроля
            </Text>
          </div>
        </Container>
      </section>
    </div>
  );
}
