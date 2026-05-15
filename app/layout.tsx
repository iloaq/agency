import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Manrope } from "next/font/google";
import { LenisGsapProvider } from "@/components/providers/lenis-gsap-provider";
import { SiteHeader } from "@/components/site/site-header";
import { ToastProvider } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { ChatwootWidget } from "@/components/analytics/chatwoot-widget";
import { CookieNotice } from "@/components/analytics/cookie-notice";
import { resolveSiteContacts } from "@/lib/site/site-contacts";
import { resolveServiceList } from "@/lib/services/resolve-services";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

/* MUI + Next.js App Router: https://mui.com/material-ui/integrations/nextjs/ */

/* Source: https://nextjs.org/docs/app/building-your-application/optimizing/fonts */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  /* Без link preload — Chrome не ругается, если вес ещё не применён к тексту. */
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Skybric — веб-разработка, автоматизация и digital-системы для бизнеса",
    template: "%s | Skybric",
  },
  description:
    "Разрабатываем сайты, веб-сервисы, Telegram-ботов, CRM-интеграции, AI-автоматизацию, SEO, digital-сопровождение и fintech-решения для B2B-компаний.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: siteUrl,
    siteName: "Skybric",
    title: "Skybric — веб-разработка, автоматизация и digital-системы для бизнеса",
    description:
      "Сайты, веб-сервисы, Telegram-боты, CRM-интеграции, AI-автоматизация, SEO, digital-сопровождение и fintech-разработка для B2B.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skybric — веб-разработка, автоматизация и digital-системы для бизнеса",
    description:
      "Технологический B2B-партнёр для сайтов, веб-сервисов, Telegram, CRM, SEO, digital-сопровождения, AI-automation и fintech.",
  },
  // Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applewebapp
  appleWebApp: {
    title: "Skybric",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contacts, services] = await Promise.all([
    resolveSiteContacts(),
    resolveServiceList(),
  ]);
  const serviceLinks = services.map((service) => ({
    href: service.path,
    label: service.title,
  }));

  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background-primary font-sans text-fonts-black">
        <GoogleTagManager />
        <YandexMetrika />
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <TooltipProvider>
            <ToastProvider>
              <div className="flex min-h-0 flex-1 flex-col">
                <SiteHeader contacts={contacts} serviceLinks={serviceLinks} />
                <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
                  <LenisGsapProvider>{children}</LenisGsapProvider>
                </div>
              </div>
            </ToastProvider>
          </TooltipProvider>
        </AppRouterCacheProvider>
        <ChatwootWidget />
        <CookieNotice />
      </body>
    </html>
  );
}
