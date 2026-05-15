"use client";

import { useEffect } from "react";

// Source: https://www.chatwoot.com/docs/product/channels/live-chat/sdk-setup
const SKYBRIC_CHATWOOT_BASE_URL = "https://chatwootskybric-web.capaadmin.skybric.com";
const SKYBRIC_CHATWOOT_WEBSITE_TOKEN = "9N2pEkUuBTP286y6VQqNfmzz";

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

export function ChatwootWidget() {
  const baseUrl = SKYBRIC_CHATWOOT_BASE_URL;
  const websiteToken = SKYBRIC_CHATWOOT_WEBSITE_TOKEN;

  useEffect(() => {
    const sdkSrc = `${baseUrl}/packs/js/sdk.js`;
    let loaded = false;

    const loadChatwoot = () => {
      if (loaded) return;
      loaded = true;

      window.chatwootSettings = {
        position: "right",
        type: "standard",
        launcherTitle: "Обсудить проект",
      };

      if (Array.from(document.scripts).some((script) => script.src === sdkSrc)) {
        window.chatwootSDK?.run({ websiteToken, baseUrl });
        return;
      }

      const script = document.createElement("script");
      script.src = sdkSrc;
      script.async = true;
      script.defer = true;
      script.dataset.skybricChatwoot = "true";
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

    loadChatwoot();
  }, [baseUrl, websiteToken]);

  return null;
}
