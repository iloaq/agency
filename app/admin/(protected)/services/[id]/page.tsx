import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/admin/supabase-admin";
import type { ServiceRow } from "@/lib/supabase/fetch-services";
import { ServiceForm } from "../service-form";

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ err?: string; saved?: string }>;
};

export default async function AdminServiceEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const isNew = id === "new";

  if (!isNew && !uuidRe.test(id)) {
    notFound();
  }

  let row: ServiceRow | null = null;
  if (!isNew) {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
    if (error || !data) notFound();
    row = data as ServiceRow;
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-[var(--fonts-grey)]">
        <Link href="/admin/services" className="underline-offset-2 hover:underline">
          Услуги
        </Link>
        <span className="mx-2">/</span>
        <span>{isNew ? "Новая" : row?.slug}</span>
      </nav>
      {sp.saved === "1" ? (
        <p className="text-sm text-[var(--fonts-success)]">Сохранено.</p>
      ) : null}
      {sp.err === "badjson" ? (
        <p className="text-sm text-[var(--fonts-error)]">Поле content должно быть JSON-объектом.</p>
      ) : null}
      {sp.err === "required" ? (
        <p className="text-sm text-[var(--fonts-error)]">Заполните обязательные поля.</p>
      ) : null}
      {sp.err === "db" ? (
        <p className="text-sm text-[var(--fonts-error)]">Ошибка записи в Supabase.</p>
      ) : null}
      <h1 className="text-2xl font-semibold">{isNew ? "Новая услуга" : "Редактирование услуги"}</h1>
      <ServiceForm row={row} />
    </div>
  );
}
