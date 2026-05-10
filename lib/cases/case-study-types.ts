/** Строка `public.case_studies` (PostgREST). JSONB приходят как unknown — парсим в UI. */
export type CaseStudyStack = {
  frontend?: string;
  backend?: string;
  database?: string;
  integrations?: string;
};

export type CaseStudyRow = {
  id: string;
  created_at: string;
  slug: string;
  title: string;
  sector: string | null;
  context: string | null;
  problems: unknown;
  goal: string | null;
  what_we_did: unknown;
  architecture_flow: string | null;
  stack: unknown;
  outcomes: unknown;
  conclusion: string | null;
  company_name_internal: string | null;
  published: boolean;
  sort_order: number;
};
