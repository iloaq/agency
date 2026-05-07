import { NextResponse } from "next/server";
import { normalizeServiceLead, validateServiceLead } from "@/lib/leads/validate-service-lead";

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

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || isForbiddenSupabaseKey(key)) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    key,
  };
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

  const supabase = getSupabaseConfig();
  if (!supabase) {
    return NextResponse.json({ message: genericError }, { status: 503 });
  }

  const payload = {
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
  };

  const headers: HeadersInit = {
    apikey: supabase.key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  if (supabase.key.split(".").length === 3) {
    headers.Authorization = `Bearer ${supabase.key}`;
  }

  const response = await fetch(`${supabase.url}/rest/v1/service_leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json({ message: genericError }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
