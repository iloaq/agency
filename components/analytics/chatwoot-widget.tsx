"use client";

import { useEffect } from "react";

// Source: https://www.chatwoot.com/docs/product/channels/live-chat/sdk-setup

const CHATWOOT_BASE_URL = "http://chatwootskybric.capaadmin.skybric.com";
const CHATWOOT_WEBSITE_TOKEN = "9N2pEkUuBTP286y6VQqNfmzz";

const SDK_PATH = "/packs/js/sdk.js";

declare global {
  interface Window {
    chatwootSettings?: Record<string, unknown>;
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
  }
}

export function ChatwootWidget() {
  useEffect(() => {
    const baseUrl = CHATWOOT_BASE_URL.replace(/\/+$/, "");
    const websiteToken = CHATWOOT_WEBSITE_TOKEN;
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
