"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Обзор", icon: "◆" },
  { href: "/admin/leads", label: "Лиды", icon: "◇" },
  { href: "/admin/cases", label: "Кейсы", icon: "▣" },
  { href: "/admin/services", label: "Услуги", icon: "▤" },
  { href: "/admin/site-settings", label: "Настройки", icon: "⚙" },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-800/90 bg-slate-950">
      <div className="border-b border-slate-800/90 px-4 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Панель</p>
        <p className="mt-1 text-lg font-semibold tracking-tight text-white">Skybric</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin" || pathname === "/admin/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-violet-600/15 text-violet-200 ring-1 ring-violet-500/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200",
              ].join(" ")}
            >
              <span className="w-5 text-center text-xs opacity-80" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-800/90 p-2">
        <form action="/admin/logout" method="post">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-800/80 hover:text-slate-300"
          >
            Выйти
          </button>
        </form>
      </div>
    </aside>
  );
}
