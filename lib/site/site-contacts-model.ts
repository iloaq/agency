/** Клиент-безопасно: без Supabase / next/headers. См. resolveSiteContacts в site-contacts.ts */
export type SiteContacts = {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
};

export const SITE_CONTACTS_FALLBACK: SiteContacts = {
  email: "clients@skybric.com",
  phoneDisplay: "+7(777)336-56-02",
  phoneHref: "tel:+77773365602",
};
