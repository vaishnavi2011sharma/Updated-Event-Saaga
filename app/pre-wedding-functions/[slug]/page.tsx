import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BirthdayDecorationDetailPage from "@/components/birthday-decoration/BirthdayDecorationDetailPage";
import { ALL_PREWEDDING_SERVICES, getPreWeddingServiceBySlug, getRelatedPreWeddingServices } from "@/lib/preWeddingData";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getPreWeddingServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return { title: `${service.name} | Pre-Wedding Functions`, description: service.description };
}

export async function generateStaticParams() {
  return ALL_PREWEDDING_SERVICES.map(s => ({ slug: s.slug }));
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getPreWeddingServiceBySlug(slug);
  if (!service) notFound();
  const related = getRelatedPreWeddingServices(service.relatedSlugs);
  return <BirthdayDecorationDetailPage birthday={service} relatedServices={related} />;
}
