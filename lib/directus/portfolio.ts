// Directus portfolio service
// Source: https://docs.directus.io/reference/sdk.html

import { readItems } from '@directus/sdk';
import { getDirectusClient } from './client';
import { cache } from '@/lib/cache/redis';
import type { PortfolioCase } from '@/types/portfolio';

export async function getPortfolioCases(): Promise<PortfolioCase[]> {
  // Check cache first
  const cached = await cache.get<PortfolioCase[]>('portfolio-cases');
  if (cached) return cached;

  try {
    const directus = getDirectusClient();
    // Fetch from Directus
    const cases = await directus.request(
      readItems('portfolio_cases', {
        filter: {
          status: {
            _eq: 'published',
          },
        },
        sort: ['order'],
      })
    ) as PortfolioCase[];

    // Cache for 1 hour
    await cache.set('portfolio-cases', cases, 3600);

    return cases;
  } catch (error) {
    console.error('Error fetching portfolio cases from Directus:', error);
    // Return fallback data
    return getFallbackCases();
  }
}

function getFallbackCases(): PortfolioCase[] {
  return [
    {
      id: '1',
      title: 'УМНЫЙ ЧАТ-БОТ',
      description: 'Автоматизация коммуникаций для технологического стартапа с увеличением конверсии на 40%',
      tags: ['ИИ', 'Машинное обучение', 'Автоматизация'],
      link: '#',
      status: 'published',
      order: 1,
    },
    {
      id: '2',
      title: 'ПЛАТФОРМА ЭЛЕКТРОННОЙ КОММЕРЦИИ',
      description: 'Разработка масштабируемого решения для международного онлайн-ритейла',
      tags: ['Веб', 'Разработка', 'Дизайн'],
      link: '#',
      status: 'published',
      order: 2,
    },
    {
      id: '3',
      title: 'ЦИФРОВАЯ ТРАНСФОРМАЦИЯ БАНКА',
      description: 'Комплексное решение для оптимизации финансовых процессов и клиентского сервиса',
      tags: ['Финтех', 'Автоматизация', 'Стратегия'],
      link: '#',
      status: 'published',
      order: 3,
    },
  ];
}
