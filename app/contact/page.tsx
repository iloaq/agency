import type { Metadata } from "next";
import { ServiceLeadForm } from "@/components/services/service-lead-form";
import { resolveSiteContacts } from "@/lib/site/site-contacts";

export const metadata: Metadata = {
  title: {
    absolute: "Контакты Skybric — обсудить сайт, веб-сервис, CRM или автоматизацию",
  },
  description:
    "Оставьте заявку на разработку сайта, веб-сервиса, Telegram-бота, CRM-интеграции, SEO или автоматизацию процесса.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const contacts = await resolveSiteContacts();

  return (
    <main className="min-h-screen bg-[#F6F3EE] pb-24 pt-10 text-[#121212] lg:pb-32 lg:pt-14">
      <section className="px-5 sm:px-8 lg:px-10">
        <div className="w-full min-w-0">
          <h1 className="text-[clamp(2.55rem,6.4vw,7rem)] font-semibold leading-[0.94]">
            Обсудим задачу и подскажем, с чего лучше начать
          </h1>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
            <div>
              <p className="max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9">
                Опишите процесс, который забирает время, теряет заявки или требует ручной работы.
                Мы посмотрим, какой формат решения подойдёт: сайт, веб-сервис, Telegram-бот,
                CRM-интеграция, SEO или автоматизация.
              </p>

              <div className="mt-10 grid gap-5 rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_36px_rgba(72,57,41,0.05)]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                    Email
                  </p>
                  <a href={`mailto:${contacts.email}`} className="mt-2 inline-flex text-2xl font-semibold">
                    {contacts.email}
                  </a>
                </div>
              </div>
            </div>

            <ServiceLeadForm serviceSlug="contact" serviceTitle="Контактная страница Skybric" />
          </div>
        </div>
      </section>
    </main>
  );
}
