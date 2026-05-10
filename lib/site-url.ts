export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://skybric.kz"
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
