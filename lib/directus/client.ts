// Source: https://docs.directus.io/reference/sdk.html
import { createDirectus, rest, staticToken } from '@directus/sdk';
import { getEnv, requireEnv } from '@/lib/config/env';

export type DirectusSchema = {
  hero_slides: Array<{
    id: string;
    title: string;
    description?: string;
    background_image?: string;
    background_color?: string;
    text_color?: string;
    button_text?: string;
    button_link?: string;
    animated_elements?: Array<{
      id: string;
      type: string;
      content: string;
      position_x: number;
      position_y: number;
      animation_delay: number;
      animation_type: string;
    }>;
    order?: number;
    status: string;
  }>;
  portfolio_cases: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
    tags?: string[];
    link?: string;
    order?: number;
    status: string;
  }>;
  about_sections: Array<{
    id: string;
    label?: string;
    title: string;
    description: string;
    button_text?: string;
    button_link?: string;
    link_text?: string;
    link_url?: string;
    image_large?: string;
    image_small?: string;
    order?: number;
    status: string;
  }>;
};

function createClient() {
  const env = getEnv();
  const url = requireEnv('DIRECTUS_URL');

  const base = createDirectus<DirectusSchema>(url).with(rest());
  const token = env.DIRECTUS_STATIC_TOKEN || env.DIRECTUS_TOKEN;
  return token ? base.with(staticToken(token)) : base;
}

type DirectusClient = ReturnType<typeof createClient>;

let cachedClient: DirectusClient | null = null;

export function getDirectusClient() {
  if (cachedClient) return cachedClient;

  cachedClient = createClient();
  return cachedClient;
}
