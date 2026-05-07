export function getClientId() {
  if (typeof document === "undefined") return "";

  const gaCookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("_ga="));

  if (!gaCookie) return "";
  return decodeURIComponent(gaCookie.replace("_ga=", ""));
}
