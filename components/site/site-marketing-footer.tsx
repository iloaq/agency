import Link from "next/link";
import { LogoText } from "@/components/site/logo";

/** Футер маркетинговых страниц (как на главной под формой). */
export function SiteMarketingFooter() {
  const legalLinks = [
    { href: "/privacy", label: "Конфиденциальность" },
    { href: "/personal-data-consent", label: "Согласие на данные" },
    { href: "/cookies", label: "Cookies" },
    { href: "/terms", label: "Условия" },
  ] as const;

  return (
    <footer className="flex w-full flex-col gap-4 px-4 py-5 text-sm text-[#6B6B6B] lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="shrink-0">
        <LogoText alt="Skybric" width={138} height={40} className="!h-7 !w-auto sm:!h-8" />
      </div>
      <p>© 2026 Skybric. Все права защищены.</p>
      <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Документы сайта">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-[#6D4AFF]">
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="hover:text-[#6D4AFF]">
          Контакты
        </Link>
      </nav>
    </footer>
  );
}
