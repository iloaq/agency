import Link from "next/link";
import { loginAdminAction } from "./actions";

type Props = { searchParams: Promise<{ err?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const err = sp.err;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-[#ded6ca] bg-white p-6 shadow-[0_24px_80px_rgba(24,24,27,0.08)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d4aff]">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#111111]">Вход в панель</h1>
          <p className="mt-3 text-sm leading-6 text-[#6b6b6b]">
            Доступ закрыт паролем. Настройки окружения описаны в{" "}
            <code className="rounded bg-[#f3eee3] px-1.5 py-0.5 font-mono text-xs">.env.example</code>.
          </p>

          {err === "auth" ? (
            <p className="mt-5 rounded-[18px] border border-[#f5c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#b42318]">
              Неверный пароль.
            </p>
          ) : null}
          {err === "config" ? (
            <p className="mt-5 rounded-[18px] border border-[#f5c2bd] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#b42318]">
              Не заданы секреты админки или подписи cookie.
            </p>
          ) : null}

          <form action={loginAdminAction} className="mt-6 space-y-4">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#111111]">
              Пароль
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full rounded-[18px] border border-[#ded6ca] bg-white px-4 py-3 text-base text-[#111111] outline-none transition focus:border-[#6d4aff] focus:ring-4 focus:ring-[#6d4aff]/12"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-[#18181b] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d4aff]"
            >
              Войти
            </button>
          </form>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <Link href="/" className="font-semibold text-[#6d4aff] hover:text-[#4d32ce]">
            На сайт
          </Link>
          <form action="/admin/logout" method="post">
            <button type="submit" className="text-[#8a8177] underline-offset-4 hover:text-[#111111] hover:underline">
              Сбросить cookie
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
