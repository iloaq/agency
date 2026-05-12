import type { SiteContacts } from "@/lib/site/site-contacts-model";

export type HeaderNavLink = {
  href: string;
  label: string;
};

export const mainNav = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Проекты" },
  { href: "/process", label: "Подход" },
  { href: "/about", label: "Команда" },
  { href: "/contact", label: "Контакты" },
] as const;

export const overlayPrimary = mainNav;

export function buildOverlayColumns(
  contacts: SiteContacts,
  serviceLinks: ReadonlyArray<HeaderNavLink>,
) {
  return [
    {
      title: "Услуги",
      links: serviceLinks.length > 0 ? serviceLinks : [{ href: "/services", label: "Все услуги" }],
    },
    {
      title: "Разделы",
      links: [
        { href: "/cases", label: "Разборы задач" },
        { href: "/process", label: "Как мы работаем" },
        { href: "/about", label: "О команде" },
        { href: "/ai-audit", label: "Аудит процессов и автоматизации" },
      ],
    },
    {
      title: "Контакт",
      links: [
        { href: "/contact", label: "Оставить заявку" },
        { href: `mailto:${contacts.email}`, label: contacts.email },
      ],
    },
  ];
}
