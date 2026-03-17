// Directus slides service
// Source: https://docs.directus.io/reference/sdk.html

import { readItems } from '@directus/sdk';
import { getDirectusClient } from './client';
import { cache } from '@/lib/cache/redis';
import type { SliderSlide } from '@/types/slider';

export async function getSlides(): Promise<SliderSlide[]> {
  // Check cache first
  const cached = await cache.get<SliderSlide[]>('hero-slides');
  if (cached) return cached;

  try {
    const directus = getDirectusClient();
    // Fetch from Directus
    const slides = await directus.request(
      readItems('hero_slides', {
        filter: {
          status: {
            _eq: 'published',
          },
        },
        sort: ['order'],
      })
    ) as SliderSlide[];

    // Cache for 1 hour
    await cache.set('hero-slides', slides, 3600);

    return slides;
  } catch (error) {
    console.error('Error fetching slides from Directus:', error);
    // Return fallback data
    return getFallbackSlides();
  }
}

function getFallbackSlides(): SliderSlide[] {
  return [
    {
      id: '1',
      title: 'АВТОМАТИЗИРУЙТЕ БИЗНЕС С ПОМОЩЬЮ ИНТЕЛЛЕКТУАЛЬНЫХ ТЕХНОЛОГИЙ',
      description: 'Мы создаем передовые решения на базе искусственного интеллекта, которые трансформируют workflow и ускоряют рост вашей компании.',
      background_color: '#F2F2F2',
      text_color: '#00090C',
      button_text: 'Запросить демо',
      button_link: '#',
      status: 'published',
      order: 1,
    },
  ];
}
