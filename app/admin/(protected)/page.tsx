import Link from "next/link";
import { FiArrowUpRight, FiBriefcase, FiInbox, FiLayers, FiSettings } from "react-icons/fi";
import {
  AdminEmptyState,
  AdminMetricCard,
  AdminPageHeader,
  AdminPanel,
  AdminStatusBadge,
} from "@/components/admin/admin-ui";
import { getAdminOverviewStats } from "@/lib/admin/admin-overview-stats";
import { isSupabaseAdminConfigured } from "@/lib/admin/env";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { ServiceLeadAdminRow } from "@/lib/leads/service-lead-admin-types";

type RecentLead = Pick<
  ServiceLeadAdminRow,
  "id" | "created_at" | "service_title" | "name" | "email" | "telegram" | "company" | "status"
>;

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

async function getRecentLeads(): Promise<RecentLead[]> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("service_leads")
      .select("id, created_at, service_title, name, email, telegram, company, status")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error || !data) return [];
    return data as RecentLead[];
  } catch {
    return [];
  }
}

const quickActions = [
  {
    href: "/admin/leads",
    title: "Разобрать заявки",
    text: "Новые обращения, источник, услуга и контакт клиента.",
    icon: FiInbox,
  },
  {
    href: "/admin/services",
    title: "Обновить услуги",
    text: "Карточки услуг, SEO, публикация и порядок вывода.",
    icon: FiLayers,
  },
  {
    href: "/admin/cases",
    title: "Вести проекты",
    text: "Разборы задач без фейковых метрик и лишней рекламы.",
    icon: FiBriefcase,
  },
  {
    href: "/admin/site-settings",
    title: "Настройки сайта",
    text: "Контакты, бренд и опубликованная конфигурация.",
    icon: FiSettings,
  },
];

export default async function AdminHomePage() {
  const adminDbConfigured = isSupabaseAdminConfigured();
  const [stats, recentLeads] = await Promise.all([getAdminOverviewStats(), getRecentLeads()]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Панель управления"
        title="Дашборд"
        description="Короткий обзор заявок и контента сайта. Здесь видно, что нужно обработать первым."
        action={
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 rounded-full bg-[#18181b] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black"
          >
            Открыть заявки
            <FiArrowUpRight className="size-4" />
          </Link>
        }
      />

      {stats ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminMetricCard label="Заявки всего" value={stats.leadsTotal} hint="Все записи service_leads" tone="dark" />
          <AdminMetricCard label="Новые заявки" value={stats.leadsNew} hint="status = new" tone="accent" />
          <AdminMetricCard label="Проекты" value={stats.casesTotal} hint="Разборы задач" />
          <AdminMetricCard label="Услуги" value={stats.servicesTotal} hint="Страницы и карточки" />
        </section>
      ) : (
        <AdminPanel className="p-5">
          <p className="text-sm leading-6 text-[#7a5a00]">
            {adminDbConfigured ? (
              <>Не удалось запросить метрики в Supabase. Проверьте сеть, ключ и наличие таблиц.</>
            ) : (
              <>
                Не удалось загрузить метрики: задайте{" "}
                <code className="rounded bg-[#f3eee3] px-1.5 py-0.5 font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
                и URL проекта —{" "}
                <code className="rounded bg-[#f3eee3] px-1.5 py-0.5 font-mono text-xs">SUPABASE_URL</code> или{" "}
                <code className="rounded bg-[#f3eee3] px-1.5 py-0.5 font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
                (достаточно одного из двух).
              </>
            )}
          </p>
        </AdminPanel>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminPanel className="overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-[#eee6dc] px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Последние заявки</h2>
              <p className="mt-1 text-sm text-[#6b6b6b]">Свежие обращения из форм сайта.</p>
            </div>
            <Link href="/admin/leads" className="text-sm font-semibold text-[#6d4aff] hover:text-[#4d32ce]">
              Все заявки
            </Link>
          </div>

          {recentLeads.length > 0 ? (
            <div className="divide-y divide-[#eee6dc]">
              {recentLeads.map((lead) => {
                const contact = lead.email || lead.telegram || "контакт не указан";
                return (
                  <Link
                    key={lead.id}
                    href={`/admin/leads/${lead.id}`}
                    className="grid gap-3 px-5 py-4 transition hover:bg-[#fbfaf7] sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold text-[#111111]">{lead.name || lead.company || "Новая заявка"}</p>
                        <AdminStatusBadge status={lead.status} />
                      </div>
                      <p className="mt-1 truncate text-sm text-[#6b6b6b]">{lead.service_title}</p>
                      <p className="mt-1 truncate font-mono text-xs text-[#8a8177]">{contact}</p>
                    </div>
                    <p className="text-sm text-[#6b6b6b]">{formatDate(lead.created_at)}</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-5">
              <AdminEmptyState title="Заявок пока нет" description="Когда форма отправит лид, он появится в этом списке." />
            </div>
          )}
        </AdminPanel>

        <AdminPanel className="p-5">
          <h2 className="text-lg font-semibold tracking-tight">Быстрые действия</h2>
          <div className="mt-5 grid gap-3">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 rounded-[22px] border border-[#eee6dc] bg-[#fbfaf7] p-4 transition hover:border-[#d8cbed] hover:bg-white"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#6d4aff] shadow-sm">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-[#111111] group-hover:text-[#6d4aff]">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-[#6b6b6b]">{item.text}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </AdminPanel>
      </div>

      {stats ? (
        <p className="text-xs text-[#8a8177]">
          Строк в <span className="font-mono">site_settings</span>: {stats.siteSettingsRows}
        </p>
      ) : null}
    </div>
  );
}
