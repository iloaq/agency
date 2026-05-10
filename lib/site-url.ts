/**
 * Канонический origin сайта. Должен совпадать с тем URL, под которым сайт открывается
 * в браузере и с ресурсом в Search Console / Яндекс.Вебмастер (www или apex — одно значение).
 * Иначе в sitemap попадут «чужие» URL → «недопустим для этого местоположения».
 * См. https://yandex.ru/support/webmaster/ru/error-dictionary/sitemap
 */
export const siteBrandHostnames = ["skybric.kz", "skybric.com"] as const;

function normalizeSiteUrl(input: string): string {
  const trimmed = input.trim().replace(/\/+$/, "");
  if (!trimmed) return `https://${siteBrandHostnames[0]}`;

  const localHttp =
    /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?\/?$/i.test(trimmed) ||
    /^https:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?\/?$/i.test(trimmed);

  let withProto = trimmed;
  if (!/^https?:\/\//i.test(withProto)) {
    withProto = `https://${withProto.replace(/^\/+/, "")}`;
  }

  if (!localHttp && /^http:\/\//i.test(withProto)) {
    withProto = withProto.replace(/^http:\/\//i, "https://");
  }

  return withProto.replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://skybric.kz",
);

/** Для директивы Host в robots.txt (Яндекс — без схемы). */
export function siteRobotsHost(): string {
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return siteBrandHostnames[0];
  }
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

/** Публичные зеркала (https) — для подсказок ботам; sitemap ссылается только на siteUrl. */
export function siteBrandOrigins(): string[] {
  return siteBrandHostnames.map((host) => `https://${host}`);
}
