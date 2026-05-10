-- Case studies (кейсы) for site content; manage rows via Supabase Dashboard (service_role bypasses RLS).
-- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  slug text not null,
  title text not null,

  sector text,

  context text,

  problems jsonb not null default '[]'::jsonb,

  goal text,

  what_we_did jsonb not null default '[]'::jsonb,

  architecture_flow text,

  -- Expected shape: { "frontend": "...", "backend": "...", "database": "...", "integrations": "..." } (all keys optional)
  stack jsonb not null default '{}'::jsonb,

  outcomes jsonb not null default '[]'::jsonb,

  conclusion text,

  company_name_internal text,

  published boolean not null default false,

  sort_order integer not null default 0,

  constraint case_studies_slug_len check (char_length(btrim(slug)) between 1 and 200),
  constraint case_studies_title_len check (char_length(btrim(title)) between 1 and 500),
  constraint case_studies_problems_is_array check (jsonb_typeof(problems) = 'array'),
  constraint case_studies_what_we_did_is_array check (jsonb_typeof(what_we_did) = 'array'),
  constraint case_studies_stack_is_object check (jsonb_typeof(stack) = 'object'),
  constraint case_studies_outcomes_is_array check (jsonb_typeof(outcomes) = 'array')
);

create unique index if not exists case_studies_slug_key
on public.case_studies (slug);

create index if not exists case_studies_published_sort_idx
on public.case_studies (published desc, sort_order asc, created_at desc);

comment on table public.case_studies is 'Публичные кейсы: контент для /cases; черновики с published=false.';

comment on column public.case_studies.slug is 'URL-сегмент, уникальный идентификатор страницы кейса';
comment on column public.case_studies.title is 'Публичный заголовок, напр. «Автоматизация заявок для fintech-сервиса»';
comment on column public.case_studies.sector is 'Сфера / отрасль (напр. Fintech)';
comment on column public.case_studies.context is 'С чем пришли';
comment on column public.case_studies.problems is 'Список проблем (JSON-массив строк, порядок = нумерация)';
comment on column public.case_studies.goal is 'Цель проекта';
comment on column public.case_studies.what_we_did is 'Что сделали — массив строк (буллеты)';
comment on column public.case_studies.architecture_flow is 'Поток архитектуры одной строкой';
comment on column public.case_studies.stack is 'Стек: объект с ключами frontend, backend, database, integrations';
comment on column public.case_studies.outcomes is 'Что изменилось — JSON-массив строк';
comment on column public.case_studies.conclusion is 'Вывод';
comment on column public.case_studies.company_name_internal is 'Внутреннее имя клиента (не для публикации)';
comment on column public.case_studies.published is 'Показывать на сайте';
comment on column public.case_studies.sort_order is 'Порядок сортировки в списке (меньше — выше)';

alter table public.case_studies enable row level security;

revoke all on public.case_studies from anon, authenticated;
grant usage on schema public to anon;
grant select on public.case_studies to anon, authenticated;

drop policy if exists "Public read published case studies" on public.case_studies;

create policy "Public read published case studies"
on public.case_studies
for select
to anon, authenticated
using (published = true);
