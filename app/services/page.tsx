import type { Metadata } from "next";
import { ContactCTA } from "@/components/marketing/light-ui";
import { ServicesIndexLayout } from "@/components/services/services-index-layout";
import { ServiceLeadForm } from "@/components/services/service-lead-form";
import { SiteMarketingFooter } from "@/components/site/site-marketing-footer";
import { resolveServiceList } from "@/lib/services/resolve-services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: {
    absolute: "Услуги Skybric — дизайн, сайты, Telegram-боты, CRM, SEO и fintech-разработка",
  },
  description:
    "Технологические и digital-услуги для бизнеса: UI/UX-дизайн, редизайн сайтов, веб-сервисы, Telegram-боты, CRM-интеграции, AI-автоматизация, SEO и fintech-разработка.",
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage() {
  const serviceList = await resolveServiceList();

  return (
    <main className="isolate min-h-screen overflow-hidden bg-[#F6F3EE] pt-10 text-[#121212] lg:pt-14">
      <section className="px-5 sm:px-8 lg:px-10">
        <h1 className="text-[clamp(2.35rem,6.2vw,6.5rem)] font-semibold leading-[0.94] tracking-normal">
          Услуги для продаж, операционки и цифровых продуктов
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-[#4B4B4B] sm:mt-8 sm:text-lg sm:leading-8">
          Дизайн, веб, боты, CRM, SEO и автоматизация — блоками ниже; детали — на страницах направлений.
        </p>
      </section>

      <section className="mt-10 px-5 sm:mt-12 sm:px-8 lg:mt-14 lg:px-10">
        <ServicesIndexLayout services={serviceList} />
      </section>

      <ContactCTA
        title="Нужно направление под задачу?"
        text="Опишите контекст — подскажем состав работ и формат взаимодействия без лишних слайдов."
      >
        <ServiceLeadForm serviceSlug="services-index" serviceTitle="Список услуг Skybric" />
      </ContactCTA>

      <SiteMarketingFooter />
    </main>
  );
}
