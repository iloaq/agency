import Link from "next/link";
import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function AdminPageHeader({ eyebrow, title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-[#ded6ca] pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d4aff]">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f5f5f]">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type AdminMetricCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "accent" | "dark";
};

export function AdminMetricCard({ label, value, hint, tone = "default" }: AdminMetricCardProps) {
  const toneClass =
    tone === "dark"
      ? "border-[#18181b] bg-[#18181b] text-white"
      : tone === "accent"
        ? "border-[#d9cdfd] bg-[#f3efff] text-[#111111]"
        : "border-[#ded6ca] bg-white text-[#111111]";

  return (
    <div className={`rounded-[26px] border p-5 shadow-[0_18px_55px_rgba(24,24,27,0.06)] ${toneClass}`}>
      <p className={tone === "dark" ? "text-xs font-semibold uppercase tracking-[0.14em] text-white/55" : "text-xs font-semibold uppercase tracking-[0.14em] text-[#77716a]"}>
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">{value}</p>
      {hint ? <p className={tone === "dark" ? "mt-3 text-sm text-white/62" : "mt-3 text-sm text-[#6b6b6b]"}>{hint}</p> : null}
    </div>
  );
}

export function AdminPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-[28px] border border-[#ded6ca] bg-white shadow-[0_18px_55px_rgba(24,24,27,0.06)] ${className}`}
    >
      {children}
    </section>
  );
}

export function AdminEmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-[24px] border border-dashed border-[#d8d0c4] bg-[#fbfaf7] p-6 text-center">
      <p className="font-medium text-[#111111]">{title}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-[#6b6b6b]">{description}</p> : null}
    </div>
  );
}

export function AdminStatusBadge({ status, published }: { status?: string | null; published?: boolean }) {
  const text = published !== undefined ? (published ? "Опубликовано" : "Черновик") : status || "new";
  const active = published !== undefined ? published : status === "new";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        active ? "bg-[#ecffe1] text-[#244f12]" : "bg-[#f3f0eb] text-[#6b6258]",
      ].join(" ")}
    >
      {text}
    </span>
  );
}

export function AdminPrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#18181b] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(24,24,27,0.16)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d4aff]"
    >
      {children}
    </Link>
  );
}
