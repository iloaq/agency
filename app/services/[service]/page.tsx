import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/service-page";
import { getService, serviceList } from "@/lib/services/services-data";

type PageProps = {
  params: Promise<{
    service: string;
  }>;
};

export function generateStaticParams() {
  return serviceList.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: service.path,
    },
  };
}

export default async function ServiceRoutePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return <ServicePage service={service} />;
}
