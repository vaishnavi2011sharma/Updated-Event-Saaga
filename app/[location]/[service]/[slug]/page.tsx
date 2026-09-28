import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocationConfig, getAllLocationSlugs } from "@/lib/locations/config";

// ── Detail Page Components (existing — unchanged) ─────────────────────────
import BirthdayDecorationDetailPage from "@/components/birthday-decoration/BirthdayDecorationDetailPage";
import BabyShowerDetailPage from "@/components/baby-shower/BabyShowerDetailPage";
import WeddingDetailPage from "@/components/wedding-services/WeddingDetailPage";
import CarnivalDetailPage from "@/components/carnival-event-organiser/CarnivalDetailPage";
import WaterActivityDetailPage from "@/components/water-activities/WaterActivityDetailPage";
import EventArtistDetailPage from "@/components/event-artists/EventArtistDetailPage";
import MascotDetailPage from "@/components/mascots/MascotDetailPage";

// ── Data imports (existing — unchanged) ───────────────────────────────────
import { ALL_BIRTHDAY_SERVICES, getRelatedBirthdayServices } from "@/lib/birthdayData";
import { ALL_BABYSHOWER_SERVICES, getRelatedBabyShowerServices } from "@/lib/babyShowerData";
import { ALL_WEDDING_SERVICES, getRelatedWeddingServices } from "@/lib/weddingData";
import { ALL_ANNIVERSARY_SERVICES, getRelatedAnniversaryServices } from "@/lib/anniversaryData";
import { ALL_PREWEDDING_SERVICES, getRelatedPreWeddingServices } from "@/lib/preWeddingData";
import { ALL_MASCOT_SERVICES, getRelatedMascotServices } from "@/lib/mascotsData";
import { ALL_SPECIAL_OCCASION_SERVICES, getRelatedSpecialOccasionServices } from "@/lib/specialOccasionData";
import { ALL_CARNIVAL_SERVICES, getRelatedCarnivalServices } from "@/lib/carnivalData";
import { ALL_PARTY_EQUIPMENT_SERVICES, getRelatedPartyEquipmentServices } from "@/lib/partyEquipmentData";
import { ALL_WATER_ACTIVITY_SERVICES, getRelatedWaterActivityServices } from "@/lib/waterActivitiesData";
import { ALL_EVENT_ARTIST_SERVICES, getRelatedEventArtistServices } from "@/lib/eventArtistsData";
import { ALL_CORPORATE_SERVICES, getRelatedCorporateServices } from "@/lib/corporateData";
import { ALL_GAMES_SERVICES, getRelatedGamesServices } from "@/lib/gamesData";

// ── Registry ───────────────────────────────────────────────────────────────
// All 13 category data files share this structural shape (see e.g. BirthdayService),
// so a single structural interface covers them without resorting to `any`.
interface RegistryItem {
  slug: string;
  name: string;
  description: string;
  relatedSlugs: string[];
}

