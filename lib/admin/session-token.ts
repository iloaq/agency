/**
 * Подписанная cookie admin_session (Web Crypto — совместимо с Edge middleware).
 * Source: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
 */

const enc = new TextEncoder();

function toBase64UrlBytes(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function toBase64Url(buf: ArrayBuffer): string {
  return toBase64UrlBytes(new Uint8Array(buf));
}

function base64UrlToBytes(b64url: string): Uint8Array | null {
  try {
    const pad = b64url.length % 4 === 0 ? "" : "=".repeat(4 - (b64url.length % 4));
    const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function hmacSha256B64Url(secret: string, message: string): Promise<string> {
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toBase64Url(sig);
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) x |= a[i]! ^ b[i]!;
  return x === 0;
}

/** maxAgeSec по умолчанию 7 суток. */
export async function createAdminSessionToken(
  secret: string,
  maxAgeSec = 60 * 60 * 24 * 7,
): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSec;
  const payload = JSON.stringify({ exp, v: 1 });
  const payloadB64 = toBase64UrlBytes(enc.encode(payload));
  const sig = await hmacSha256B64Url(secret, payloadB64);
  return `${payloadB64}.${sig}`;
}

export async function verifyAdminSessionToken(token: string, secret: string): Promise<boolean> {
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);
  if (!payloadB64 || !sigB64) return false;

  const expectedSigBytes = base64UrlToBytes(await hmacSha256B64Url(secret, payloadB64));
  const actualSigBytes = base64UrlToBytes(sigB64);
  if (!expectedSigBytes || !actualSigBytes) return false;
  if (!timingSafeEqualBytes(expectedSigBytes, actualSigBytes)) return false;

  const payloadBytes = base64UrlToBytes(payloadB64);
  if (!payloadBytes) return false;
  let parsed: { exp?: number };
  try {
    parsed = JSON.parse(new TextDecoder().decode(payloadBytes)) as { exp?: number };
  } catch {
    return false;
  }
  if (typeof parsed.exp !== "number") return false;
  return parsed.exp > Math.floor(Date.now() / 1000);
}
