"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBriefcase, FiGrid, FiInbox, FiLayers, FiLogOut, FiSettings } from "react-icons/fi";
import type { IconType } from "react-icons";

type AdminNavItem = {
  href: string;
  label: string;
  helper: string;
  icon: IconType;
};

const nav: AdminNavItem[] = [
  { href: "/admin", label: "Дашборд", helper: "обзор", icon: FiGrid },
  { href: "/admin/leads", label: "Заявки", helper: "лиды", icon: FiInbox },
  { href: "/admin/services", label: "Услуги", helper: "контент", icon: FiLayers },
  { href: "/admin/cases", label: "Проекты", helper: "разборы", icon: FiBriefcase },
  { href: "/admin/site-settings", label: "Настройки", helper: "сайт", icon: FiSettings },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" || pathname === "/admin/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-[#ded6ca] bg-[#111111] text-white lg:sticky lg:top-0 lg:h-screen lg:w-[286px] lg:border-b-0 lg:border-r lg:border-[#2a2a2d]">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:block lg:px-5 lg:py-6">
        <Link href="/admin" className="block">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Admin</p>
          <p className="mt-1 text-xl font-semibold tracking-tight">Skybric</p>
        </Link>
        <div className="flex items-center gap-2 lg:mt-5">
          <Link
            href="/"
            className="rounded-full border border-white/12 px-3 py-2 text-xs font-semibold text-white/72 transition hover:border-white/28 hover:text-white"
          >
            На сайт
          </Link>
          <form action="/admin/logout" method="post" className="lg:hidden">
            <button
              type="submit"
              className="rounded-full border border-white/12 px-3 py-2 text-xs font-semibold text-white/54 transition hover:border-white/28 hover:text-white"
            >
              Выйти
            </button>
          </form>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 sm:px-6 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-0">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex min-w-fit items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition lg:min-w-0",
                active
                  ? "bg-white text-[#111111] shadow-[0_14px_38px_rgba(0,0,0,0.26)]"
                  : "text-white/62 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              <span
                className={[
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  active ? "bg-[#f1ede6] text-[#6d4aff]" : "bg-white/8 text-white/62",
                ].join(" ")}
                aria-hidden
              >
                <Icon className="size-4" />
              </span>
              <span className="grid leading-tight">
                <span>{item.label}</span>
                <span className={active ? "text-xs text-[#6b6b6b]" : "text-xs text-white/35"}>{item.helper}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden px-5 lg:absolute lg:bottom-5 lg:left-0 lg:right-0 lg:block">
        <form action="/admin/logout" method="post">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/48 transition hover:bg-white/8 hover:text-white"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-white/8" aria-hidden>
              <FiLogOut className="size-4" />
            </span>
            Выйти
          </button>
        </form>
      </div>
    </aside>
  );
}
