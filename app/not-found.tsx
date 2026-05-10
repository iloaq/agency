import Link from "next/link";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";
import { LogoText } from "@/components/site/logo";

export default function NotFoundPage() {
  return (
    <main className="min-h-[calc(100svh-88px)] bg-[#F6F3EE] px-5 py-10 text-[#121212] sm:px-8 lg:px-10">
      <section className="grid min-h-[calc(100svh-168px)] place-items-center">
        <div className="w-full max-w-6xl rounded-[36px] border border-[#E6E0D8] bg-white p-6 shadow-[0_24px_80px_rgba(72,57,41,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <LogoText className="text-2xl" alt="Skybric" />
              <p className="mt-12 text-sm font-semibold uppercase tracking-[0.14em] text-[#6D4AFF]">Ошибка 404</p>
              <h1 className="mt-5 max-w-2xl text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.92] tracking-normal">
                Страница ушла в бэклог
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
                Кажется, такой ссылки больше нет. Не будем искать виноватого менеджера: вернёмся на главную или сразу к услугам.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#18181B] px-6 text-base font-semibold text-white transition hover:bg-black"
                >
                  <FiHome className="size-5" />
                  На главную
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-[#E6E0D8] bg-[#F6F3EE] px-6 text-base font-semibold text-[#121212] transition hover:border-[#6D4AFF]/40 hover:text-[#6D4AFF]"
                >
                  <FiArrowLeft className="size-5 rotate-180" />
                  Посмотреть услуги
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#18181B] p-5 text-white shadow-[0_24px_80px_rgba(24,24,27,0.18)]">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-white/72">Системный лог</p>
                  <span className="rounded-full bg-[#B8FF5C] px-3 py-1 text-xs font-semibold text-[#121212]">meme mode</span>
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    ["GET /old-page", "404"],
                    ["route.exists", "false"],
                    ["next.step", "вернуться к нормальному маршруту"],
                  ].map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#222226] px-4 py-3">
                      <span className="font-mono text-sm text-white/62">{key}</span>
                      <span className="font-mono text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[24px] bg-white p-5 text-[#121212]">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-full bg-[#F0EAFF] text-[#6D4AFF]">
                    <FiSearch className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">Что проверить первым?</p>
                    <p className="mt-1 text-sm text-[#6B6B6B]">Адрес страницы, старую ссылку или пункт меню.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
