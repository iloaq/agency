alter table public.service_leads
add column if not exists service_interest text,
add column if not exists project_stage text,
add column if not exists budget_band text;
