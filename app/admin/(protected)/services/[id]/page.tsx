import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { AdminPageHeader, AdminPanel } from "@/components/admin/admin-ui";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { ServiceRow } from "@/lib/supabase/fetch-services";
import { ServiceForm } from "../service-form";

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
      ? "Поле content должно быть корректным JSON-объектом."
      : err === "required"
        ? "Заполните обязательные поля."
        : "Ошибка записи в Supabase.";

  return <p className="rounded-[18px] border border-[#f5c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#b42318]">{message}</p>;
}

export default async function AdminServiceEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const isNew = id === "new";

  if (!isNew && !uuidRe.test(id)) notFound();

  let row: ServiceRow | null = null;
  if (!isNew) {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
    if (error || !data) notFound();
    row = data as ServiceRow;
  }

  return (
    <div className="space-y-7">
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d4aff] hover:text-[#4d32ce]"
      >
        <FiArrowLeft className="size-4" />
        К списку услуг
      </Link>

      <AdminPageHeader
        eyebrow="Услуга"
        title={isNew ? "Новая услуга" : "Редактирование услуги"}
        description={isNew ? "Создайте новую страницу услуги." : `Редактируется запись ${row?.slug}.`}
      />

      <Feedback saved={sp.saved} err={sp.err} />

      <AdminPanel className="p-5 text-sm leading-6 text-[#6b6b6b]">
        JSON-поле используется для расширенного контента страницы. Перед сохранением проверяйте структуру, чтобы публичная страница не получила пустые блоки.
      </AdminPanel>

      <ServiceForm row={row} />
    </div>
  );
}
