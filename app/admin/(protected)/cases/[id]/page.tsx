import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { CaseStudyRow } from "@/lib/cases/case-study-types";
import { CaseStudyForm } from "../case-study-form";

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ err?: string; saved?: string }>;
};

export default async function AdminCaseEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const isNew = id === "new";

  if (!isNew && !uuidRe.test(id)) {
    notFound();
  }

  let row: CaseStudyRow | null = null;
  if (!isNew) {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from("case_studies").select("*").eq("id", id).maybeSingle();
    if (error || !data) notFound();
    row = data as CaseStudyRow;
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-[var(--fonts-grey)]">
        <Link href="/admin/cases" className="underline-offset-2 hover:underline">
          Кейсы
        </Link>
        <span className="mx-2">/</span>
        <span>{isNew ? "Новый" : row?.slug}</span>
      </nav>
      {sp.saved === "1" ? (
        <p className="text-sm text-[var(--fonts-success)]">Сохранено.</p>
      ) : null}
      {sp.err === "badjson" ? (
        <p className="text-sm text-[var(--fonts-error)]">Некорректный JSON в одном из полей.</p>
      ) : null}
      {sp.err === "required" ? (
        <p className="text-sm text-[var(--fonts-error)]">Заполните slug и title.</p>
      ) : null}
      {sp.err === "db" ? (
        <p className="text-sm text-[var(--fonts-error)]">Ошибка записи в Supabase.</p>
      ) : null}
      <h1 className="text-2xl font-semibold">{isNew ? "Новый кейс" : "Редактирование кейса"}</h1>
      <CaseStudyForm row={row} />
    </div>
  );
}
