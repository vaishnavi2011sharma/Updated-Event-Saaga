import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BabyShowerDetailPage from "@/components/baby-shower/BabyShowerDetailPage";
import { ALL_BABYSHOWER_SERVICES, getBabyShowerServiceBySlug, getRelatedBabyShowerServices } from "@/lib/babyShowerData";

export async function generateStaticParams() {
  return ALL_BABYSHOWER_SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getBabyShowerServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | EventSaaga`,
    description: service.description,
    openGraph: { title: service.name, description: service.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getBabyShowerServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedBabyShowerServices(service.relatedSlugs);
  return <BabyShowerDetailPage babyShower={service} relatedServices={related} />;
}
