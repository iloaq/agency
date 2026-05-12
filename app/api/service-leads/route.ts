import { NextResponse } from "next/server";
import { normalizeServiceLead, validateServiceLead } from "@/lib/leads/validate-service-lead";
import { getSupabaseAnonOrPublishableKey, getSupabaseProjectUrl } from "@/lib/supabase/project-env";

export const runtime = "nodejs";

const genericError = "Не удалось отправить заявку. Проверьте данные или попробуйте позже.";

function decodeJwtPayload(key: string) {
  const [, payload] = key.split(".");
  if (!payload) return null;

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      role?: string;
    };
  } catch {
    return null;
  }
}

function isForbiddenSupabaseKey(key: string) {
  if (key.startsWith("sb_secret_")) return true;
  const payload = decodeJwtPayload(key);
  return payload?.role === "service_role";
}

/** Anon/publishable key в env; без этого POST /api/service-leads отдаёт 503. */
function resolveSupabase():
  | { ok: true; url: string; key: string }
  | { ok: false; message: string } {
  const url = getSupabaseProjectUrl();
  const keyRaw = getSupabaseAnonOrPublishableKey();

  if (!url) {
    return {
      ok: false,
      message:
        "Сервер: не задан URL проекта Supabase. В CapRover укажите SUPABASE_URL или NEXT_PUBLIC_SUPABASE_URL (достаточно одного) и перезапустите приложение.",
    };
  }
  if (!keyRaw) {
    return {
      ok: false,
      message:
        "Сервер: не задан публичный ключ Supabase. В CapRover добавьте SUPABASE_ANON_KEY или SUPABASE_PUBLISHABLE_KEY (тот же ключ, что anon/publishable в Dashboard — в runtime), либо задайте NEXT_PUBLIC_* при сборке в CI.",
    };
  }
  if (isForbiddenSupabaseKey(keyRaw)) {
    return {
      ok: false,
      message:
        "Сервер: нужен anon или publishable ключ (Settings → API), не service_role.",
    };
  }

  return {
    ok: true,
    url,
    key: keyRaw,
  };
}

type SupabaseConfig = { url: string; key: string };
type LeadInsertPayload = Record<string, string | null>;

function insertLead(
  supabase: SupabaseConfig,
  headers: HeadersInit,
  payload: LeadInsertPayload
) {
  return fetch(`${supabase.url}/rest/v1/service_leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  }).catch(() => null);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ message: genericError }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  const lead = normalizeServiceLead(body);
  const validationError = validateServiceLead(lead);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const supabaseRes = resolveSupabase();
  if (!supabaseRes.ok) {
    return NextResponse.json({ message: supabaseRes.message }, { status: 503 });
  }
  const supabase: SupabaseConfig = supabaseRes;

  const basePayload: LeadInsertPayload = {
    service_slug: lead.service_slug,
    service_title: lead.service_title,
    name: lead.name ?? null,
    phone: lead.phone ?? null,
    email: lead.email ?? null,
    telegram: lead.telegram ?? null,
    company: lead.company ?? null,
    message: lead.message,
    source_page: lead.source_page ?? null,
    utm_source: lead.utm_source ?? null,
    utm_medium: lead.utm_medium ?? null,
    utm_campaign: lead.utm_campaign ?? null,
    utm_content: lead.utm_content ?? null,
    utm_term: lead.utm_term ?? null,
    client_id: lead.client_id ?? null,
    preferred_contact: lead.preferred_contact ?? null,
  };
  const hasQualificationFields = Boolean(
    lead.service_interest || lead.project_stage || lead.budget_band
  );
  const payload: LeadInsertPayload = hasQualificationFields
    ? {
        ...basePayload,
        service_interest: lead.service_interest ?? null,
        project_stage: lead.project_stage ?? null,
        budget_band: lead.budget_band ?? null,
      }
    : basePayload;

  const headers: HeadersInit = {
    apikey: supabase.key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  if (supabase.key.split(".").length === 3) {
    headers.Authorization = `Bearer ${supabase.key}`;
  }

  const stripPreferred = (p: LeadInsertPayload) => {
    const rest = { ...p };
    delete rest.preferred_contact;
    return rest;
  };

  let response = await insertLead(supabase, headers, payload);

  if (!response?.ok && lead.preferred_contact) {
    response = await insertLead(supabase, headers, stripPreferred(payload));
  }

  if (!response?.ok && hasQualificationFields) {
    const legacyPayload = stripPreferred(basePayload);
    const legacyResponse = await insertLead(supabase, headers, legacyPayload);

    if (legacyResponse?.ok) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }
  }

  if (!response?.ok) {
    return NextResponse.json({ message: genericError }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
