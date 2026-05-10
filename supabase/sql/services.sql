-- Услуги: SEO-колонки + JSONB с телом страницы (как в статическом ServiceData).
-- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  slug text not null,
  title text not null,
  short_description text not null,
  path text not null,

  seo_title text not null,
  seo_description text not null,

  published boolean not null default false,

  sort_order integer not null default 0,

  -- Поля hero, pains, faq и т.д. (всё кроме slug, path, title, shortDescription, seoTitle, seoDescription)
  content jsonb not null default '{}'::jsonb,

  constraint services_slug_len check (char_length(btrim(slug)) between 1 and 200),
  constraint services_title_len check (char_length(btrim(title)) between 1 and 500),
  constraint services_path_len check (char_length(btrim(path)) between 1 and 500),
  constraint services_content_is_object check (jsonb_typeof(content) = 'object')
);

create unique index if not exists services_slug_key
on public.services (slug);

create index if not exists services_published_sort_idx
on public.services (published desc, sort_order asc, created_at desc);

comment on table public.services is 'Контент услуг для /services и /services/[slug]; черновики с published=false.';

alter table public.services enable row level security;

revoke all on public.services from anon, authenticated;
grant usage on schema public to anon;
grant select on public.services to anon, authenticated;

drop policy if exists "Public read published services" on public.services;

create policy "Public read published services"
on public.services
for select
to anon, authenticated
using (published = true);
