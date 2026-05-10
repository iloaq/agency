import type { CaseStudyRow, CaseStudyStack } from "./case-study-types";

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
}

export function asStack(value: unknown): CaseStudyStack {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const o = value as Record<string, unknown>;
  const pick = (k: keyof CaseStudyStack) =>
    typeof o[k] === "string" ? (o[k] as string) : undefined;
  return {
    frontend: pick("frontend"),
    backend: pick("backend"),
    database: pick("database"),
    integrations: pick("integrations"),
  };
}

export function formatStackLine(stack: CaseStudyStack): string {
  const parts: string[] = [];
  if (stack.frontend) parts.push(`frontend: ${stack.frontend}`);
  if (stack.backend) parts.push(`backend: ${stack.backend}`);
  if (stack.database) parts.push(`БД: ${stack.database}`);
  if (stack.integrations) parts.push(`интеграции: ${stack.integrations}`);
  return parts.length ? parts.join("; ") : "—";
}

/** Карточка списка /cases — поля совпадают с прежним хардкодом. */
export function rowToCaseCard(row: CaseStudyRow) {
  const problems = asStringArray(row.problems);
  const whatWeDid = asStringArray(row.what_we_did);
  const outcomes = asStringArray(row.outcomes);
  const stack = asStack(row.stack);

  const loss =
    row.context?.trim() ||
    (problems.length ? problems.map((p, i) => `${i + 1}. ${p}`).join(" ") : "—");

  const build =
    row.goal?.trim() ||
    (whatWeDid.length ? whatWeDid.join(" ") : "—");

  const easier =
    outcomes.length > 0
      ? outcomes.join(" ")
      : row.conclusion?.trim() || "—";

  return {
    key: row.id,
    href: `/cases/${row.slug}` as const,
    task: row.title,
    loss,
    build,
    systems: formatStackLine(stack),
    easier,
    sector: row.sector,
  };
}

export type CaseCardFromDb = ReturnType<typeof rowToCaseCard>;
