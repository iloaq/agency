"use client";

import { useEffect } from "react";

// Source: https://www.chatwoot.com/docs/product/channels/live-chat/sdk-setup

declare global {
  interface Window {
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
  useEffect(() => {
    const config = chatwootConfig();
    if (!config) return;

    const sdkSrc = `${config.baseUrl}/packs/js/sdk.js`;
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
          websiteToken: config.websiteToken,
          baseUrl: config.baseUrl,
        });
      };

      document.head.appendChild(script);
    };

    const timeoutId = window.setTimeout(loadChatwoot, 5000);
    window.addEventListener("pointerdown", loadChatwoot, { once: true });
    window.addEventListener("scroll", loadChatwoot, { once: true, passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", loadChatwoot);
      window.removeEventListener("scroll", loadChatwoot);
    };
  }, []);

  return null;
}
