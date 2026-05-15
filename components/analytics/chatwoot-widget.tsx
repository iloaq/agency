"use client";

import { useEffect } from "react";

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

  useEffect(() => {
    if (!baseUrl || !websiteToken) {
      console.warn("[Skybric] Chatwoot is not initialized: public env is missing.");
      return;
    }

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
        console.info("[Skybric] Chatwoot initialized.");
        window.dataLayer?.push({ event: "chatwoot_loaded" });
      };
      script.onerror = () => {
        console.warn("[Skybric] Chatwoot SDK failed to load.");
      };

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

  return null;
}
