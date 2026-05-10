export type ServiceLeadPayload = {
  service_slug: string;
  service_title: string;
  name?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  company?: string;
  service_interest?: string;
  project_stage?: string;
  budget_band?: string;
  /** email | telegram — как удобнее связаться первым */
  preferred_contact?: string;
  message: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  client_id?: string;
  website?: string;
};

export type LeadSubmitResult =
  | { ok: true }
  | { ok: false; message: string };
