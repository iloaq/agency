"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    ym?: (counterId: number, method: "hit", url: string, options?: Record<string, unknown>) => void;
  }
}

export function YandexMetrikaRouteTracker({ counterId }: { counterId: string }) {
  const pathname = usePathname();
  const isFirstHit = useRef(true);

  useEffect(() => {
    if (isFirstHit.current) {
      isFirstHit.current = false;
      return;
    }

    if (typeof window.ym !== "function") return;

    const query = window.location.search.replace(/^\?/, "");
    const url = `${pathname}${query ? `?${query}` : ""}`;
    window.ym(Number(counterId), "hit", url, {
      title: document.title,
      referer: document.referrer,
    });
  }, [counterId, pathname]);

  return null;
}
