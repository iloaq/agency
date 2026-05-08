"use client";

export function AdminDeleteTrigger({ formId, label = "Удалить" }: { formId: string; label?: string }) {
  return (
    <button
      type="button"
      className="rounded-full border border-[var(--fonts-error)] px-4 py-2 text-sm font-medium text-[var(--fonts-error)] transition hover:bg-[var(--bg-quaternary)]"
      onClick={() => {
        if (confirm("Удалить запись? Необратимо.")) {
          const el = document.getElementById(formId) as HTMLFormElement | null;
          el?.requestSubmit();
        }
      }}
    >
      {label}
    </button>
  );
}
