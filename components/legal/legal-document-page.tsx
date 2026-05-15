import Link from "next/link";
import type { LegalDocument } from "@/lib/legal/legal-documents";

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <main className="min-h-screen bg-[#F6F3EE] pb-24 pt-10 text-[#121212] lg:pb-32 lg:pt-14">
      <section className="px-5 sm:px-8 lg:px-10">
        <div className="w-full min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6D4AFF]">
            Документы сайта
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.55rem,6.4vw,6.5rem)] font-semibold leading-[0.96]">
            {document.title}
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-7 text-[#4B4B4B] sm:text-xl sm:leading-9">
            {document.description}
          </p>
        </div>
      </section>

      <section className="mt-12 px-5 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
          <aside className="rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_36px_rgba(72,57,41,0.05)] lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
              Обновлено
            </p>
            <p className="mt-2 text-lg font-semibold">{document.updatedAt}</p>
            <div className="mt-7 border-t border-[#E6E0D8] pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
                Контакт
              </p>
              <a
                href={`mailto:${document.contactEmail}`}
                className="mt-2 inline-flex break-all text-lg font-semibold text-[#121212] transition hover:text-[#6D4AFF]"
              >
                {document.contactEmail}
              </a>
            </div>
            <p className="mt-7 text-sm leading-6 text-[#6B6B6B]">
              Документ описывает публичный слой сайта. Перед использованием как
              юридически значимого документа его стоит сверить с юристом под вашу
              фактическую модель обработки данных.
            </p>
          </aside>

          <div className="grid gap-4">
            {document.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[30px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_36px_rgba(72,57,41,0.05)] sm:p-8"
              >
                <h2 className="text-2xl font-semibold leading-8 sm:text-3xl sm:leading-10">
                  {section.title}
                </h2>
                {section.paragraphs ? (
                  <div className="mt-5 grid gap-4 text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
                {section.items ? (
                  <ul className="mt-5 grid gap-3 text-base leading-7 text-[#4B4B4B] sm:text-lg sm:leading-8">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#6D4AFF]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 rounded-[30px] border border-[#DCD3C8] bg-[#EFE9DF] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base leading-7 text-[#4B4B4B]">
            Остались вопросы по обработке данных или документам сайта?
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#18181B] px-6 text-sm font-semibold text-white transition hover:bg-[#2B2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D4AFF]"
          >
            Связаться
          </Link>
        </div>
      </section>
    </main>
  );
}
