export const mainNav = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/ai-audit", label: "ИИ-аудит" },
  { href: "/contact", label: "Контакты" },
] as const;

export const overlayPrimary = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/ai-audit", label: "ИИ-аудит" },
  { href: "/contact", label: "Контакты" },
] as const;

export const overlayColumns: {
  title: string;
  links: { href: string; label: string }[];
}[] = [
  {
    title: "Услуги",
    links: [
      { href: "/services/ai-agents", label: "ИИ-агенты" },
      { href: "/services/custom-ai-development", label: "Кастомная ИИ-разработка" },
      { href: "/services/web-development", label: "Сайты и веб-приложения" },
      { href: "/services/ai-crm-integrations", label: "ИИ в CRM" },
    ],
  },
  {
    title: "Типовые задачи",
    links: [
      { href: "/cases", label: "Заявки и CRM" },
      { href: "/cases", label: "Документы и КП" },
      { href: "/cases", label: "Кабинеты и порталы" },
    ],
  },
  {
    title: "Контакт",
    links: [
      { href: "/contact", label: "Оставить заявку" },
      { href: "mailto:hello@skybric.kz", label: "hello@skybric.kz" },
      { href: "tel:+77772550000", label: "+7 777 255-00-00" },
    ],
  },
];
