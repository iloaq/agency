import { AdminPageHeader } from "@/components/admin/admin-ui";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { SiteSettingsRow } from "@/lib/supabase/fetch-site-settings";
import { SiteSettingsForm } from "./site-settings-form";

type Props = { searchParams: Promise<{ err?: string; saved?: string }> };

function Feedback({ saved, err }: { saved?: string; err?: string }) {
  if (saved === "1") {
    return <p className="rounded-[18px] border border-[#cceec8] bg-[#f1ffed] px-4 py-3 text-sm font-medium text-[#245b20]">Сохранено.</p>;
  }
  if (!err) return null;

  const message =
    err === "badjson"
      ? "Social должен быть корректным JSON-объектом."
      : err === "required"
        ? "Заполните обязательные поля."
        : "Ошибка записи в Supabase.";

  return <p className="rounded-[18px] border border-[#f5c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#b42318]">{message}</p>;
}

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
    <div className="space-y-7">
      <AdminPageHeader
        eyebrow="Сайт"
        title="Настройки"
        description="Одна строка site_settings с контактами и базовой конфигурацией сайта. Если строка отсутствует, сохранение создаст её."
      />

      {error ? (
        <p className="rounded-[18px] border border-[#f5c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#b42318]">
          Ошибка загрузки настроек: {error.message}
        </p>
      ) : null}

      <Feedback saved={sp.saved} err={sp.err} />
      <SiteSettingsForm row={row} />
    </div>
  );
}
