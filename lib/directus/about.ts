// Directus about service
// Source: https://docs.directus.io/reference/sdk.html

import { readItems } from '@directus/sdk';
import { getDirectusClient } from './client';
import { cache } from '@/lib/cache/redis';
import type { AboutSection } from '@/types/about';

export async function getAboutSection(): Promise<AboutSection | null> {
  // Check cache first
  const cached = await cache.get<AboutSection>('about-section');
  if (cached) return cached;

  try {
    const directus = getDirectusClient();
    // Fetch from Directus
    const sections = await directus.request(
      readItems('about_sections', {
        filter: {
          status: {
            _eq: 'published',
          },
        },
        sort: ['order'],
        limit: 1,
      })
    ) as AboutSection[];

    const section = sections[0] || null;

    // Cache for 1 hour
    if (section) {
      await cache.set('about-section', section, 3600);
    }

    return section;
  } catch (error) {
    console.error('Error fetching about section from Directus:', error);
    // Return fallback data
    return getFallbackSection();
  }
}

function getFallbackSection(): AboutSection {
  return {
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
}
