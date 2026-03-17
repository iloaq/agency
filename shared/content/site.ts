// Контент-слой для сайта (без CMS): сервисы, кейсы, инсайты.
// Источник паттерна: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

export type SiteService = {
  slug:
    | "strategy"
    | "branding"
    | "product-design"
    | "web-engineering"
    | "ai-automation"
    | "performance-marketing";
  title: string;
  summary: string;
  outcomes: string[];
};

export type SiteCaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  timeframe: string;
  summary: string;
  services: SiteService["slug"][];
  metrics: Array<{ label: string; value: string }>;
  highlights: string[];
  stack: string[];
};

export type SiteArticle = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date string
  tags: string[];
};

export const services: SiteService[] = [
  {
    slug: "strategy",
    title: "Strategy",
    summary:
      "Убираем неопределённость перед релизом: кому строим, какую проблему решаем, как меряем эффект.",
    outcomes: [
      "Карта рисков и ограничений",
      "События/метрики + план измерений",
      "План релизов на 6–12 недель",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    summary:
      "Система доверия в интерфейсе: правила, которые не расползаются между командами и каналами.",
    outcomes: ["Типографика/токены/гайд", "UI‑kit и правила компонентов", "Tone of voice + шаблоны"],
  },
  {
    slug: "product-design",
    title: "Product Design",
    summary:
      "Сценарии, IA и прототипы для сложных ролей/данных — без «красоты поверх хаоса».",
    outcomes: ["Каркас IA + сценарии", "Прототип + UX‑спеки", "Критерии приёмки"],
  },
  {
    slug: "web-engineering",
    title: "Web Engineering",
    summary:
      "Инженерия как продукт: скорость, доступность, SEO и предсказуемые компоненты под рост.",
    outcomes: ["Архитектура RSC/Client", "Шаблоны SEO/OG/JSON‑LD", "Performance + WCAG AA чек‑лист"],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    summary:
      "Автоматизация, которая снижает ошибки и ручной труд: выбираем сценарии по экономике и рискам.",
    outcomes: ["Сценарии + метрики эффекта", "Интеграции + контроль качества", "Риски/ограничения (данные, NDA)"],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    summary:
      "Эксперименты и аналитика без конфликта с продуктом: измерения, гипотезы, процесс принятия решений.",
    outcomes: ["Сквозные события/атрибуция", "Процесс экспериментов", "Техническая SEO‑гигиена"],
  },
];

export const caseStudies: SiteCaseStudy[] = [
  {
    slug: "fintech-risk-console",
    title: "Risk Console для финтех‑группы",
    client: "NDA / Fintech Group",
    industry: "Fintech",
    timeframe: "8 недель",
    summary:
      "Переупаковка разрозненных отчётов в единый «command center»: события, роли, аудит‑лог, SLA‑видимость.",
    services: ["product-design", "web-engineering", "strategy"],
    metrics: [
      { label: "Time‑to‑Insight", value: "−43%" },
      { label: "Ошибки ручных сверок", value: "−31%" },
      { label: "Покрытие событий", value: "92%" },
    ],
    highlights: [
      "RBAC + аудит‑трассировка действий",
      "Дашборды без «визуального шума»",
      "Стабильный перформанс на больших таблицах",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "OpenTelemetry"],
  },
  {
    slug: "b2b-quote-to-cash",
    title: "Quote‑to‑Cash для B2B‑поставщика",
    client: "NDA / B2B Supplier",
    industry: "B2B SaaS",
    timeframe: "10 недель",
    summary:
      "Сократили цикл «запрос → предложение → контракт» за счёт шаблонов, проверок и единого статуса сделки.",
    services: ["strategy", "product-design", "ai-automation"],
    metrics: [
      { label: "Cycle time", value: "−28%" },
      { label: "Ошибки в КП", value: "−35%" },
      { label: "Самообслуживание", value: "+19%" },
    ],
    highlights: ["Шаблоны КП", "Проверки данных", "Интеграции с CRM/почтой"],
    stack: ["Next.js", "TypeScript", "MySQL", "Redis"],
  },
  {
    slug: "enterprise-site-replatform",
    title: "Replatforming сайта enterprise‑продукта",
    client: "NDA / Enterprise Software",
    industry: "Enterprise",
    timeframe: "6 недель",
    summary:
      "Перенесли контент и UX на App Router с акцентом на SEO, доступность и скорость — без потери управляемости.",
    services: ["web-engineering", "branding"],
    metrics: [
      { label: "LCP", value: "≤ 2.5s" },
      { label: "CLS", value: "≤ 0.05" },
      { label: "Core Web Vitals", value: "Pass" },
    ],
    highlights: ["Metadata API", "Компонентные страницы", "Стабильные шаблоны контента"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Directus"],
  },
];

export const articles: SiteArticle[] = [
  {
    slug: "why-trust-first-ux",
    title: "Trust‑first UX: доказательства раньше обещаний",
    excerpt:
      "Как структурировать главную страницу и кейсы так, чтобы enterprise‑аудитория видела систему, а не рекламу.",
    publishedAt: "2026-01-01",
    tags: ["UX", "B2B", "Conversion"],
  },
  {
    slug: "motion-without-noise",
    title: "Motion без шума: 240мс как стандарт",
    excerpt:
      "Набор примитивов (fade‑up, reveal‑line, number‑tick) и правила, чтобы анимации помогали, а не отвлекали.",
    publishedAt: "2026-01-05",
    tags: ["Motion", "Framer Motion", "A11y"],
  },
  {
    slug: "rsc-architecture-notes",
    title: "RSC/Client границы: где заканчивается маркетинг и начинается продукт",
    excerpt:
      "Как проектировать островки интерактива, не превращая приложение в набор клиентских страниц.",
    publishedAt: "2026-01-10",
    tags: ["Next.js", "Architecture", "Performance"],
  },
];

