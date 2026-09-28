import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BirthdayDecorationDetailPage from "@/components/birthday-decoration/BirthdayDecorationDetailPage";
import { ALL_SPECIAL_OCCASION_SERVICES, getSpecialOccasionServiceBySlug, getRelatedSpecialOccasionServices } from "@/lib/specialOccasionData";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getSpecialOccasionServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return { title: `${service.name} | Special Occasion Decorations`, description: service.description };
}

export async function generateStaticParams() {
  return ALL_SPECIAL_OCCASION_SERVICES.map(s => ({ slug: s.slug }));
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getSpecialOccasionServiceBySlug(slug);
  if (!service) notFound();
  const related = getRelatedSpecialOccasionServices(service.relatedSlugs);
  return <BirthdayDecorationDetailPage birthday={service} relatedServices={related} />;
}
