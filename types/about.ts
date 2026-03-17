// About section types for Directus

export type AboutSection = {
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
  status: 'published' | 'draft';
};
