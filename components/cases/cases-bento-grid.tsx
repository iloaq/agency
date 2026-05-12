import Link from "next/link";
import type { CaseCardFromDb } from "@/lib/cases/case-study-helpers";

function clip(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

/** Простая «иллюстрация» без копирования референса — геометрия + акцент. */
function CaseGlyph({ className, accent }: { className?: string; accent?: boolean }) {
  const stroke = accent ? "rgba(255,255,255,0.35)" : "rgba(109,74,255,0.35)";
  const fill = accent ? "rgba(255,255,255,0.12)" : "rgba(109,74,255,0.08)";
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="12" width="48" height="48" rx="14" stroke={stroke} strokeWidth="2" fill={fill} />
      <path d="M52 28 L72 20 L64 48 L44 56 Z" fill={accent ? "rgba(255,255,255,0.2)" : "rgba(109,74,255,0.15)"} />
      <circle cx="30" cy="36" r="8" fill={accent ? "rgba(255,255,255,0.25)" : "rgba(109,74,255,0.2)"} />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      ↗
    </span>
  );
}

function FeaturedCard({ item }: { item: CaseCardFromDb }) {
  const lead = clip(item.loss, 200);
  return (
    <Link
      href={item.href}
      className="group relative flex min-h-[min(100vw,420px)] flex-col overflow-hidden rounded-[28px] border border-[#6D4AFF]/25 bg-[#6D4AFF] p-7 pb-8 text-white shadow-[0_24px_70px_rgba(109,74,255,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(109,74,255,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:col-span-2 xl:col-span-2 xl:row-span-2 xl:min-h-[420px]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">{item.sector ?? "Кейс"}</p>

      <div className="mt-6 flex flex-1 flex-col gap-6 min-h-0 lg:flex-row lg:items-stretch">
        <div className="min-w-0 flex-1">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-tight">{item.task}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85">{lead}</p>
        </div>
        <div className="flex shrink-0 items-center justify-center lg:w-[34%] lg:items-end lg:justify-end">
          <CaseGlyph className="h-28 w-28 opacity-95 lg:h-36 lg:w-36" accent />
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/15 pt-6">
        <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-2xl transition group-hover:bg-white/20">
          <ArrowUpRight />
        </span>
        <p className="text-right text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Разбор задачи</p>
      </div>
    </Link>
  );
}

function CompactCard({
  item,
  accent,
  spanClass = "",
}: {
  item: CaseCardFromDb;
  accent: boolean;
  spanClass?: string;
}) {
  const metric = clip(item.easier, 72);
  return (
    <Link
      href={item.href}
      className={[
        "group relative flex min-h-[200px] flex-col rounded-[24px] border p-5 transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        spanClass,
        accent
          ? "border-transparent bg-[#6D4AFF] text-white shadow-[0_18px_50px_rgba(109,74,255,0.22)] hover:shadow-[0_22px_58px_rgba(109,74,255,0.3)]"
          : "border-[#E6E0D8] bg-white shadow-[0_14px_40px_rgba(72,57,41,0.06)] hover:border-[#6D4AFF]/30 hover:shadow-[0_18px_48px_rgba(72,57,41,0.09)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <CaseGlyph className="h-14 w-14 shrink-0" accent={accent} />
        <span
          className={[
            "grid size-9 shrink-0 place-items-center rounded-full border text-sm transition",
            accent
              ? "border-white/25 bg-white/10 group-hover:bg-white/20"
              : "border-[#E6E0D8] bg-[#F6F3EE] text-[#121212] group-hover:border-[#6D4AFF]/35 group-hover:text-[#6D4AFF]",
          ].join(" ")}
        >
          <ArrowUpRight />
        </span>
      </div>

      <p
        className={[
          "mt-3 text-[10px] font-bold uppercase tracking-[0.14em]",
          accent ? "text-white/65" : "text-[#6B6B6B]",
        ].join(" ")}
      >
        {item.sector ?? "Кейс"}
      </p>
      <h3
        className={[
          "mt-2 line-clamp-3 text-lg font-semibold leading-snug tracking-tight sm:text-xl",
          accent ? "text-white" : "text-[#121212]",
        ].join(" ")}
      >
        {item.task}
      </h3>
      <p
        className={[
          "mt-auto pt-4 text-sm font-medium leading-snug",
          accent ? "text-white/85" : "text-[#4B4B4B]",
        ].join(" ")}
      >
        {metric}
      </p>
    </Link>
  );
}

/** Последняя строка сетки: добить ширину без «дырки» (xl: 3 колонки после блока 2×2). */
function lastCompactSpanClass(restLen: number): string {
  if (restLen <= 0) return "";
  const md = restLen % 2 === 1 ? "md:col-span-2" : "";
  if (restLen === 1) {
    return ["xl:col-span-3", md].filter(Boolean).join(" ");
  }
  const tail = restLen - 2;
  const rem = tail % 3;
  let xl = "";
  if (rem === 1) xl = "xl:col-span-3";
  else if (rem === 2) xl = "xl:col-span-2";
  return [xl, md].filter(Boolean).join(" ");
}

export function CasesBentoGrid({ cases }: { cases: CaseCardFromDb[] }) {
  const [featured, ...rest] = cases;
  const lastSpan = lastCompactSpanClass(rest.length);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6 xl:auto-rows-min">
      <FeaturedCard item={featured} />
      {rest.map((item, i) => (
        <CompactCard
          key={item.key}
          item={item}
          accent={i % 4 === 2}
          spanClass={i === rest.length - 1 ? lastSpan : ""}
        />
      ))}
    </div>
  );
}
