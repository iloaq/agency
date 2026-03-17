// Portfolio section component
// Source: https://nextjs.org/docs/app/building-your-application/styling/css-modules

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heading, Text } from '@/shared/components/typography';
import { Button, Container, Tag } from '@/shared/components/ui';
import { Icon } from '@/shared/components/ui/Icon';
import { MdArrowForward } from '@/shared/lib/icons';
import type { PortfolioCase } from '@/types/portfolio';

export function Portfolio() {
  const [cases, setCases] = useState<PortfolioCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cases from API
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCases(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching portfolio cases:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fallback if no cases
  const defaultCases: PortfolioCase[] = [
    {
      id: '1',
      title: 'УМНЫЙ ЧАТ-БОТ',
      description: 'Автоматизация коммуникаций для технологического стартапа с увеличением конверсии на 40%',
      tags: ['ИИ', 'Машинное обучение', 'Автоматизация'],
      link: '#',
      status: 'published',
    },
    {
      id: '2',
      title: 'ПЛАТФОРМА ЭЛЕКТРОННОЙ КОММЕРЦИИ',
      description: 'Разработка масштабируемого решения для международного онлайн-ритейла',
      tags: ['Веб', 'Разработка', 'Дизайн'],
      link: '#',
      status: 'published',
    },
    {
      id: '3',
      title: 'ЦИФРОВАЯ ТРАНСФОРМАЦИЯ БАНКА',
      description: 'Комплексное решение для оптимизации финансовых процессов и клиентского сервиса',
      tags: ['Финтех', 'Автоматизация', 'Стратегия'],
      link: '#',
      status: 'published',
    },
  ];

  const displayCases = cases.length > 0 ? cases : defaultCases;

  return (
    <section 
      className="py-16 lg:py-24"
    >
      <Container size="default">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Text 
            variant="regular" 
            style={{ color: 'var(--current-scheme-text)' }}
            className="mb-4"
          >
            Портфолио
          </Text>
          <Heading 
            variant="h1" 
            style={{ color: 'var(--current-scheme-text)' }}
            className="mb-4"
          >
            НАШИ УСПЕШНЫЕ ПРОЕКТЫ
          </Heading>
          <Text 
            variant="medium" 
            style={{ color: 'var(--current-scheme-text)' }}
            className="max-w-2xl mx-auto"
          >
            Истории трансформации бизнеса с помощью передовых технологий
          </Text>
        </div>

        {/* Cases Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {displayCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex flex-col"
              >
                {/* Case Card */}
                <div
                  className="flex flex-col rounded-lg overflow-hidden"
                >
                  {/* Image */}
                  <div
                    className="w-full aspect-video flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--current-scheme-background)',
                    }}
                  >
                    {caseItem.image ? (
                      <img
                        src={caseItem.image}
                        alt={caseItem.title}
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

                  {/* Content */}
                  <div className="flex flex-col flex-1 pt-6">
                    {/* Title */}
                    <Heading
                      variant="h4"
                      style={{ color: 'var(--current-scheme-text)' }}
                      className="mb-3"
                    >
                      {caseItem.title}
                    </Heading>

                    {/* Description */}
                    <Text
                      variant="regular"
                      style={{ color: 'var(--current-scheme-text)' }}
                      className="mb-4 flex-1"
                    >
                      {caseItem.description}
                    </Text>

                    {/* Tags */}
                    {caseItem.tags && caseItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caseItem.tags.map((tag, tagIndex) => (
                          <Tag
                            key={tagIndex}
                            onRemove={undefined}
                            className="text-small"
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}

                    {/* Link */}
                    {caseItem.link && (
                      <a
                        href={caseItem.link}
                        className="flex items-center gap-2 text-medium hover:opacity-80 transition-opacity w-fit"
                        style={{ color: 'var(--current-scheme-text)' }}
                      >
                        <span>Смотреть проект</span>
                        <Icon icon={MdArrowForward} size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
          <Button variant="secondary" size="default">
            Смотреть кейс
          </Button>
        </div>
      </Container>
    </section>
  );
}
