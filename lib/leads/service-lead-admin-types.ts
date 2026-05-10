/** Row from `service_leads` for the admin area. Read server-side through the service role helper. */
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
  /** Available after the `service_leads_preferred_contact.sql` migration. */
  preferred_contact?: string | null;
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
