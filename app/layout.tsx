import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Manrope } from "next/font/google";
import { LenisGsapProvider } from "@/components/providers/lenis-gsap-provider";
import { SiteHeader } from "@/components/site/site-header";
import { ToastProvider } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  title: "Skybric — digital и AI-разработка для бизнеса",
  description:
    "Skybric проектирует ИИ-агентов, автоматизацию, CRM-интеграции, сайты, веб-приложения и мобильные продукты под процессы бизнеса.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background-primary font-sans text-fonts-black">
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <TooltipProvider>
            <ToastProvider>
              <div className="flex min-h-0 flex-1 flex-col">
                <SiteHeader />
                <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
                  <LenisGsapProvider>{children}</LenisGsapProvider>
                </div>
              </div>
            </ToastProvider>
          </TooltipProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
