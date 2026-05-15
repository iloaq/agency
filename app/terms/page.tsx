import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/legal-document-page";
import { buildTerms } from "@/lib/legal/legal-documents";
import { resolveSiteContacts } from "@/lib/site/site-contacts";

export const metadata: Metadata = {
  title: {
    absolute: "Условия использования сайта Skybric",
  },
  description:
    "Правила использования сайта Skybric, материалов, форм заявки и публичной информации об услугах.",
  alternates: {
    canonical: "/terms",
  },
};

export default async function TermsPage() {
  const contacts = await resolveSiteContacts();
  return <LegalDocumentPage document={buildTerms(contacts.email)} />;
}
