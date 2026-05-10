import Link from "next/link";

/* Next.js Image: https://nextjs.org/docs/app/getting-started/images */

export function SiteLogoLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={[
        "inline-flex shrink-0 items-center text-xl font-extrabold tracking-[0.02em] text-[#121212] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-violet",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      SKYBRIC
    </Link>
  );
}
