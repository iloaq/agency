import Link from "next/link";
import { loginAdminAction } from "./actions";

type Props = { searchParams: Promise<{ err?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const err = sp.err;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-5 py-20">
      <div>
        <h1 className="text-2xl font-semibold">Вход в админку</h1>
        <p className="mt-2 text-sm text-[var(--fonts-grey)]">
          Контент Supabase. Переменные окружения — см.{" "}
          <code className="rounded bg-[var(--bg-quaternary)] px-1">.env.example</code>.
        </p>
      </div>
      {err === "auth" ? (
        <p className="text-sm text-[var(--fonts-error)]">Неверный пароль.</p>
      ) : null}
      {err === "config" ? (
        <p className="text-sm text-[var(--fonts-error)]">
          Не заданы секреты админки или подписи cookie (см. .env.example).
        </p>
      ) : null}
      <form action={loginAdminAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Пароль
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded-[var(--rad-lg)] border border-[#DCD3C8] bg-[var(--bg-secondary)] px-3 py-2 text-base outline-none ring-[var(--accent-violet)] focus:ring-2"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-[var(--buttons-black-normal)] px-5 py-2.5 text-sm font-semibold text-[var(--fonts-white)] transition hover:bg-[var(--buttons-black-hover)]"
        >
          Войти
        </button>
      </form>
      <div className="flex flex-col gap-3 text-sm text-[var(--fonts-grey)]">
        <Link href="/" className="underline-offset-4 hover:underline">
          На сайт
        </Link>
        <form action="/admin/logout" method="post">
          <button type="submit" className="text-xs underline underline-offset-2 hover:text-[var(--fonts-black)]">
            Сбросить cookie сессии
          </button>
        </form>
      </div>
    </main>
  );
}
