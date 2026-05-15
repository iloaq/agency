import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/legal-document-page";
import { buildPrivacyPolicy } from "@/lib/legal/legal-documents";
import { resolveSiteContacts } from "@/lib/site/site-contacts";

export const metadata: Metadata = {
  title: {
    absolute: "Политика конфиденциальности Skybric",
  },
  description:
    "Как Skybric собирает, использует и защищает данные, переданные через сайт и формы заявок.",
  alternates: {
    canonical: "/privacy",
  },
};

export default async function PrivacyPage() {
  const contacts = await resolveSiteContacts();
  return <LegalDocumentPage document={buildPrivacyPolicy(contacts.email)} />;
}
