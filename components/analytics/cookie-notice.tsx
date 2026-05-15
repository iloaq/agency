"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_NOTICE_KEY = "skybric_cookie_notice_v1";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        setIsVisible(window.localStorage.getItem(COOKIE_NOTICE_KEY) !== "accepted");
      } catch {
        setIsVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(COOKIE_NOTICE_KEY, "accepted");
    } catch {
      // localStorage can be unavailable in strict privacy modes.
    }
    window.dataLayer?.push({ event: "cookie_notice_accept" });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] max-w-xl rounded-[24px] border border-[#E6E0D8] bg-white/95 p-4 text-[#121212] shadow-[0_20px_70px_rgba(24,24,27,0.14)] backdrop-blur md:left-6 md:right-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm leading-6 text-[#5D5D5D]">
          Используем cookies, Яндекс Метрику и Google Tag Manager, чтобы видеть посещаемость,
          заявки и улучшать сайт. Подробнее — в{" "}
          <Link href="/cookies" className="font-semibold text-[#121212] underline-offset-4 hover:underline">
            политике cookies
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="font-semibold text-[#121212] underline-offset-4 hover:underline">
            политике конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-[#18181B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
