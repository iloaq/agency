import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Source: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Source: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Source: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

// Source: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SKybric — цифровые системы роста",
    template: "%s — SKybric",
  },
  description:
    "Стратегия, дизайн, инженерия и AI‑автоматизация для B2B и enterprise. Фокус: измеримый рост, надёжность, масштаб.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SKybric",
    title: "SKybric — цифровые системы роста",
    description:
      "Стратегия, дизайн, инженерия и AI‑автоматизация для B2B и enterprise. Фокус: измеримый рост, надёжность, масштаб.",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKybric — цифровые системы роста",
    description:
      "Стратегия, дизайн, инженерия и AI‑автоматизация для B2B и enterprise. Фокус: измеримый рост, надёжность, масштаб.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
