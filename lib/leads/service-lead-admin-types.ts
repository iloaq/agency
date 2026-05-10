/** Строка `service_leads` для админки (чтение через service role). */
export type ServiceLeadAdminRow = {
  id: string;
  created_at: string;
  service_slug: string;
  service_title: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  telegram: string | null;
  company: string | null;
  service_interest: string | null;
  project_stage: string | null;
  budget_band: string | null;
  preferred_contact: string | null;
  message: string;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  client_id: string | null;
  status: string;
};
