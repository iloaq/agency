// About section component
// Source: https://nextjs.org/docs/app/building-your-application/styling/css-modules

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heading, Text } from '@/shared/components/typography';
import { Button, Container } from '@/shared/components/ui';
import { Icon } from '@/shared/components/ui/Icon';
import { MdArrowForward } from '@/shared/lib/icons';
import type { AboutSection } from '@/types/about';

export function About() {
  const [section, setSection] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch about section from API
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSection(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching about section:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fallback if no section
  const defaultSection: AboutSection = {
    id: '1',
    label: 'О нас',
    title: 'КОМАНДА ТЕХНОЛОГИЧЕСКИХ ВИЗИОНЕРОВ',
    description: 'Мы объединяем экспертов из разных областей для создания revolutionary решений. Наша цель – трансформировать бизнес-ландшафт с помощью интеллектуальных технологий.',
    button_text: 'Узнать больше',
    button_link: '#',
    link_text: 'Наша история',
    link_url: '#',
    status: 'published',
  };

  const displaySection = section || defaultSection;

  if (loading) return null;

  return (
    <section 
      className="py-16 lg:py-24"
      style={{ backgroundColor: 'var(--current-scheme-background)' }}
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Large Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div
              className="w-full aspect-[4/5] rounded-lg overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: 'var(--current-scheme-foreground)',
              }}
            >
              {displaySection.image_large ? (
                <img
                  src={displaySection.image_large}
                  alt={displaySection.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: 'var(--current-scheme-text)' }}
                  className="opacity-30"
                >
                  <path
                    d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L22 16M2 20H22C23.1046 20 24 19.1046 24 18V6C24 4.89543 23.1046 4 22 4H2C0.89543 4 0 4.89543 0 6V18C0 19.1046 0.89543 20 2 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* Top Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Label */}
              {displaySection.label && (
                <Text 
                  variant="regular" 
                  style={{ color: 'var(--current-scheme-text)' }}
                >
                  {displaySection.label}
                </Text>
              )}

              {/* Title */}
              <Heading 
                variant="h1" 
                style={{ color: 'var(--current-scheme-text)' }}
                className="uppercase"
              >
                {displaySection.title}
              </Heading>

              {/* Description */}
              <Text 
                variant="large" 
                style={{ color: 'var(--current-scheme-text)' }}
              >
                {displaySection.description}
              </Text>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {displaySection.button_text && displaySection.button_link && (
                  <Button variant="primary" size="default">
                    {displaySection.button_text}
                  </Button>
                )}
                
                {displaySection.link_text && displaySection.link_url && (
                  <a
                    href={displaySection.link_url}
                    className="flex items-center gap-2 text-medium hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--current-scheme-text)' }}
                  >
                    <span>{displaySection.link_text}</span>
                    <Icon icon={MdArrowForward} size={16} />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Bottom Section: Small Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-2/3 ml-auto"
            >
              <div
                className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--current-scheme-foreground)',
                }}
              >
                {displaySection.image_small ? (
                  <img
                    src={displaySection.image_small}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'var(--current-scheme-text)' }}
                    className="opacity-30"
                  >
                    <path
                      d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L22 16M2 20H22C23.1046 20 24 19.1046 24 18V6C24 4.89543 23.1046 4 22 4H2C0.89543 4 0 4.89543 0 6V18C0 19.1046 0.89543 20 2 20Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
