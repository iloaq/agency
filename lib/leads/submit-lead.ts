import type { LeadSubmitResult, ServiceLeadPayload } from "./types";

export async function submitLead(data: ServiceLeadPayload): Promise<LeadSubmitResult> {
  try {
    const response = await fetch("/api/service-leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null) as { message?: string } | null;
      return {
        ok: false,
        message:
          payload?.message ??
          "Не удалось отправить заявку. Проверьте данные или попробуйте позже.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Не удалось отправить заявку. Проверьте данные или попробуйте позже.",
    };
  }
}
