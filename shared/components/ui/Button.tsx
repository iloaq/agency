// Button component (Dark Lab).
// Source: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "icon-only";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    prefetch?: boolean;
  };

export type ButtonProps = AsButton | AsLink;

function getButtonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border px-4 py-2 text-sm font-medium " +
    "transition-[color,background-color,border-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
    "disabled:pointer-events-none disabled:opacity-50 focus-ring";

  const sizes: Record<ButtonSize, string> = {
    default: "h-10",
    "icon-only": "h-10 w-10 px-0",
  };

  // Outline → fill on hover (без теней; glow только на hover/focus).
  const variants: Record<ButtonVariant, string> = {
    primary:
      "border-[rgb(var(--accent-primary-rgb)/0.7)] text-[rgb(var(--text-primary-rgb)/0.92)] " +
      "before:absolute before:inset-0 before:-z-10 before:bg-[var(--accent-primary)] before:origin-left before:scale-x-0 " +
      "before:transition-transform before:duration-[var(--duration-fast)] before:ease-[var(--ease-standard)] " +
      "hover:before:scale-x-100 hover:text-[var(--bg-base)] " +
      "hover:shadow-[0_0_0_3px_rgb(var(--accent-primary-rgb)/0.18)]",
    secondary:
      "border-[rgb(var(--border-subtle-rgb)/0.65)] text-[rgb(var(--text-primary-rgb)/0.86)] bg-[rgb(var(--bg-surface-rgb)/0.25)] " +
      "hover:border-[rgb(var(--accent-primary-rgb)/0.55)] hover:text-[rgb(var(--text-primary-rgb)/0.95)] " +
      "hover:shadow-[0_0_0_3px_rgb(var(--accent-primary-rgb)/0.10)]",
  };

  return cn(base, sizes[size], variants[variant], className);
}

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "default",
    iconLeft,
    iconRight,
    children,
    className,
  } = props;

  const classes = getButtonClasses(variant, size, className);

  const content = (
    <>
      {iconLeft ? <span className="relative z-10 flex-shrink-0">{iconLeft}</span> : null}
      {children ? <span className="relative z-10">{children}</span> : null}
      {iconRight ? <span className="relative z-10 flex-shrink-0">{iconRight}</span> : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, prefetch, target, rel, ...rest } = props as AsLink;

    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={target === "_blank" ? rel ?? "noopener noreferrer" : rel}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} prefetch={prefetch} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { ...rest } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
