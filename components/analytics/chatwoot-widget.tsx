import { ChatwootWidgetClient } from "@/components/analytics/chatwoot-widget-client";

/** Без префикса NEXT_PUBLIC — читается на сервере в runtime (Docker/CapRover). Fallback: NEXT_PUBLIC_* для локальной сборки. Source: https://nextjs.org/docs/app/guides/environment-variables */
function chatwootBaseUrl(): string {
  const raw =
    process.env.CHATWOOT_BASE_URL?.trim() ??
    process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL?.trim() ??
    "";
  return raw.replace(/\/+$/, "");
}

function chatwootWebsiteToken(): string {
  return (
    process.env.CHATWOOT_WEBSITE_TOKEN?.trim() ??
    process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN?.trim() ??
    ""
  );
}

export function ChatwootWidget() {
  const baseUrl = chatwootBaseUrl();
  const websiteToken = chatwootWebsiteToken();
  if (!baseUrl || !websiteToken) return null;
  return <ChatwootWidgetClient baseUrl={baseUrl} websiteToken={websiteToken} />;
}
