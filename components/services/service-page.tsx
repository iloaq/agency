import type { ServiceData } from "@/lib/services/services-data";
import { absoluteUrl } from "@/lib/site-url";
import {
  BusinessResult,
  Deliverables,
  FinalCTA,
  InternalServiceLinks,
  PainCards,
  ProcessSteps,
  ServiceFAQ,
  ServiceHero,
  SolutionList,
  UseCases,
  WhyCustomSolution,
} from "./service-sections";

function ServiceJsonLd({ service }: { service: ServiceData }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Услуги",
        item: absoluteUrl("/services"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: service.title,
        item: absoluteUrl(service.path),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.seoDescription,
    provider: {
      "@type": "Organization",
      name: "Skybric",
    },
    url: absoluteUrl(service.path),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

export function ServicePage({
  service,
  relatedServices,
}: {
  service: ServiceData;
  relatedServices: ServiceData[];
}) {
  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] text-[#121212]">
      <ServiceJsonLd service={service} />
      <ServiceHero service={service} />
      <PainCards service={service} />
      <SolutionList service={service} />
      <ProcessSteps service={service} />
      <BusinessResult service={service} />
      <UseCases service={service} />
      <Deliverables service={service} />
      <WhyCustomSolution service={service} />
      <ServiceFAQ service={service} />
      <InternalServiceLinks currentSlug={service.slug} relatedServices={relatedServices} />
      <FinalCTA service={service} />
    </main>
  );
}
