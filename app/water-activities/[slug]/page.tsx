import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WaterActivityDetailPage from "@/components/water-activities/WaterActivityDetailPage";
import { ALL_WATER_ACTIVITY_SERVICES, getWaterActivityServiceBySlug, getRelatedWaterActivityServices } from "@/lib/waterActivitiesData";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getWaterActivityServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return { title: `${service.name} | Water Activities`, description: service.description };
}

export async function generateStaticParams() {
  return ALL_WATER_ACTIVITY_SERVICES.map(s => ({ slug: s.slug }));
}

export default async function WaterActivitySlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getWaterActivityServiceBySlug(slug);
  if (!service) notFound();
  const related = getRelatedWaterActivityServices(service.relatedSlugs);
  return <WaterActivityDetailPage waterActivity={service} relatedServices={related} />;
}
