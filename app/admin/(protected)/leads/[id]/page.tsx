import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { AdminPageHeader, AdminPanel, AdminStatusBadge } from "@/components/admin/admin-ui";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { ServiceLeadAdminRow } from "@/lib/leads/service-lead-admin-types";

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Props = { params: Promise<{ id: string }> };

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  const normalized = value?.trim();

  return (
    <div className="rounded-[18px] border border-[#eee6dc] bg-[#fbfaf7] p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#77716a]">{label}</dt>
      <dd className="mt-2 min-w-0 break-words text-sm leading-6 text-[#111111]">{normalized || "—"}</dd>
    </div>
  );
}

export default async function AdminLeadDetailPage({ params }: Props) {
  const { id } = await params;
  if (!uuidRe.test(id)) notFound();

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from("service_leads").select("*").eq("id", id).maybeSingle();
  if (error || !data) notFound();

  const row = data as ServiceLeadAdminRow;
  const clientTitle = row.name || row.company || "Заявка";

  return (
    <div className="space-y-7">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d4aff] hover:text-[#4d32ce]"
      >
        <FiArrowLeft className="size-4" />
        К списку заявок
      </Link>

      <AdminPageHeader
        eyebrow="Заявка"
        title={clientTitle}
        description={`Создана ${formatDate(row.created_at)}. ID: ${row.id}`}
        action={<AdminStatusBadge status={row.status} />}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminPanel className="p-5">
          <h2 className="text-lg font-semibold tracking-tight">Контакт и контекст</h2>
          <dl className="mt-5 grid gap-3">
            <Field label="Имя" value={row.name} />
            <Field label="Компания" value={row.company} />
            <Field label="Email" value={row.email} />
            <Field label="Telegram" value={row.telegram} />
            <Field label="Предпочитаемый способ связи" value={row.preferred_contact} />
            {row.phone ? <Field label="Телефон из старой заявки" value={row.phone} /> : null}
          </dl>
        </AdminPanel>

        <AdminPanel className="p-5">
          <h2 className="text-lg font-semibold tracking-tight">Задача</h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Услуга" value={row.service_title} />
            <Field label="Slug" value={row.service_slug} />
            <Field label="Интерес к услуге" value={row.service_interest} />
            <Field label="Стадия проекта" value={row.project_stage} />
            <Field label="Бюджетный диапазон" value={row.budget_band} />
            <Field label="Страница-источник" value={row.source_page} />
          </dl>
        </AdminPanel>
      </div>

      <AdminPanel className="p-5">
        <h2 className="text-lg font-semibold tracking-tight">Сообщение</h2>
        <pre className="mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap break-words rounded-[22px] bg-[#18181b] p-5 font-sans text-sm leading-7 text-white/86">
          {row.message}
        </pre>
      </AdminPanel>

      <AdminPanel className="p-5">
        <h2 className="text-lg font-semibold tracking-tight">UTM и аналитика</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Field label="utm_source" value={row.utm_source} />
          <Field label="utm_medium" value={row.utm_medium} />
          <Field label="utm_campaign" value={row.utm_campaign} />
          <Field label="utm_content" value={row.utm_content} />
          <Field label="utm_term" value={row.utm_term} />
          <Field label="client_id" value={row.client_id} />
        </dl>
      </AdminPanel>
    </div>
  );
}
