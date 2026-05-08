"use client";

import { gsap } from "@/lib/gsap-client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

// ScrollTrigger scrub: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

export const TRUST_STATS = [
  { value: "B2B", label: "сайты и сервисы" },
  { value: "CRM", label: "интеграции и заявки" },
  { value: "SEO", label: "архитектура спроса" },
] as const;

type StatIdx = 0 | 1 | 2;

const STAT_CYCLE: readonly StatIdx[] = [0, 1, 2];

/** Число: 239px на десктопе; на узких экранах — clamp (переполнение). https://developer.mozilla.org/en-US/docs/Web/CSS/font-size */
const STAT_VALUE_FONT = "clamp(3rem, 18vmin, 239px)";

/** Акценты из :root — https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties */
function SlashDividerBig({ variant }: { variant: "a" | "b" }) {
  const color =
    variant === "a" ? "var(--accent-violet)" : "var(--buttons-green-normal)";
  return (
    <span
      className="mx-2 inline translate-y-2 select-none pb-1 align-baseline font-bold leading-none md:mx-4 md:translate-y-4"
      style={{
        color,
        fontSize: "clamp(2.25rem, 12vmin, 140px)",
      }}
      aria-hidden
    >
      /
    </span>
  );
}

function StatPairBig({ idx }: { idx: StatIdx }) {
  const s = TRUST_STATS[idx];
  return (
    <span className="inline-flex max-w-[min(100%,22rem)] flex-col items-center gap-1 md:max-w-[28rem] md:gap-2">
      <span
        className="text-center font-bold leading-none tracking-tight whitespace-nowrap text-fonts-black"
        style={{ fontSize: STAT_VALUE_FONT }}
      >
        {s.value}
      </span>
      <span className="max-w-[14rem] px-1 text-center text-[clamp(0.75rem,2.2vmin,1.125rem)] font-medium leading-snug text-fonts-black/55 text-balance md:max-w-[18rem] md:px-2">
        {s.label}
      </span>
    </span>
  );
}

const INDUSTRY_LINE_A = [
  "Финансы",
  "E-commerce",
  "Образование",
  "Здравоохранение",
  "Госсектор",
] as const;

const INDUSTRY_LINE_B = [
  "Образование",
  "Госсектор",
  "E-commerce",
  "Медиа",
  "Финансы",
] as const;

const INDUSTRY_LINE_C = [
  "Медиа",
  "Финансы",
  "Здравоохранение",
  "E-commerce",
  "Госсектор",
] as const;

/** Повтор блока для длинной ленты (scroll-scrub), без JS-loop. */
function repeatWords<T extends readonly string[]>(words: T, times: number) {
  return Array.from({ length: times }, (_, t) =>
    words.map((w, i) => ({ w, key: `${t}-${i}-${w}` })),
  ).flat();
}

/** Доля смещения «до нуля» в фазе входа; вторая половина скролла — выход. https://gsap.com/docs/v3/GSAP/Timeline/ */
const SCRUB_ENTER_RATIO = 0.32;

