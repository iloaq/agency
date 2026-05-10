import Link from "next/link";
import { LogoText } from "@/components/site/logo";

/** Футер маркетинговых страниц (как на главной под формой). */
export function SiteMarketingFooter() {
  return (
    <footer className="flex w-full flex-col gap-4 px-4 py-5 text-sm text-[#6B6B6B] sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-8">
      <div className="shrink-0">
        <LogoText alt="Skybric" width={138} height={40} className="!h-7 !w-auto sm:!h-8" />
      </div>
      <p>© 2026 Skybric. Все права защищены.</p>
      <Link href="/contact" className="hover:text-[#6D4AFF]">
        Контакты
      </Link>
    </footer>
  );
}
