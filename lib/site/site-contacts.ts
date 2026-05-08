import { fetchPublishedSiteSettings } from "@/lib/supabase/fetch-site-settings";

export type SiteContacts = {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
};

/** Fallback при отсутствии Supabase или строки с published=false. */
export const SITE_CONTACTS_FALLBACK: SiteContacts = {
  email: "hello@skybric.kz",
  phoneDisplay: "+7 777 255-00-00",
  phoneHref: "tel:+77772550000",
};

export async function resolveSiteContacts(): Promise<SiteContacts> {
  const row = await fetchPublishedSiteSettings();
  if (row) {
    return {
      email: row.email.trim(),
      phoneDisplay: row.phone_display.trim(),
      phoneHref: row.phone_href.trim(),
    };
  }

  const envEmail = process.env.NEXT_PUBLIC_SITE_EMAIL?.trim();
  const envPhoneDisplay = process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY?.trim();
  const envPhoneHref = process.env.NEXT_PUBLIC_SITE_PHONE_HREF?.trim();
  if (envEmail && envPhoneDisplay && envPhoneHref) {
    return {
      email: envEmail,
      phoneDisplay: envPhoneDisplay,
      phoneHref: envPhoneHref,
    };
  }

  return SITE_CONTACTS_FALLBACK;
}
