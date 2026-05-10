import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Админка контента</h1>
      <p className="max-w-xl text-sm text-[var(--fonts-grey)]">
        Редактирование таблиц Supabase с правами service role. Публичный сайт по-прежнему читает только
        опубликованные строки (RLS + anon).
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-5 text-sm">
        <li>
          <Link href="/admin/cases" className="text-[var(--accent-violet)] underline-offset-2 hover:underline">
            Кейсы (case_studies)
          </Link>
        </li>
        <li>
          <Link href="/admin/services" className="text-[var(--accent-violet)] underline-offset-2 hover:underline">
            Услуги (services)
          </Link>
        </li>
        <li>
          <Link
            href="/admin/site-settings"
            className="text-[var(--accent-violet)] underline-offset-2 hover:underline"
          >
            Настройки сайта (site_settings)
          </Link>
        </li>
      </ul>
    </div>
  );
}
