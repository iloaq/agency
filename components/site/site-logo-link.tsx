import Image from "next/image";
import Link from "next/link";

/* Next.js Image: https://nextjs.org/docs/app/getting-started/images */

export function SiteLogoLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={[
        "inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-violet",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src="/logo_text.svg"
        alt="SKY BRIC"
        width={138}
        height={40}
        className="h-[40px] w-auto"
      />
    </Link>
  );
}
