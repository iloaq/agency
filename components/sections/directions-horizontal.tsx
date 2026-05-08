"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap-client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ScrollTrigger + scrub: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ */

const CARDS = [
  {
    title: "Сложная веб-разработка",
    body: "корпоративные сайты, сервисы, платформы, личные кабинеты",
  },
  {
    title: "Автоматизация процессов",
    body: "Telegram-боты, CRM-связки и AI-инструменты там, где они сокращают ручную работу",
  },
  {
    title: "Внутренние системы",
    body: "CRM, панели управления, кабинеты, операционные интерфейсы",
  },
  {
    title: "UX/UI и продуктовый дизайн",
    body: "интерфейсы, структуры, customer flow, прототипы",
  },
  {
    title: "SEO и digital-системы",
    body: "money-pages, аналитика, внутренняя связность и техническая SEO-база",
  },
] as const;

function useItemWidthAndGap() {
  const [dims, setDims] = useState({ item: 400, gap: 30 });
  useEffect(() => {
    const upd = () => {
      setDims(
        window.innerWidth < 600 ? { item: 280, gap: 15 } : { item: 400, gap: 30 },
      );
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);
  return dims;
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

function directionsOverlapEndPx() {
  if (typeof window === "undefined") return 180;
  return Math.min(340, Math.max(160, Math.round(window.innerHeight * 0.36)));
}

export function DirectionsHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const reducedOverlapRef = useRef(false);
  const { item: ITEM_WIDTH, gap: GAP } = useItemWidthAndGap();

  const totalDistance = (CARDS.length - 1) * (ITEM_WIDTH + GAP);

  useEffect(() => {
    reducedOverlapRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    if (reduce) {
      gsap.set(track, { clearProps: "transform" });
      return;
    }

    const scrollPx = () =>
      Math.round(totalDistance + window.innerHeight * 0.9);

    /* Сначала pin к верху экрана, затем scrub по X. pinReparent — секция с translateY не ломает fixed. https://gsap.com/docs/v3/Plugins/ScrollTrigger/ */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${scrollPx()}`,
        pin: true,
        pinReparent: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(
      track,
      { x: 0 },
      { x: -totalDistance, ease: "none", duration: 1 },
      0,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduce, totalDistance, ITEM_WIDTH, GAP]);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el || reduce || reducedOverlapRef.current) return;

    const trustSection = el.previousElementSibling;
    const trustScroll =
      trustSection instanceof HTMLElement
        ? trustSection.querySelector<HTMLElement>("[data-trust-stats-scroll]")
        : null;

    const overlapBasePx = () =>
      Math.min(520, Math.max(280, Math.round(window.innerHeight * 0.4)));
    const apply = (pull: number) => {
      const startY = -overlapBasePx();
      const endY = startY - directionsOverlapEndPx();
      const y = gsap.utils.interpolate(startY, endY, pull);
      gsap.set(el, { y });
    };

    const trigger = trustScroll ?? el;
    const st = ScrollTrigger.create({
      trigger,
      start: "top bottom",
      end: trustScroll ? "bottom top" : "top 42%",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const raw = self.progress;
        const pull = trustScroll ? Math.min(1, raw * 3) : raw;
        apply(pull);
      },
    });
    apply(trustScroll ? Math.min(1, st.progress * 3) : st.progress);

    return () => {
      st.kill();
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="directions-heading"
      className="relative z-40 isolate w-full max-w-none overflow-x-hidden rounded-t-[2rem] bg-[#0B0B0F] text-fonts-white md:rounded-t-[2.75rem]"
    >
      {reduce ? (
        <>
          <div className="px-space-lg pb-8 pt-12 md:pb-10 md:pt-16 lg:pt-20">
            <h2
              id="directions-heading"
              className="ml-auto max-w-[min(40rem,92vw)] text-right text-[clamp(1.15rem,3.2vw,2rem)] font-semibold leading-snug tracking-tight text-white md:max-w-[44rem] md:leading-tight lg:text-[2.05rem]"
            >
              От сложной веб-разработки до AI-автоматизации и внутренних систем
              под задачи бизнеса.
            </h2>
          </div>
          <div className="flex flex-col gap-4 px-space-lg pb-16 pt-4">
            <p className="text-left text-xs font-medium uppercase tracking-wider text-white/55 md:text-sm">
              Направления, в которых мы работаем
            </p>
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-black/5 bg-background-secondary p-6 text-fonts-black shadow-sm sm:rounded-3xl sm:p-7"
              >
                <h3 className="text-lg font-bold leading-snug tracking-tight md:text-xl">
                  {card.title}
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-fonts-grey md:mt-8 md:text-base">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="relative w-full motion-reduce:min-h-0">
          <div
            ref={pinRef}
            className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden overflow-y-visible px-space-lg pb-12 pt-10 md:pb-14 md:pt-14"
          >
            <h2
              id="directions-heading"
              className="shrink-0 text-right text-[clamp(1.15rem,3.2vw,2rem)] font-semibold leading-snug tracking-tight text-white md:leading-tight lg:text-[2.05rem]"
            >
              <span className="ml-auto block max-w-[min(40rem,92vw)] md:max-w-[44rem]">
                От сложной веб-разработки до AI-автоматизации и внутренних систем
                под задачи бизнеса.
              </span>
            </h2>

            <div className="flex min-h-0 flex-1 flex-col justify-end pb-4 md:pb-6">
              <div className="w-full max-w-[min(72rem,100%)]">
                <p className="mb-3 text-left text-xs font-medium uppercase tracking-wider text-white/55 md:mb-4 md:text-sm">
                  Направления, в которых мы работаем
                </p>
                <div
                  className="w-full overflow-x-hidden motion-reduce:max-w-none"
                  style={{ maxWidth: ITEM_WIDTH }}
                >
                  <div
                    ref={trackRef}
                    className="flex flex-nowrap will-change-transform"
                    style={{ gap: GAP }}
                  >
                  {CARDS.map((card) => (
                    <article
                      key={card.title}
                      style={{
                        width: ITEM_WIDTH,
                        flexShrink: 0,
                      }}
                      className="flex flex-col justify-between rounded-2xl border border-black/[0.06] bg-background-secondary p-6 text-left text-fonts-black shadow-[0_12px_40px_rgba(0,0,0,0.28)] sm:min-h-[220px] sm:rounded-3xl sm:p-7"
                    >
                      <h3 className="text-lg font-bold leading-snug tracking-tight md:text-xl">
                        {card.title}
                      </h3>
                      <p className="mt-8 text-sm leading-relaxed text-fonts-grey md:mt-10 md:text-base">
                        {card.body}
                      </p>
                    </article>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
