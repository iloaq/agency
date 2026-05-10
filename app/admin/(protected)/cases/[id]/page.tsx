import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { AdminPageHeader, AdminPanel } from "@/components/admin/admin-ui";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { CaseStudyRow } from "@/lib/cases/case-study-types";
import { CaseStudyForm } from "../case-study-form";

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ err?: string; saved?: string }>;
};

function Feedback({ saved, err }: { saved?: string; err?: string }) {
  if (saved === "1") {
    return <p className="rounded-[18px] border border-[#cceec8] bg-[#f1ffed] px-4 py-3 text-sm font-medium text-[#245b20]">Сохранено.</p>;
  }
  if (!err) return null;

  const message =
    err === "badjson"
      ? "В одном из JSON-полей некорректная структура."
      : err === "required"
        ? "Заполните slug и название."
        : "Ошибка записи в Supabase.";

  return <p className="rounded-[18px] border border-[#f5c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#b42318]">{message}</p>;
}

export default async function AdminCaseEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const isNew = id === "new";

  if (!isNew && !uuidRe.test(id)) notFound();

  let row: CaseStudyRow | null = null;
  if (!isNew) {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from("case_studies").select("*").eq("id", id).maybeSingle();
    if (error || !data) notFound();
    row = data as CaseStudyRow;
  }

  return (
    <div className="space-y-7">
      <Link href="/admin/cases" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d4aff] hover:text-[#4d32ce]">
        <FiArrowLeft className="size-4" />
        К списку проектов
      </Link>

      <AdminPageHeader
        eyebrow="Проект"
        title={isNew ? "Новый проект" : "Редактирование проекта"}
        description={isNew ? "Создайте новый разбор задачи." : `Редактируется запись ${row?.slug}.`}
      />

      <Feedback saved={sp.saved} err={sp.err} />

      <AdminPanel className="p-5 text-sm leading-6 text-[#6b6b6b]">
        Не добавляйте неподтверждённые цифры, клиентов и результаты. Если данных нет, описывайте задачу, ограничения и архитектуру решения.
      </AdminPanel>

      <CaseStudyForm row={row} />
    </div>
  );
}
