import { cn } from "@/lib/utils/cn";

export function LogoCloud({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-4", className)}>
      {items.map((name) => (
        <div
          key={name}
          className="glass-panel flex items-center justify-center px-4 py-3"
        >
          <span className="metric text-xs tracking-[0.14em] text-[rgb(var(--text-primary-rgb)/0.72)]">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

