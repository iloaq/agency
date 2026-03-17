import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Grid({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn("grid grid-cols-12 gap-6 md:gap-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

