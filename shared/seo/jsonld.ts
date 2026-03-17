import type { SiteCaseStudy } from "@/shared/content/site";

// JSON-LD (structured data).
// Source: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

export function organizationJsonLd(params: {
  url: string;
  name: string;
  email?: string;
  telephone?: string;
}) {
  const { url, name, email, telephone } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(email ? { email } : {}),
    ...(telephone ? { telephone } : {}),
  } as const;
}

export function caseStudyJsonLd(params: {
  url: string;
  caseStudy: SiteCaseStudy;
}) {
  const { url, caseStudy } = params;

  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: caseStudy.title,
    url,
    about: caseStudy.industry,
    timeRequired: caseStudy.timeframe,
    description: caseStudy.summary,
  } as const;
}

