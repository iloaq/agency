import Link from "next/link";
import type { ServiceData } from "@/lib/services/services-data";
import { buildServiceBentoSlots } from "@/lib/services/build-service-bento-slots";
import { servicesGroupedForIndex } from "@/lib/services/service-list-groups";

function clip(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

function cardTone(i: number): "violet" | "dark" | "light" {
  const r = i % 7;
  if (r === 2) return "violet";
  if (r === 5) return "dark";
  return "light";
}

function toneClasses(tone: "violet" | "dark" | "light") {
  if (tone === "violet") {
    return "border-transparent bg-[#6D4AFF] text-white shadow-[0_18px_48px_rgba(109,74,255,0.22)] hover:shadow-[0_22px_56px_rgba(109,74,255,0.28)]";
  }
  if (tone === "dark") {
    return "border-transparent bg-[#18181B] text-white shadow-[0_18px_48px_rgba(24,24,27,0.18)] hover:shadow-[0_22px_56px_rgba(24,24,27,0.24)]";
  }
  return "border-[#E6E0D8] bg-white text-[#121212] shadow-[0_12px_36px_rgba(72,57,41,0.05)] hover:border-[#6D4AFF]/28 hover:shadow-[0_16px_44px_rgba(72,57,41,0.08)]";
}

function ServiceBentoCard({
  service,
  tone,
  xlColSpan,
  smSpanFull,
  compact,
}: {
  service: ServiceData;
  tone: "violet" | "dark" | "light";
  xlColSpan?: 2;
  smSpanFull?: boolean;
  /** Половина экрана (две колонки секций): без xl-бенто и фиксированного aspect. */
  compact?: boolean;
}) {
  const sub = tone === "light" ? "text-[#4B4B4B]" : "text-white/78";
  const arrow =
    tone === "light"
      ? "border-[#E6E0D8] bg-[#F6F3EE] text-[#121212] group-hover:border-[#6D4AFF]/35 group-hover:text-[#6D4AFF]"
      : "border-white/20 bg-white/10 group-hover:bg-white/18";

  return (
    <Link
      href={service.path}
      className={[
        "group relative flex min-h-[200px] flex-col justify-between gap-6 rounded-[22px] border p-5 transition hover:-translate-y-0.5 sm:min-h-[220px] sm:rounded-[24px] sm:p-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        compact
          ? ""
          : xlColSpan === 2
            ? "xl:col-span-2 xl:aspect-[2/1] xl:min-h-0 xl:max-h-[min(30vw,280px)]"
            : "xl:aspect-square xl:min-h-0 xl:max-h-[min(40vw,340px)]",
        smSpanFull ? "sm:col-span-2" : "",
        toneClasses(tone),
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="min-w-0">
        <div className="flex items-start justify-end gap-3">
          <h3 className="min-w-0 flex-1 text-left text-lg font-semibold leading-snug tracking-tight sm:text-xl">
            {service.title}
          </h3>
          <span
            className={[
              "grid size-9 shrink-0 place-items-center rounded-full border text-sm transition",
              arrow,
            ].join(" ")}
            aria-hidden
          >
            ↗
          </span>
        </div>
      </div>
      <p className={`text-sm leading-6 sm:text-[15px] sm:leading-7 ${sub}`}>{clip(service.shortDescription, 132)}</p>
    </Link>
  );
}

function BentoGrid({
  items,
  groupKey,
  compact,
}: {
  items: ServiceData[];
  groupKey: string;
  compact?: boolean;
}) {
  if (compact) {
    const cardCount = items.length;
    return (
      <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {items.map((service, idx) => {
          const isLastCard = idx === cardCount - 1;
          const smSpanFull = isLastCard && cardCount % 2 === 1;
          return (
            <ServiceBentoCard
              key={service.slug}
              service={service}
              tone={cardTone(idx)}
              smSpanFull={smSpanFull}
              compact
            />
          );
        })}
      </div>
    );
  }

  const slots = buildServiceBentoSlots(items);
  const cardCount = slots.filter((s) => s.type === "card").length;
  let cardOrdinal = 0;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-7">
      {slots.map((slot, si) => {
        if (slot.type === "spacer") {
          return (
            <div
              key={`${groupKey}-sp-${si}`}
              className="hidden xl:block xl:pointer-events-none xl:aspect-square xl:max-h-[min(40vw,340px)] xl:rounded-[24px] xl:border xl:border-dashed xl:border-[#E6E0D8]/65 xl:bg-[#F6F3EE]/35"
              aria-hidden
            />
          );
        }
        const idx = cardOrdinal++;
        const tone = slot.xlColSpan === 2 ? "dark" : cardTone(idx);
        const isLastCard = idx === cardCount - 1;
        const smSpanFull = isLastCard && cardCount % 2 === 1;
        return (
          <ServiceBentoCard
            key={slot.service.slug}
            service={slot.service}
            tone={tone}
            xlColSpan={slot.xlColSpan}
            smSpanFull={smSpanFull}
          />
        );
      })}
    </div>
  );
}

function ServiceGroupSection({
  group,
  compact,
}: {
  group: { label: string; items: ServiceData[] };
  compact?: boolean;
}) {
  const sectionId = `svc-gr-${group.label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <section className="min-w-0" aria-labelledby={sectionId}>
      <div className="mb-5 flex items-center gap-3 sm:mb-6">
        <span className="size-2 shrink-0 rounded-full bg-[#121212]" aria-hidden />
        <h2
          id={sectionId}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6B6B] sm:text-sm"
        >
          {group.label}
        </h2>
      </div>
      <BentoGrid items={group.items} groupKey={sectionId} compact={compact} />
    </section>
  );
}

const PAIR_ROW_CLASS =
  "grid gap-12 sm:gap-14 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-16";

export function ServicesIndexLayout({ services }: { services: ServiceData[] }) {
  const groups = servicesGroupedForIndex(services);

  const designDevPair =
    groups.length >= 2 && groups[0].label === "Дизайн" && groups[1].label === "Разработка"
      ? ([groups[0], groups[1]] as const)
      : null;

  const afterDesignDev = designDevPair ? groups.slice(2) : groups;

  const growthDigitalPair =
    afterDesignDev.length >= 2 &&
    afterDesignDev[0].label === "Интеграции и рост" &&
    afterDesignDev[1].label === "Диджитал-сопровождение"
      ? ([afterDesignDev[0], afterDesignDev[1]] as const)
      : null;

  const tailAfterPairs = growthDigitalPair ? afterDesignDev.slice(2) : afterDesignDev;

  return (
    <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16 lg:mt-16 lg:space-y-20">
      {designDevPair ? (
        <>
          <div className={PAIR_ROW_CLASS}>
            <ServiceGroupSection group={designDevPair[0]} compact />
            <ServiceGroupSection group={designDevPair[1]} compact />
          </div>
          {growthDigitalPair ? (
            <div className={PAIR_ROW_CLASS}>
              <ServiceGroupSection group={growthDigitalPair[0]} compact />
              <ServiceGroupSection group={growthDigitalPair[1]} compact />
            </div>
          ) : (
            afterDesignDev.map((group) => <ServiceGroupSection key={group.label} group={group} />)
          )}
          {growthDigitalPair
            ? tailAfterPairs.map((group) => <ServiceGroupSection key={group.label} group={group} />)
            : null}
        </>
      ) : (
        groups.map((group) => <ServiceGroupSection key={group.label} group={group} />)
      )}
    </div>
  );
}
