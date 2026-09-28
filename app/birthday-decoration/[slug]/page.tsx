import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BirthdayDecorationDetailPage from "@/components/birthday-decoration/BirthdayDecorationDetailPage";
import { ALL_BIRTHDAY_SERVICES, getBirthdayServiceBySlug, getRelatedBirthdayServices } from "@/lib/birthdayData";

export async function generateStaticParams() {
  return ALL_BIRTHDAY_SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getBirthdayServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | EventSaaga`,
    description: service.description,
    openGraph: { title: service.name, description: service.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getBirthdayServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedBirthdayServices(service.relatedSlugs);
  return <BirthdayDecorationDetailPage birthday={service} relatedServices={related} />;
}
