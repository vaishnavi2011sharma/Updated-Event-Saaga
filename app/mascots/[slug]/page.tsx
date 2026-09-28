import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MascotDetailPage from "@/components/mascots/MascotDetailPage";
import { ALL_MASCOT_SERVICES, getMascotServiceBySlug, getRelatedMascotServices } from "@/lib/mascotsData";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getMascotServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return { title: `${service.name} | Mascots`, description: service.description };
}

export async function generateStaticParams() {
  return ALL_MASCOT_SERVICES.map(s => ({ slug: s.slug }));
}

export default async function MascotSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getMascotServiceBySlug(slug);
  if (!service) notFound();
  const related = getRelatedMascotServices(service.relatedSlugs);
  return <MascotDetailPage mascot={service} relatedServices={related} />;
}
