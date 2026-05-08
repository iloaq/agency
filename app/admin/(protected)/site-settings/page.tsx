import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { SiteSettingsRow } from "@/lib/supabase/fetch-site-settings";
import { SiteSettingsForm } from "./site-settings-form";

type Props = { searchParams: Promise<{ err?: string; saved?: string }> };

export default async function AdminSiteSettingsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("id, brand_name, email, phone_display, phone_href, social, published")
    .eq("id", 1)
    .maybeSingle();

  const row = (error ? null : data) as SiteSettingsRow | null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Настройки сайта</h1>
      <p className="max-w-xl text-sm text-[var(--fonts-grey)]">
        Одна строка <code className="rounded bg-[var(--bg-quaternary)] px-1">id = 1</code>. Если таблица пуста,
        сохранение создаст строку (см. seed в репозитории).
      </p>
      {error ? (
        <p className="text-sm text-[var(--fonts-error)]">Ошибка загрузки: {error.message}</p>
      ) : null}
      {sp.saved === "1" ? (
        <p className="text-sm text-[var(--fonts-success)]">Сохранено.</p>
      ) : null}
      {sp.err === "badjson" ? (
        <p className="text-sm text-[var(--fonts-error)]">Social должен быть JSON-объектом.</p>
      ) : null}
      {sp.err === "required" ? (
        <p className="text-sm text-[var(--fonts-error)]">Заполните обязательные поля.</p>
      ) : null}
      {sp.err === "db" ? (
        <p className="text-sm text-[var(--fonts-error)]">Ошибка записи в Supabase.</p>
      ) : null}
      <SiteSettingsForm row={row} />
    </div>
  );
}
