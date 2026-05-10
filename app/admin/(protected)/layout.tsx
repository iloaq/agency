import Link from "next/link";
import { requireAdminSession } from "@/lib/admin/require-admin";

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/leads", label: "Лиды" },
  { href: "/admin/cases", label: "Кейсы" },
  { href: "/admin/services", label: "Услуги" },
  { href: "/admin/site-settings", label: "Настройки сайта" },
] as const;

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-[#DCD3C8] bg-[var(--bg-secondary)] px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-4 text-sm font-medium">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--fonts-grey)] underline-offset-4 hover:text-[var(--fonts-black)] hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="text-sm font-medium text-[var(--fonts-grey)] underline-offset-4 hover:text-[var(--fonts-black)] hover:underline"
            >
              Выйти
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">{children}</div>
    </div>
  );
}
