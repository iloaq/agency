import Link from "next/link";
import { LogoMark, LogoText } from "@/components/site/logo";

/* Next.js Image: https://nextjs.org/docs/app/getting-started/images */

export function SiteLogoLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Skybric — на главную"
      className={[
        "inline-flex shrink-0 items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-violet",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <LogoMark
        alt=""
        width={36}
        height={36}
        className="!h-9 !w-9 max-w-none shrink-0"
      />
      <LogoText
        alt=""
        width={138}
        height={40}
        className="!h-7 !w-auto max-w-[min(138px,46vw)] shrink-0 sm:!h-8"
      />
    </Link>
  );
}
