export const mainNav = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/process", label: "Процесс" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
] as const;

export const overlayPrimary = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/process", label: "Процесс" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
] as const;

export const overlayColumns: {
  title: string;
  links: { href: string; label: string }[];
}[] = [
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
    ],
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
      { href: "mailto:hello@skybric.kz", label: "hello@skybric.kz" },
      { href: "tel:+77772550000", label: "+7 777 255-00-00" },
    ],
  },
];
