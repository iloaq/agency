import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ServicePage } from "@/components/services/service-page";
import { resolveServiceBySlug, resolveServiceList } from "@/lib/services/resolve-services";

type PageProps = {
  params: Promise<{
    service: string;
  }>;
};

const legacyServiceRedirects: Record<string, string> = {
  "ai-agents": "/services/ai-automation",
  "custom-ai-development": "/services/ai-automation",
  "web-development": "/services/web-app-development",
  "mobile-app-development": "/services/web-app-development",
  "ai-crm-integrations": "/services/crm-integrations",
  crm: "/services/crm-integrations",
  automation: "/services/ai-automation",
  "business-automation": "/services/ai-automation",
  "ai-development": "/services/ai-automation",
  "smm": "/services/digital-support",
  "email-marketing": "/services/digital-support",
  "digital-marketing": "/services/digital-support",
  "cloud-devops": "/services/web-app-development",
  cybersecurity: "/services/web-app-development",
  "web-design": "/services/ui-ux-design",
  design: "/services/ui-ux-design",
  "ui-ux": "/services/ui-ux-design",
};

export async function generateStaticParams() {
  const serviceList = await resolveServiceList();
  return serviceList.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await resolveServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: {
      absolute: service.seoTitle,
    },
    description: service.seoDescription,
    alternates: {
      canonical: service.path,
    },
  };
}

export default async function ServiceRoutePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = await resolveServiceBySlug(slug);

  if (!service) {
    const redirectTo = legacyServiceRedirects[slug];
    if (redirectTo) {
      redirect(redirectTo);
    }

    notFound();
  }

  const relatedServices = await resolveServiceList();

  return <ServicePage service={service} relatedServices={relatedServices} />;
}
