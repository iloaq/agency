import Link from "next/link";
import { loginAdminAction } from "./actions";

type Props = { searchParams: Promise<{ err?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const err = sp.err;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-5 py-16 sm:py-24">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Панель</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">Вход</h1>
        <p className="mt-2 text-sm text-slate-400">
          Переменные окружения — см.{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-300">.env.example</code>
          .
        </p>
      </div>
      {err === "auth" ? <p className="text-sm text-rose-400">Неверный пароль.</p> : null}
      {err === "config" ? (
        <p className="text-sm text-rose-400">Не заданы секреты админки или подписи cookie (см. .env.example).</p>
      ) : null}
      <form action={loginAdminAction} className="flex flex-col gap-4 rounded-xl border border-slate-700/80 bg-slate-900/50 p-5">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          Пароль
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-base text-white outline-none ring-violet-500/40 focus:ring-2"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Войти
        </button>
      </form>
      <div className="flex flex-col gap-3 text-sm text-slate-500">
        <Link href="/" className="text-slate-400 underline-offset-4 hover:text-white hover:underline">
          На сайт
        </Link>
        <form action="/admin/logout" method="post">
          <button type="submit" className="text-xs text-slate-600 underline underline-offset-2 hover:text-slate-400">
            Сбросить cookie сессии
          </button>
        </form>
      </div>
    </main>
  );
}
