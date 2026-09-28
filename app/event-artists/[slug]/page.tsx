import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EventArtistDetailPage from "@/components/event-artists/EventArtistDetailPage";
import { ALL_EVENT_ARTIST_SERVICES, getEventArtistServiceBySlug, getRelatedEventArtistServices } from "@/lib/eventArtistsData";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getEventArtistServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return { title: `${service.name} | Event Artists`, description: service.description };
}

export async function generateStaticParams() {
  return ALL_EVENT_ARTIST_SERVICES.map(s => ({ slug: s.slug }));
}

export default async function EventArtistSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getEventArtistServiceBySlug(slug);
  if (!service) notFound();
  const related = getRelatedEventArtistServices(service.relatedSlugs);
  return <EventArtistDetailPage eventArtist={service} relatedServices={related} />;
}
