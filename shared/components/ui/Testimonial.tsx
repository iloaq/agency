import { Card } from "./Card";

export function Testimonial({
  quote,
  name,
  role,
  company,
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
}) {
  return (
    <Card className="space-y-4">
      <p className="text-sm leading-relaxed text-[rgb(var(--text-primary-rgb)/0.86)]">
        “{quote}”
      </p>
      <div className="text-xs text-[rgb(var(--text-primary-rgb)/0.72)]">
        <span className="text-[rgb(var(--text-primary-rgb)/0.9)]">{name}</span>
        {" · "}
        {role}
        {" · "}
        {company}
      </div>
    </Card>
  );
}

