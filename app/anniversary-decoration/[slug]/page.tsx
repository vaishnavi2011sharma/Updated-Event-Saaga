import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BirthdayDecorationDetailPage from "@/components/birthday-decoration/BirthdayDecorationDetailPage";
import { ALL_ANNIVERSARY_SERVICES, getAnniversaryServiceBySlug, getRelatedAnniversaryServices } from "@/lib/anniversaryData";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getAnniversaryServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return { title: `${service.name} | Anniversary Decoration`, description: service.description };
}

export async function generateStaticParams() {
  return ALL_ANNIVERSARY_SERVICES.map(s => ({ slug: s.slug }));
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getAnniversaryServiceBySlug(slug);
  if (!service) notFound();
  const related = getRelatedAnniversaryServices(service.relatedSlugs);
  return <BirthdayDecorationDetailPage birthday={service} relatedServices={related} />;
}
