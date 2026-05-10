"use client";

export function AdminDeleteTrigger({ formId, label = "Удалить" }: { formId: string; label?: string }) {
  return (
    <button
      type="button"
      className="rounded-full border border-[#f0aaa3] px-5 py-3 text-sm font-semibold text-[#b42318] transition hover:border-[#b42318] hover:bg-[#fff4f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b42318]"
      onClick={() => {
        if (confirm("Удалить запись? Это действие нельзя отменить.")) {
          const form = document.getElementById(formId) as HTMLFormElement | null;
          form?.requestSubmit();
        }
      }}
    >
      {label}
    </button>
  );
}
