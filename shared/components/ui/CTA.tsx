import { Card } from "./Card";
import { Button } from "./Button";
import { Magnetic } from "@/shared/motion";

export function CTA({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Card className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <div className="text-base text-[rgb(var(--text-primary-rgb)/0.92)]">
          {title}
        </div>
        <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
          {description}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {secondary ? (
          <Button variant="secondary" href={secondary.href}>
            {secondary.label}
          </Button>
        ) : null}
        <Magnetic>
          <Button variant="primary" href={primary.href}>
            {primary.label}
          </Button>
        </Magnetic>
      </div>
    </Card>
  );
}

