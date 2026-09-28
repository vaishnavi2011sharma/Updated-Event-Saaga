import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BirthdayDecorationDetailPage from "@/components/birthday-decoration/BirthdayDecorationDetailPage";
import { ALL_PARTY_EQUIPMENT_SERVICES, getPartyEquipmentServiceBySlug, getRelatedPartyEquipmentServices } from "@/lib/partyEquipmentData";

export async function generateStaticParams() {
  return ALL_PARTY_EQUIPMENT_SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getPartyEquipmentServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | EventSaaga`,
    description: service.description,
    openGraph: { title: service.name, description: service.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getPartyEquipmentServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedPartyEquipmentServices(service.relatedSlugs);
  return <BirthdayDecorationDetailPage birthday={service} relatedServices={related} />;
}
