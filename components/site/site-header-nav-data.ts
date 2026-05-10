import type { SiteContacts } from "@/lib/site/site-contacts-model";

export const mainNav = [
  { href: "/services", label: "Услуги" },
  { href: "/process", label: "Подход" },
  { href: "/about", label: "Команда" },
  { href: "/contact", label: "Контакты" },
] as const;

export const overlayPrimary = mainNav;

export function buildOverlayColumns(contacts: SiteContacts) {
  return [
    {
      title: "Услуги",
      links: [
        { href: "/services/websites", label: "Сайты для бизнеса" },
        { href: "/services/web-app-development", label: "Веб-сервисы и кабинеты" },
        { href: "/services/telegram-bots", label: "Telegram-боты" },
        { href: "/services/crm-integrations", label: "CRM и интеграции" },
        { href: "/services/ai-automation", label: "AI-автоматизация" },
        { href: "/services/seo", label: "SEO" },
        { href: "/services/fintech-development", label: "Fintech-разработка" },
        { href: "/services/digital-support", label: "Digital-сопровождение" },
      ],
    },
    {
      title: "Разделы",
      links: [
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
