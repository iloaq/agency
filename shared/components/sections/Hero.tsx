// Hero section component with static background video

'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heading, Text } from '@/shared/components/typography';
import { Button, Container } from '@/shared/components/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import { Icon } from '@/shared/components/ui/Icon';
import { MdEmail, MdPhone } from '@/shared/lib/icons';

export function Hero() {
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
    <section 
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--current-scheme-background)' }}
    >
      {/* Background Video - Center - Static */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            backgroundColor: 'var(--current-scheme-foreground)',
          }}
        >
          {/* Video placeholder / animated background */}
          <div className="relative w-full h-full">
            {/* Animated abstract background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, var(--color-Cerulean) 0%, transparent 70%)',
                }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, var(--color-Bright-Turquoise) 0%, transparent 70%)',
                }}
                animate={{
                  x: [0, -100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Rotating center element */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-32 h-32 rounded-full border-2"
                style={{
                  borderColor: 'var(--current-scheme-accent)',
                  borderStyle: 'dashed',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.div
                  className="absolute inset-4 rounded-full border-2"
                  style={{
                    borderColor: 'var(--current-scheme-accent)',
                    borderStyle: 'dashed',
                  }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Section: Text Left Bottom, Icons Right Bottom */}
        <div className="flex-1 flex items-end pb-16 lg:pb-24">
          <Container size="full" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Text at bottom */}
              <div className="flex items-end">
                <Heading variant="display" style={{ color: 'var(--current-scheme-text)' }}>
                  Автоматизируйте бизнес с помощью интеллектуальных технологий
                </Heading>
              </div>

              {/* Right: Contact Icons at bottom */}
              <div className="flex items-end justify-end lg:justify-start">
                <div className="flex flex-col gap-6">
                  <a
                    href="mailto:hello@skybric.ru"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--current-scheme-text)' }}
                  >
                    <Icon icon={MdEmail} size={24} />
                    <Text variant="large" style={{ color: 'var(--current-scheme-text)' }}>
                      hello@skybric.ru
                    </Text>
                  </a>
                  <a
                    href="tel:+77773365602"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--current-scheme-text)' }}
                  >
                    <Icon icon={MdPhone} size={24} />
                    <Text variant="large" style={{ color: 'var(--current-scheme-text)' }}>
                      +7(777)336-56-02
                    </Text>
                  </a>
                  <a
                    href="https://t.me/skybricagency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--current-scheme-text)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                    <Text variant="large" style={{ color: 'var(--current-scheme-text)' }}>
                      @skybricagency
                    </Text>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Bottom Section: Stats, Contacts, Description */}
        <Container size="full" className="pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Stats */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="heading-1" style={{ color: 'var(--current-scheme-text)' }}>1</div>
                <Text variant="large" style={{ color: 'var(--current-scheme-text)' }}>
                  место
                </Text>
                <Text variant="regular" style={{ color: 'var(--current-scheme-text)' }}>
                  самый награждаемый разработчик сайтов
                </Text>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <Text variant="medium" weight="semibold" style={{ color: 'var(--current-scheme-text)' }}>
                    38 отзывов за год
                  </Text>
                  <div className="flex gap-2 mt-2">
                    <span className="text-small" style={{ color: 'var(--current-scheme-text)' }}>Kwork</span>
                    <span className="text-small" style={{ color: 'var(--current-scheme-text)' }}>•</span>
                    <span className="text-small" style={{ color: 'var(--current-scheme-text)' }}>Upwork</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Description */}
            <div className="flex flex-col gap-4">
              <Text variant="regular" style={{ color: 'var(--current-scheme-text)' }}>
                SKybric — агентство с фокусом на сильную аналитику, дизайн и разработку. В основе наших проектов лежат идеи, создаваемые на стыке стратегии, креатива и технологий.
              </Text>
              <div className="flex gap-2 mt-4">
                <Button variant="secondary" size="default" className="text-small">
                  PDF
                </Button>
                <Button variant="secondary" size="default" className="text-small">
                  Pitch
                </Button>
                <Text variant="small" style={{ color: 'var(--current-scheme-text)' }} className="flex items-center">
                  презентация компании
                </Text>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col justify-end">
              <Button variant="primary" size="default" className="w-full lg:w-auto">
                Начать проект
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
