import { timingSafeEqual } from "node:crypto";

// Source: https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b

/** Сравнение пароля с ADMIN_PASSWORD или ADMIN_SECRET (если задан только он). */
export function verifyAdminPassword(attempt: string, expected: string): boolean {
  const a = Buffer.from(attempt, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
