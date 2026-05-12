-- Изображение схемы потока в hero кейса (справа от заголовка).
-- Source: https://supabase.com/docs/guides/database/tables

alter table public.case_studies
  add column if not exists architecture_flow_image_url text;

comment on column public.case_studies.architecture_flow_image_url is
  'Публичный HTTPS-URL картинки (Storage/CDN). Если задан — в hero показывается изображение вместо текстового «Маршрут проекта».';