const REGISTRY: Record<string, {
  items: RegistryItem[];
  getRelated: (slugs: string[]) => RegistryItem[];
  // Each category's detail component takes a different, specifically-named prop
  // (birthday, babyShower, wedding, carnival, ...) injected dynamically below via
  // {...{[prop]: item}}. TypeScript's structural system can't express "a component
  // accepting one specific required prop out of a dynamic key" soundly, so this one
  // `any` is a deliberate, narrow escape hatch rather than an accident.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>;
  prop: string;
}> = {
  "birthday-decoration":          { items: ALL_BIRTHDAY_SERVICES,          getRelated: getRelatedBirthdayServices,         Component: BirthdayDecorationDetailPage, prop: "birthday"       },
  "baby-shower":                  { items: ALL_BABYSHOWER_SERVICES,         getRelated: getRelatedBabyShowerServices,        Component: BabyShowerDetailPage,         prop: "babyShower"     },
  "wedding-services":             { items: ALL_WEDDING_SERVICES,            getRelated: getRelatedWeddingServices,           Component: WeddingDetailPage,            prop: "wedding"        },
  "anniversary-decoration":       { items: ALL_ANNIVERSARY_SERVICES,        getRelated: getRelatedAnniversaryServices,       Component: BirthdayDecorationDetailPage, prop: "birthday"       },
  "pre-wedding-functions":        { items: ALL_PREWEDDING_SERVICES,         getRelated: getRelatedPreWeddingServices,        Component: BirthdayDecorationDetailPage, prop: "birthday"       },
  "mascots":                      { items: ALL_MASCOT_SERVICES,             getRelated: getRelatedMascotServices,            Component: MascotDetailPage,             prop: "mascot"         },
  "special-occasion-decorations": { items: ALL_SPECIAL_OCCASION_SERVICES,   getRelated: getRelatedSpecialOccasionServices,   Component: BirthdayDecorationDetailPage, prop: "birthday"       },
  "carnival-event-organiser":     { items: ALL_CARNIVAL_SERVICES,           getRelated: getRelatedCarnivalServices,          Component: CarnivalDetailPage,           prop: "carnival"       },
  "party-equipment-rentals":      { items: ALL_PARTY_EQUIPMENT_SERVICES,    getRelated: getRelatedPartyEquipmentServices,    Component: BirthdayDecorationDetailPage, prop: "birthday"       },
  "water-activities":             { items: ALL_WATER_ACTIVITY_SERVICES,     getRelated: getRelatedWaterActivityServices,     Component: WaterActivityDetailPage,      prop: "waterActivity"  },
  "event-artists":                { items: ALL_EVENT_ARTIST_SERVICES,       getRelated: getRelatedEventArtistServices,       Component: EventArtistDetailPage,        prop: "eventArtist"    },
  "corporate-events":              { items: ALL_CORPORATE_SERVICES,          getRelated: getRelatedCorporateServices,         Component: BirthdayDecorationDetailPage, prop: "birthday"       },
  "games-on-rent":                 { items: ALL_GAMES_SERVICES,              getRelated: getRelatedGamesServices,             Component: BirthdayDecorationDetailPage, prop: "birthday"       },
};

// ── Static params: 20 × 13 × avg 8-9 items = ~2200 pages ───────────────────
export async function generateStaticParams() {
  const locationSlugs = getAllLocationSlugs().map(l => l.location);
  const params: { location: string; service: string; slug: string }[] = [];
  for (const location of locationSlugs) {
    for (const [service, reg] of Object.entries(REGISTRY)) {
      for (const item of reg.items) {
        params.push({ location, service, slug: item.slug });
      }
    }
  }
  return params;
}

interface Props { params: Promise<{ location: string; service: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location, service, slug } = await params;
  const loc = await getLocationConfig(location);
  const reg = REGISTRY[service];
  if (!loc || !reg) return { title: "Not Found" };
  const item = reg.items.find((s: RegistryItem) => s.slug === slug);
  if (!item) return { title: "Not Found" };
  return {
    title: `${item.name} in ${loc.displayName} | EventSaaga`,
    description: `${item.description} — Professional service in ${loc.displayName}. Book now!`,
    alternates: { canonical: `https://eventsaaga.com/${location}/${service}/${slug}` },
    openGraph: {
      title: `${item.name} in ${loc.displayName}`,
      description: item.description,
      url: `https://eventsaaga.com/${location}/${service}/${slug}`,
    },
  };
}

export default async function LocationServiceSlugPage({ params }: Props) {
  const { location, service, slug } = await params;
  const loc = await getLocationConfig(location);
  const reg = REGISTRY[service];
  if (!loc || !reg) notFound();

  const item = reg.items.find((s: RegistryItem) => s.slug === slug);
  if (!item) notFound();

  const related = reg.getRelated(item.relatedSlugs ?? []);
  const { Component, prop } = reg;

  // Inject location name into item name for location-aware display
  const locationAwareItem = {
    ...item,
    // Keep original name for component internals, location shown via page title/meta
  };

  return (
    <Component
      {...{ [prop]: locationAwareItem }}
      relatedServices={related}
    />
  );
}
