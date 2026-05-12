import type { SiteContacts } from "@/lib/site/site-contacts-model";
import { SITE_CONTACTS_FALLBACK } from "@/lib/site/site-contacts-model";
import { fetchPublishedSiteSettings } from "@/lib/supabase/fetch-site-settings";

export type { SiteContacts } from "@/lib/site/site-contacts-model";
export { SITE_CONTACTS_FALLBACK } from "@/lib/site/site-contacts-model";

/** Fallback при отсутствии Supabase или строки с published=false. */
export async function resolveSiteContacts(): Promise<SiteContacts> {
  const canonicalEmail = process.env.NEXT_PUBLIC_SITE_EMAIL?.trim() || SITE_CONTACTS_FALLBACK.email;
  const row = await fetchPublishedSiteSettings();
  if (row) {
    return {
      email: canonicalEmail,
      phoneDisplay: row.phone_display.trim(),
      phoneHref: row.phone_href.trim(),
    };
  }

  const envPhoneDisplay = process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY?.trim();
  const envPhoneHref = process.env.NEXT_PUBLIC_SITE_PHONE_HREF?.trim();
  if (envPhoneDisplay && envPhoneHref) {
    return {
      email: canonicalEmail,
      phoneDisplay: envPhoneDisplay,
      phoneHref: envPhoneHref,
    };
  }

  return {
    ...SITE_CONTACTS_FALLBACK,
    email: canonicalEmail,
  };
}
