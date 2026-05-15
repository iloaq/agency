import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/legal-document-page";
import { buildCookiesPolicy } from "@/lib/legal/legal-documents";
import { resolveSiteContacts } from "@/lib/site/site-contacts";

export const metadata: Metadata = {
  title: {
    absolute: "Политика cookies Skybric",
  },
  description:
    "Какие cookies, аналитические события и похожие технологии может использовать сайт Skybric.",
  alternates: {
    canonical: "/cookies",
  },
};

export default async function CookiesPage() {
  const contacts = await resolveSiteContacts();
  return <LegalDocumentPage document={buildCookiesPolicy(contacts.email)} />;
}
