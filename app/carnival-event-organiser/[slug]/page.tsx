import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CarnivalDetailPage from "@/components/carnival-event-organiser/CarnivalDetailPage";
import { ALL_CARNIVAL_SERVICES, getCarnivalServiceBySlug, getRelatedCarnivalServices } from "@/lib/carnivalData";

export async function generateStaticParams() {
  return ALL_CARNIVAL_SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getCarnivalServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | EventSaaga`,
    description: service.description,
    openGraph: { title: service.name, description: service.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getCarnivalServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedCarnivalServices(service.relatedSlugs);
  return <CarnivalDetailPage carnival={service} relatedServices={related} />;
}
