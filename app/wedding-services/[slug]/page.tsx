import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WeddingDetailPage from "@/components/wedding-services/WeddingDetailPage";
import { ALL_WEDDING_SERVICES, getWeddingServiceBySlug, getRelatedWeddingServices } from "@/lib/weddingData";

export async function generateStaticParams() {
  return ALL_WEDDING_SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getWeddingServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | EventSaaga`,
    description: service.description,
    openGraph: { title: service.name, description: service.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getWeddingServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedWeddingServices(service.relatedSlugs);
  return <WeddingDetailPage wedding={service} relatedServices={related} />;
}
