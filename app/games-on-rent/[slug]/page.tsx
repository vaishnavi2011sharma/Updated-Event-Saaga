import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BirthdayDecorationDetailPage from "@/components/birthday-decoration/BirthdayDecorationDetailPage";
import BouncyCastleDetailPage from "@/components/games-on-rent/BouncyCastleDetailPage";
import { ALL_GAMES_SERVICES, getGamesServiceBySlug, getRelatedGamesServices } from "@/lib/gamesData";

export async function generateStaticParams() {
  return ALL_GAMES_SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getGamesServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | EventSaaga`,
    description: service.description,
    openGraph: { title: service.name, description: service.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getGamesServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedGamesServices(service.relatedSlugs);

  // Bouncy Castle on Rent uses a dedicated, customized detail page (expanded
  // content, real provided photos, reordered sections, mobile fixes, premium
  // colour treatment). Every other Games on Rent service is untouched and
  // continues to use the standard shared detail page exactly as before.
  if (slug === "bouncy-castle-on-rent") {
    return <BouncyCastleDetailPage birthday={service} relatedServices={related} />;
  }

  return <BirthdayDecorationDetailPage birthday={service} relatedServices={related} />;
}
