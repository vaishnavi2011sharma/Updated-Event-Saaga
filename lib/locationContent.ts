import type { LocationSlug } from "./locations/config";
import { LOCATION_AREAS } from "./locationAreas";

interface ServiceItem {
  slug: string;
  name: string;
  description: string;
}

interface LocationContentInput {
  citySlug: LocationSlug;
  cityName: string;
  categoryLabel: string;
  categorySlug: string;
  items: ServiceItem[];
}

// A handful of genuinely different phrasing variants per section, selected
// deterministically per (city, category) pair — so wording differs across
// combinations instead of being one template with the city name swapped in.
const WHY_CHOOSE_VARIANTS = [
  (city: string, cat: string) => `Every ${cat.toLowerCase()} order in ${city} is handled by a dedicated coordinator who confirms your requirements, timeline, and venue access well before the event date. That single point of contact means you're never chasing multiple people to get a straight answer about what's included or when the team will arrive.`,
  (city: string, cat: string) => `Our ${city} team has executed hundreds of ${cat.toLowerCase()} setups across residential societies, banquet halls, and open lawns, so unfamiliar venues rarely slow us down. That experience translates directly into fewer surprises on the day — the crew already knows how to navigate tight lift access, society timing restrictions, and last-minute layout changes.`,
  (city: string, cat: string) => `Materials for ${cat.toLowerCase()} bookings in ${city} are sourced and quality-checked in advance, which is why last-minute substitutions are the exception, not the rule. We keep buffer stock for common items so a supplier delay on our end almost never becomes your problem on event day.`,
  (city: string, cat: string) => `Because we work with vetted local vendors in ${city}, ${cat.toLowerCase()} setups are usually completed 1-2 hours before your guests are expected to arrive. Every vendor in our ${city} network has a track record we can point to, not just a listing — that's the difference between a booking platform and an actual accountable partner.`,
];

const SERVICE_DETAIL_VARIANTS = [
  (city: string, cat: string) => `Whether you're planning an intimate gathering or a large celebration, EventSaaga's ${cat} catalogue in ${city} is built to scale — from focused single-element bookings to fully coordinated, multi-vendor setups. Each package below can be booked on its own or combined with related services to build a complete experience around your event.`,
  (city: string, cat: string) => `${city} hosts range from compact apartments to sprawling farmhouses, and our ${cat} team adapts each setup to the specific footprint, access constraints, and layout of your venue. We ask a handful of practical questions upfront — lift size, parking, power access — precisely so nothing gets discovered as a problem on the day itself.`,
  (city: string, cat: string) => `Pricing for ${cat} in ${city} is quoted transparently after understanding your guest count, preferred date, and venue type — no vague estimates or last-minute add-on surprises. Most customers get a confirmed quote within a few hours of sharing their requirements, whether that's over a call, WhatsApp, or the form on this page.`,
];

const LOCAL_INSIGHT_VARIANTS = [
  (city: string, cat: string, areas: string) => `${city} has grown into one of the more active markets for ${cat.toLowerCase()} bookings in the country, with demand spread fairly evenly across established residential pockets and newer developments alike. Neighbourhoods such as ${areas} each bring their own mix of venue types — from independent houses with private lawns to high-rise societies with shared clubhouses — and our vendor network is built to work across all of them without treating any one area as an afterthought.`,
  (city: string, cat: string, areas: string) => `Traffic patterns and venue access vary noticeably across ${city}, which is why our ${cat.toLowerCase()} team plans arrival windows around the specific part of the city your event falls in. Areas like ${areas} each have their own local quirks — some societies require advance security clearance for vendor entry, others have strict move-in/move-out timing — and accounting for that upfront is part of how we keep setups running on schedule.`,
  (city: string, cat: string, areas: string) => `Booking patterns in ${city} tend to peak around weekends and festive periods, and popular localities such as ${areas} typically see the highest concentration of ${cat.toLowerCase()} requests during those windows. Planning even a few days ahead — rather than the same week — noticeably widens your choice of preferred time slots, especially if your event falls in one of these higher-demand pockets.`,
];

function pickVariant<T>(variants: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return variants[hash % variants.length];
}

export interface LocationContentBlocks {
  serviceDetailParagraph: string;
  whyChooseParagraph: string;
  localInsightParagraph: string;
  closingParagraph: string;
  popularServices: ServiceItem[];
  areas: string[];
  bookingSteps: { title: string; desc: string }[];
  extraFaqs: { q: string; a: string }[];
}

export function buildLocationContent(input: LocationContentInput): LocationContentBlocks {
  const { citySlug, cityName, categoryLabel, items } = input;
  const seed = `${citySlug}-${categoryLabel}`;

  const serviceDetailParagraph = pickVariant(SERVICE_DETAIL_VARIANTS, seed)(cityName, categoryLabel);
  const whyChooseParagraph = pickVariant(WHY_CHOOSE_VARIANTS, seed + "x")(cityName, categoryLabel);

  const popularServices = items.slice(0, 8);
  const areas = LOCATION_AREAS[citySlug] ?? [];
  const areasList = areas.slice(0, 4).join(", ");
  const localInsightParagraph = areasList
    ? pickVariant(LOCAL_INSIGHT_VARIANTS, seed + "y")(cityName, categoryLabel, areasList)
    : "";

  const closingParagraph = `EventSaaga's role in every ${categoryLabel.toLowerCase()} booking across ${cityName} goes beyond simply connecting you with a vendor. Our coordination team stays reachable from the moment you submit a request through to the day the setup is dismantled, so if a detail needs adjusting — guest count changes, a venue restriction comes up, or the timing shifts — there's always someone accountable to sort it out rather than a support ticket sitting unanswered.`;

  const bookingSteps = [
    { title: "Share Your Requirements", desc: `Tell us your date, venue, and guest count in ${cityName} — over WhatsApp, call, or the form on this page.` },
    { title: "Get a Transparent Quote", desc: "We confirm exact pricing based on your specific requirements — no hidden charges." },
    { title: "Confirm With Advance", desc: "A partial advance secures your date; the balance is settled around your event." },
    { title: "We Deliver On Time", desc: `Our ${cityName}-based team sets up well ahead of your guests' arrival.` },
  ];

  const extraFaqs = [
    { q: `How far in advance should I book ${categoryLabel.toLowerCase()} in ${cityName}?`, a: `For simple setups, 3-4 days' notice is usually enough. For larger or peak-season events in ${cityName}, we recommend booking 2-3 weeks ahead to guarantee your preferred date and time slot.` },
    { q: `Do prices differ across ${cityName}?`, a: `Pricing depends on your specific location within ${cityName}, venue access, and setup complexity — we always confirm the exact cost before you pay anything, so there are no surprises on the day.` },
    { q: `Can I customise a ${categoryLabel.toLowerCase()} package for my event?`, a: `Yes — every package on this page can be tailored to your budget, theme, and guest count. Share your requirements and our ${cityName} team will adjust the plan accordingly.` },
    { q: `What happens if I need to reschedule my ${categoryLabel.toLowerCase()} booking in ${cityName}?`, a: `Reach out to our team as early as possible — we accommodate date changes whenever the new slot is available, and there's no penalty for reasonable advance notice.` },
  ];

  return { serviceDetailParagraph, whyChooseParagraph, localInsightParagraph, closingParagraph, popularServices, areas, bookingSteps, extraFaqs };
}
