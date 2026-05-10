create table if not exists public.service_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service_slug text not null,
  service_title text not null,
  name text,
  phone text,
  email text,
  telegram text,
  company text,
  service_interest text,
  project_stage text,
  budget_band text,
  message text not null,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  client_id text,
  status text not null default 'new'
);

create index if not exists service_leads_created_at_idx
on public.service_leads (created_at desc);

create index if not exists service_leads_service_slug_idx
on public.service_leads (service_slug);

create index if not exists service_leads_status_idx
on public.service_leads (status);

alter table public.service_leads enable row level security;

revoke all on public.service_leads from anon, authenticated;
grant usage on schema public to anon;
grant insert on public.service_leads to anon;

drop policy if exists "Allow public lead insert" on public.service_leads;

create policy "Allow public lead insert"
on public.service_leads
for insert
to anon
with check (
  status = 'new'
  and char_length(btrim(service_slug)) between 2 and 120
  and char_length(btrim(service_title)) between 2 and 180
  and char_length(btrim(message)) between 10 and 3000
  and coalesce(
    nullif(btrim(coalesce(phone, '')), ''),
    nullif(btrim(coalesce(email, '')), ''),
    nullif(btrim(coalesce(telegram, '')), '')
  ) is not null
);
