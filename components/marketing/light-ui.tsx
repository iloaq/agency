import Link from "next/link";
import type { ReactNode } from "react";

const colors = {
  text: "#121212",
  muted: "#6B6B6B",
  border: "#E6E0D8",
  soft: "#F6F3EE",
  accent: "#6D4AFF",
};

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      {children}
    </main>
  );
}

export function LightGradientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none hidden"
    />
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div
      className={[
        "mb-10 grid gap-5 lg:mb-12",
        center ? "mx-auto max-w-4xl text-center" : "lg:grid-cols-[0.9fr_1.1fr] lg:items-end",
      ].join(" ")}
    >
      <div>
        <span className="sr-only">{eyebrow}</span>
        <h2 className="text-[clamp(2.3rem,4.6vw,4.5rem)] font-semibold leading-[0.98] tracking-normal text-[#121212]">
          {title}
        </h2>
      </div>
      {text ? (
        <p
          className={[
            "text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8",
            center ? "mx-auto max-w-3xl" : "max-w-3xl lg:justify-self-end",
          ].join(" ")}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "bg-[#18181B] text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)] hover:bg-[#2B2B31]"
      : "border border-[#E6E0D8] bg-white text-[#121212] hover:border-[#6D4AFF]/45 hover:text-[#6D4AFF]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-13 w-full items-center justify-center rounded-full px-6 text-center text-base font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF] sm:w-auto ${className}`}
    >
      {children}
    </Link>
  );
}

export function SurfaceCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-[#E6E0D8] bg-white shadow-[0_18px_55px_rgba(72,57,41,0.07)] ${className}`}
    >
      {children}
    </div>
  );
}

export function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-[#E6E0D8] bg-[#F6F3EE] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B]">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold leading-7 text-[#121212]">{value}</p>
    </div>
  );
}

export function HeroFlowVisual({
  title = "Коммерческий контур",
  nodes = ["Новая заявка", "Проверка контекста", "CRM", "Follow-up"],
  footer = ["источник", "статус", "следующий шаг"],
}: {
  title?: string;
  nodes?: string[];
  footer?: string[];
}) {
  return (
    <SurfaceCard className="relative overflow-hidden p-4 sm:p-5 lg:p-6">
      <div className="rounded-[22px] border border-[#E6E0D8] bg-[#F6F3EE] p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-[#121212]">{title}</p>
          <span className="rounded-full bg-[#B8FF5C] px-3 py-1 text-xs font-bold text-[#121212]">
            в работе
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          {nodes.map((node, index) => (
            <div key={node} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#6D4AFF] ring-1 ring-[#E6E0D8]">
                  {index + 1}
                </span>
                {index < nodes.length - 1 ? <span className="h-8 w-px bg-[#DCD3C8]" /> : null}
              </div>
              <div className="min-w-0 rounded-[18px] border border-[#E6E0D8] bg-white p-3">
                <p className="text-base font-bold text-[#121212]">{node}</p>
                <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                  {index === 0
                    ? "канал, контакт, контекст"
                    : index === 1
                      ? "сценарий, приоритет, вопрос"
                      : index === 2
                        ? "карточка, статус, ответственный"
                        : "задача, напоминание, контроль"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {footer.map((item) => (
            <MetricCard key={item} label="фиксируем" value={item} />
          ))}
        </div>
      </div>
    </SurfaceCard>
  );
}

export function IntegrationVisual() {
  const systems = ["Сайт", "Telegram", "CRM", "1С", "Email", "База знаний"];

  return (
    <SurfaceCard className="p-5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#6D4AFF]">
          интеграции
        </p>
        <span className="rounded-full bg-[#B8FF5C] px-3 py-1 text-xs font-bold text-[#121212]">
          API / workflow
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_0.9fr_1fr] sm:items-center">
        <div className="grid gap-3">
          {systems.slice(0, 3).map((system) => (
            <div key={system} className="rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] p-4 text-sm font-bold text-[#121212]">
              {system}
            </div>
          ))}
        </div>
        <div className="rounded-[24px] border border-[#E6E0D8] bg-white p-5 text-center shadow-[0_14px_40px_rgba(72,57,41,0.07)]">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6D4AFF]">Skybric</p>
          <p className="mt-2 text-2xl font-bold leading-7 text-[#121212]">логика решения</p>
        </div>
        <div className="grid gap-3">
          {systems.slice(3).map((system) => (
            <div key={system} className="rounded-[18px] border border-[#E6E0D8] bg-[#F6F3EE] p-4 text-sm font-bold text-[#121212]">
              {system}
            </div>
          ))}
        </div>
      </div>
    </SurfaceCard>
  );
}

export function FAQAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="mx-auto grid max-w-5xl gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[24px] border border-[#E6E0D8] bg-white p-5 shadow-[0_12px_40px_rgba(72,57,41,0.05)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-bold text-[#121212] marker:hidden">
            {item.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6F3EE] text-[#6D4AFF] transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#4B4B4B]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactCTA({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <section className="px-5 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24">
      <div className="grid gap-8 rounded-[34px] border border-[#2B2B31] bg-[#18181B] p-5 text-white shadow-[0_34px_100px_rgba(24,24,27,0.2)] sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <h2 className="text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[0.98] tracking-normal text-white">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">{text}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-5">
            <p className="text-base font-semibold leading-7 text-white/82">
              Без навязывания лишней разработки. Сначала разбираем процесс и только потом предлагаем решение.
            </p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

export const lightTokens = colors;
