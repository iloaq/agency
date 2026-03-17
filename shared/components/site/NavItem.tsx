"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// Source: https://nextjs.org/docs/app/api-reference/functions/use-pathname
export function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      className="focus-ring group relative inline-flex items-center gap-2 rounded-md px-1 py-1 text-sm text-[rgb(var(--text-primary-rgb)/0.78)] transition-colors duration-[var(--duration-quick)] hover:text-[rgb(var(--text-primary-rgb)/1)]"
      aria-current={active ? "page" : undefined}
    >
      <span>{label}</span>
      <motion.span
        aria-hidden
        className="absolute -bottom-1 left-0 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(0,174,239,0.8),transparent)]"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scaleX: active ? 1 : 0.6 }}
        transition={{ duration: 0.18, ease: [0.4, 0.0, 0.2, 1] }}
      />
    </Link>
  );
}