function bindThreeRowsEnterExitScrub(
  root: HTMLElement,
  row0: HTMLElement,
  row1: HTMLElement,
  row2: HTMLElement,
  max0: number,
  max1: number,
  max2: number,
  scroll?: { start?: string; end?: string },
) {
  const e0 = max0 * SCRUB_ENTER_RATIO;
  const e1 = max1 * SCRUB_ENTER_RATIO;
  const e2 = max2 * SCRUB_ENTER_RATIO;

  /* start top bottom — горизонталь начинается, пока блок только заезжает снизу. https://gsap.com/docs/v3/Plugins/ScrollTrigger/ */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: scroll?.start ?? "top bottom",
      end: scroll?.end ?? "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(row0, { x: e0 }, { x: 0, ease: "none", duration: 1 }, 0)
    .fromTo(row1, { x: -e1 }, { x: 0, ease: "none", duration: 1 }, 0)
    .fromTo(row2, { x: e2 }, { x: 0, ease: "none", duration: 1 }, 0)
    .to(row0, { x: -max0, ease: "none", duration: 1 }, 1)
    .to(row1, { x: max1, ease: "none", duration: 1 }, 1)
    .to(row2, { x: -max2, ease: "none", duration: 1 }, 1);

  return tl;
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduce(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduce;
}

/** Три метрики один раз, по центру; скролл-трек для раннего заезда Directions. */
export function TrustTickerStatsScroll() {
  return (
    <div className="relative w-full">
      <div
        data-trust-stats-scroll
        className="relative min-h-[200vh] w-full"
      >
        <div className="sticky top-0 z-10 flex h-[100dvh] w-full flex-col items-center justify-center overflow-x-hidden px-space-sm py-space-lg md:px-space-lg md:py-space-xl">
          <div className="relative z-10 flex w-full max-w-[100vw] flex-wrap items-end justify-center gap-y-6 px-2 md:gap-y-8">
            {STAT_CYCLE.map((idx, i) => (
              <span key={idx} className="inline-flex items-end">
                {i > 0 ? (
                  <SlashDividerBig variant={i === 1 ? "a" : "b"} />
                ) : null}
                <StatPairBig idx={idx} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrustTickerIndustryLines() {
  const reduceMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const row0Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [max0, setMax0] = useState(0);
  const [max1, setMax1] = useState(0);
  const [max2, setMax2] = useState(0);

  const rowA = useMemo(() => repeatWords(INDUSTRY_LINE_A, 3), []);
  const rowB = useMemo(() => repeatWords(INDUSTRY_LINE_B, 3), []);
  const rowC = useMemo(() => repeatWords(INDUSTRY_LINE_C, 3), []);

  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const pad = 40;
      const w0 = row0Ref.current?.scrollWidth ?? 0;
      const w1 = row1Ref.current?.scrollWidth ?? 0;
      const w2 = row2Ref.current?.scrollWidth ?? 0;
      setMax0(Math.max(0, w0 - vw + pad));
      setMax1(Math.max(0, w1 - vw + pad));
      setMax2(Math.max(0, w2 - vw + pad));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (row0Ref.current) ro.observe(row0Ref.current);
    if (row1Ref.current) ro.observe(row1Ref.current);
    if (row2Ref.current) ro.observe(row2Ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* Верх / низ → влево (−x), центр → вправо (+x). https://gsap.com/docs/v3/Plugins/ScrollTrigger/ */
  useLayoutEffect(() => {
    const root = containerRef.current;
    const row0 = row0Ref.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!root || !row0 || !row1 || !row2) return;

    if (reduceMotion) {
      gsap.set([row0, row1, row2], { clearProps: "transform" });
      return;
    }

    const tl = bindThreeRowsEnterExitScrub(root, row0, row1, row2, max0, max1, max2);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduceMotion, max0, max1, max2]);

  return (
    <div
      ref={containerRef}
      aria-label="Отрасли"
      className="relative mt-space-xl2 w-full md:mt-space-xl3"
    >
      <div className="relative h-[130vh] w-full">
        <div className="sticky top-0 flex min-h-[100dvh] flex-col justify-center gap-8 overflow-hidden py-space-xl2 md:gap-12 md:py-space-xl3">
          <div className="flex flex-col gap-6 md:gap-10">
            <div
              ref={row0Ref}
              className="inline-block whitespace-nowrap text-[clamp(1.5rem,6vw,3.25rem)] font-light leading-none tracking-tight text-fonts-grey will-change-transform"
            >
              {rowA.map(({ w, key }) => (
                <span key={key} className="mr-10 inline-block md:mr-16">
                  {w}
                </span>
              ))}
            </div>
            <div
              ref={row1Ref}
              className="inline-block whitespace-nowrap text-[clamp(1.65rem,6.5vw,3.5rem)] font-medium leading-none tracking-tight text-fonts-white will-change-transform"
            >
              {rowB.map(({ w, key }) => (
                <span key={key} className="mr-10 inline-block md:mr-16">
                  {w}
                </span>
              ))}
            </div>
            <div
              ref={row2Ref}
              className="inline-block whitespace-nowrap text-[clamp(1.5rem,6vw,3.25rem)] font-light leading-none tracking-tight text-fonts-grey will-change-transform"
            >
              {rowC.map(({ w, key }) => (
                <span key={key} className="mr-10 inline-block md:mr-16">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
