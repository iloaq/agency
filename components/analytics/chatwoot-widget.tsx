"use client";

import { useEffect } from "react";

// Source: https://www.chatwoot.com/docs/product/channels/live-chat/sdk-setup

const SDK_PATH = "/packs/js/sdk.js";

declare global {
  interface Window {
    chatwootSettings?: Record<string, unknown>;
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
  }
}

export function ChatwootWidget() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL?.trim().replace(/\/+$/, "") ?? "";
    const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN?.trim() ?? "";
    if (!baseUrl || !websiteToken) return;

    const sdkSrc = `${baseUrl}${SDK_PATH}`;
    for (let i = 0; i < document.scripts.length; i++) {
      if (document.scripts[i].src === sdkSrc) return;
    }

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
      window.chatwootSDK?.run({ websiteToken, baseUrl });
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
