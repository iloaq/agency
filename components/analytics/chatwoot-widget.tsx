"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Source: https://www.chatwoot.com/docs/product/channels/live-chat/sdk-setup

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    chatwootSettings?: {
      position: "left" | "right";
      type: "standard" | "expanded_bubble";
      launcherTitle: string;
    };
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

function chatwootConfig() {
  const baseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL?.trim().replace(/\/+$/, "");
  const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN?.trim();

  if (!baseUrl || !websiteToken) return null;
  return { baseUrl, websiteToken };
}

export function ChatwootWidget() {
  const config = chatwootConfig();
  const baseUrl = config?.baseUrl;
  const websiteToken = config?.websiteToken;
  const [showFallback, setShowFallback] = useState(!baseUrl || !websiteToken);

  useEffect(() => {
    if (!baseUrl || !websiteToken) return;

    const sdkSrc = `${baseUrl}/packs/js/sdk.js`;
    let loaded = false;

    const loadChatwoot = () => {
      if (loaded) return;
      loaded = true;

      if (Array.from(document.scripts).some((script) => script.src === sdkSrc)) return;

      window.chatwootSettings = {
        position: "right",
        type: "standard",
        launcherTitle: "Обсудить проект",
      };

      const script = document.createElement("script");
      script.src = sdkSrc;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.chatwootSDK?.run({
          websiteToken,
          baseUrl,
        });
        window.dataLayer?.push({ event: "chatwoot_loaded" });
      };
      script.onerror = () => setShowFallback(true);

      document.head.appendChild(script);
    };

    const timeoutId = window.setTimeout(loadChatwoot, 1200);
    window.addEventListener("load", loadChatwoot, { once: true });
    window.addEventListener("pointerdown", loadChatwoot, { once: true });
    window.addEventListener("scroll", loadChatwoot, { once: true, passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", loadChatwoot);
      window.removeEventListener("pointerdown", loadChatwoot);
      window.removeEventListener("scroll", loadChatwoot);
    };
  }, [baseUrl, websiteToken]);

  if (!showFallback) return null;

  return (
    <Link
      href="/contact"
      aria-label="Оставить заявку"
      onClick={() => window.dataLayer?.push({ event: "chat_fallback_click" })}
      className="fixed bottom-5 right-5 z-[80] inline-flex min-h-12 items-center justify-center rounded-full bg-[#18181B] px-5 text-sm font-bold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
    >
      Обсудить проект ↗
    </Link>
  );
}
