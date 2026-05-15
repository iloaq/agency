import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/legal-document-page";
import { buildPersonalDataConsent } from "@/lib/legal/legal-documents";
import { resolveSiteContacts } from "@/lib/site/site-contacts";

export const metadata: Metadata = {
  title: {
    absolute: "Согласие на обработку персональных данных Skybric",
  },
  description:
    "Согласие пользователя на обработку данных, переданных через формы сайта Skybric.",
  alternates: {
    canonical: "/personal-data-consent",
  },
};

export default async function PersonalDataConsentPage() {
  const contacts = await resolveSiteContacts();
  return <LegalDocumentPage document={buildPersonalDataConsent(contacts.email)} />;
}
