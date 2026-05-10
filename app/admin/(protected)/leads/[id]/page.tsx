import Link from "next/link";
import { notFound } from "next/navigation";
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
  const v = value?.trim();
  return (
    <div className="grid gap-1 border-b border-slate-800 py-3 last:border-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="min-w-0 break-words text-sm text-slate-200">{v ? v : "—"}</dd>
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

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-500">
        <Link href="/admin/leads" className="text-violet-400 hover:text-violet-300 hover:underline">
          Лиды
        </Link>
        <span className="mx-2 text-slate-600">/</span>
        <span className="font-mono text-xs text-slate-400">{row.id.slice(0, 8)}…</span>
      </nav>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Заявка</h1>
        <p className="mt-1 text-sm text-slate-400">{formatDate(row.created_at)}</p>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-slate-900/50 px-4 sm:px-6">
        <dl>
          <Field label="Статус" value={row.status} />
          <Field label="Услуга (slug)" value={row.service_slug} />
          <Field label="Услуга (название)" value={row.service_title} />
          <Field label="Имя" value={row.name} />
          <Field label="Email" value={row.email} />
          <Field label="Телефон" value={row.phone} />
          <Field label="Telegram" value={row.telegram} />
          <Field label="Предпочитаемая связь" value={row.preferred_contact} />
          <Field label="Компания" value={row.company} />
          <Field label="Интерес к услуге" value={row.service_interest} />
          <Field label="Стадия проекта" value={row.project_stage} />
          <Field label="Бюджет" value={row.budget_band} />
          <Field label="Страница источника" value={row.source_page} />
          <Field label="utm_source" value={row.utm_source} />
          <Field label="utm_medium" value={row.utm_medium} />
          <Field label="utm_campaign" value={row.utm_campaign} />
          <Field label="utm_content" value={row.utm_content} />
          <Field label="utm_term" value={row.utm_term} />
          <Field label="client_id" value={row.client_id} />
        </dl>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-slate-900/50 p-4 sm:p-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Сообщение</h2>
        <pre className="max-h-[480px] overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-200">
          {row.message}
        </pre>
      </div>
    </div>
  );
}
