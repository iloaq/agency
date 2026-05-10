import Link from "next/link";
import type { ReactNode } from "react";

/* Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav */

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  /** Текущая страница — не ссылка, жирный текст */
  current?: boolean;
  disabled?: boolean;
};

export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  /** aria-label для nav */
  "aria-label"?: string;
  className?: string;
};

const crumbBase =
  "inline-flex max-w-full items-center rounded-md pb-0.5 text-sm leading-5 transition-colors";

const parentLink =
  `${crumbBase} text-fonts-grey outline-none hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-charts-green-data focus-visible:bg-background-tertiary focus-visible:text-fonts-black focus-visible:outline-none`;

const parentDisabled = `${crumbBase} cursor-not-allowed text-fonts-grey opacity-50`;

const currentPage = `${crumbBase} cursor-default font-semibold text-fonts-black`;

export function BreadcrumbHomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3.5 8.5L10 3l6.5 5.5V16a1 1 0 01-1 1h-4v-5H8.5v5h-4a1 1 0 01-1-1V8.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isCurrent(item: BreadcrumbItem, index: number, total: number) {
  if (item.current) return true;
  if (index === total - 1 && !item.href) return true;
  return false;
}

export function Breadcrumb({
  items,
  className,
  "aria-label": ariaLabel = "Хлебные крошки",
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className="flex flex-wrap items-center gap-0">
        {items.map((item, index) => {
          const current = isCurrent(item, index, items.length);
          const showDivider = index > 0;

          return (
            <li key={index} className="flex items-center gap-0">
              {showDivider ? (
                <span
                  className="select-none px-0 text-fonts-grey"
                  aria-hidden
                >
                  /
                </span>
              ) : null}
              <span className="min-w-0">
                {current ? (
                  <span className={currentPage} aria-current="page">
                    {item.label}
                  </span>
                ) : item.disabled || !item.href ? (
                  <span className={parentDisabled}>{item.label}</span>
                ) : (
                  <Link href={item.href} className={parentLink}>
                    {item.label}
                  </Link>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
