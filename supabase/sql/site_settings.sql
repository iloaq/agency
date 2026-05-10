-- Публичные контакты и бренд для сайта (одна строка).
-- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  updated_at timestamptz not null default now(),

  brand_name text not null,

  email text not null,

  phone_display text not null,

  phone_href text not null,

  -- Ожидаемый вид: { "telegram": "https://...", "linkedin": "https://..." }
  social jsonb not null default '{}'::jsonb,

  published boolean not null default false,

  constraint site_settings_brand_len check (char_length(btrim(brand_name)) between 1 and 200),
  constraint site_settings_email_len check (char_length(btrim(email)) between 3 and 320),
  constraint site_settings_phone_display_len check (char_length(btrim(phone_display)) between 3 and 80),
  constraint site_settings_phone_href_len check (char_length(btrim(phone_href)) between 6 and 120),
  constraint site_settings_social_is_object check (jsonb_typeof(social) = 'object')
);

comment on table public.site_settings is 'Контакты и бренд для шапки /contacts; черновик с published=false не виден анону.';

alter table public.site_settings enable row level security;

revoke all on public.site_settings from anon, authenticated;
grant usage on schema public to anon;
grant select on public.site_settings to anon, authenticated;

drop policy if exists "Public read published site settings" on public.site_settings;

create policy "Public read published site settings"
on public.site_settings
for select
to anon, authenticated
using (published = true);
