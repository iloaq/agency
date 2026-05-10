import Image from "next/image";
import type { ComponentProps } from "react";

type ImgProps = Omit<ComponentProps<typeof Image>, "src"> & {
  alt?: string;
};

/** Миниатюра — `public/logo.svg` (знак). */
export function LogoMark({ className, alt = "Sky Bric", ...props }: ImgProps) {
  return (
    <Image
      src="/logo.svg"
      alt={alt}
      width={101}
      height={101}
      className={["h-auto w-[clamp(2.5rem,8vw,4.5rem)] max-w-full", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

/** Текстовый логотип — `public/logo_text.svg`. */
export function LogoText({
  className,
  alt = "Sky Bric",
  ...props
}: ImgProps) {
  return (
    <Image
      src="/logo_text.svg"
      alt={alt}
      width={138}
      height={40}
      className={["h-auto w-[clamp(6rem,32vw,8.5rem)] max-w-full", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
