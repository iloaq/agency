"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

// Codrops: https://tympanus.net/codrops/2025/06/17/building-an-infinite-marquee-along-an-svg-path-with-react-motion/
// offset-path: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path

const VIEW_W = 588;
const VIEW_H = 187;

const PATH =
  "M -20 108 C 132 112 288 168 302 48 C 308 -90 -18 158 472 172 C 528 178 562 184 588 302";

const ICONS = [
  SiReact,
  SiVuedotjs,
  SiPython,
  SiTypescript,
  SiNodedotjs,
  SiNextdotjs,
  SiDocker,
] as const;

const REPEAT = 2;
const BASE_VELOCITY = 4;
const HOVER_FACTOR = 0.28;
const Z_INDEX_BASE = 0;
const DRAG_SENS = 0.045;
const DRAG_DECAY = 0.965;

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

type HeroStackMarqueeProps = {
  className?: string;
};

export function HeroStackMarquee({ className }: HeroStackMarqueeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const baseOffset = useRef(0);
  const hoveredZoneRef = useRef(false);
  const dragVelRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tiles = Array.from({ length: REPEAT * ICONS.length }, (_, i) => ({
    Icon: ICONS[i % ICONS.length],
    key: i,
  }));
  const n = tiles.length;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let roRaf = 0;
    const update = () => {
      roRaf = 0;
      const w = el.clientWidth;
      setScale(w > 0 ? w / VIEW_W : 1);
    };
    update();
    const ro = new ResizeObserver(() => {
      if (roRaf) return;
      roRaf = requestAnimationFrame(update);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (roRaf) cancelAnimationFrame(roRaf);
    };
  }, []);

  /* rAF только при видимости hero + вкладка активна — https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;

    let frame = 0;
    let last = performance.now();
    let ticking = false;

    const tick = (now: number) => {
      if (!ticking) return;
      frame = requestAnimationFrame(tick);
      if (document.visibilityState === "hidden") {
        last = now;
        return;
      }

      const delta = Math.min(now - last, 64);
      last = now;

      const hoverMul = hoveredZoneRef.current ? HOVER_FACTOR : 1;
      let moveBy = ((BASE_VELOCITY * delta) / 1000) * hoverMul;

      const drag = dragVelRef.current;
      moveBy += drag * (delta / 16.67) * 0.28;
      dragVelRef.current *= Math.pow(DRAG_DECAY, delta / 16.67);
      if (Math.abs(dragVelRef.current) < 0.003) dragVelRef.current = 0;

      baseOffset.current += moveBy;

      const refs = tileRefs.current;
      for (let i = 0; i < n; i++) {
        const el = refs[i];
        if (!el) continue;
        const position = (i * 100) / n;
        const w = wrap(0, 100, baseOffset.current + position);
        el.style.setProperty("offset-distance", `${w.toFixed(3)}%`);
        el.style.zIndex = String(Math.floor(Z_INDEX_BASE + w));
      }
    };

    const start = () => {
      if (ticking) return;
      ticking = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      ticking = false;
      cancelAnimationFrame(frame);
    };

    const inExpandedView = () => {
      const r = root.getBoundingClientRect();
      const m = 120;
      return r.bottom > -m && r.top < window.innerHeight + m;
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        stop();
        return;
      }
      if (inExpandedView()) start();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting && document.visibilityState === "visible") start();
        else stop();
      },
      { root: null, rootMargin: "120px", threshold: 0 },
    );
    io.observe(root);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      stop();
      io.disconnect();
    };
  }, [n]);

  const onPointerDownCapture = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    dragVelRef.current += dx * DRAG_SENS;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* */
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full cursor-grab touch-none select-none active:cursor-grabbing ${className ?? ""}`}
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      role="region"
      aria-roledescription="marquee"
      aria-label="Стек: наведение на зону замедляет, значок под курсором увеличивается; потяни."
      onPointerEnter={() => {
        hoveredZoneRef.current = true;
      }}
      onPointerLeave={() => {
        hoveredZoneRef.current = false;
        draggingRef.current = false;
      }}
      onPointerDownCapture={onPointerDownCapture}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={PATH} fill="none" stroke="none" />
      </svg>

      <div
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{
          width: VIEW_W,
          height: VIEW_H,
          transform: `scale(${scale})`,
        }}
      >
        {tiles.map(({ Icon, key: tileKey }, itemIndex) => (
          <div
            key={tileKey}
            ref={(el) => {
              tileRefs.current[itemIndex] = el;
            }}
            className="pointer-events-auto absolute left-0 top-0 flex size-8 items-center justify-center hover:!z-[90] sm:size-9"
            style={{
              offsetPath: `path('${PATH}')`,
              offsetDistance: "0%",
              offsetRotate: "auto",
              offsetAnchor: "center center",
            }}
          >
            <div className="flex size-full origin-center items-center justify-center rounded-xl border border-black/[0.08] bg-white text-[1.05rem] text-black/85 shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition-[transform,box-shadow] duration-200 ease-out hover:scale-[1.14] hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)] sm:text-[1.15rem]">
              <Icon aria-hidden />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
