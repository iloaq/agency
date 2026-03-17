// Portfolio case types for Directus

export type PortfolioCase = {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  order?: number;
  status: 'published' | 'draft';
};
