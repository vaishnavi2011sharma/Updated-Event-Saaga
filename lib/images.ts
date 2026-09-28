/**
 * Centralized image resolution for EventSaaga.
 *
 * Resolves every service/category image to a real, licensed photo from
 * EventSaaga's own provided image library, stored locally in
 * /public/images/gallery/<category>/. Every service slug is mapped to its
 * real category (via the actual service data files, not guesswork), so a
 * wedding service always gets a real wedding photo, a water-activity service
 * always gets a real water-activity photo, etc.
 *
 * No external network dependency, no stock-photo placeholders, no icons or
 * illustrations — every image is an actual photograph from the provided set.
 */

import { ALL_BIRTHDAY_SERVICES } from "./birthdayData";
import { ALL_BABYSHOWER_SERVICES } from "./babyShowerData";
import { ALL_WEDDING_SERVICES } from "./weddingData";
import { ALL_ANNIVERSARY_SERVICES } from "./anniversaryData";
import { ALL_PREWEDDING_SERVICES } from "./preWeddingData";
import { ALL_EVENT_ARTIST_SERVICES } from "./eventArtistsData";
import { ALL_MASCOT_SERVICES } from "./mascotsData";
import { ALL_CARNIVAL_SERVICES } from "./carnivalData";
import { ALL_GAMES_SERVICES } from "./gamesData";
import { ALL_CORPORATE_SERVICES } from "./corporateData";
import { ALL_SPECIAL_OCCASION_SERVICES } from "./specialOccasionData";
import { ALL_PARTY_EQUIPMENT_SERVICES } from "./partyEquipmentData";
import { ALL_WATER_ACTIVITY_SERVICES } from "./waterActivitiesData";

// Representative category-level keys — used on the homepage, category grids,
// and anywhere a whole category (rather than one specific service) needs an image.
export const CATEGORY_SEEDS: Record<string, string> = {
  "birthday-decoration": "birthday-decoration",
  "baby-shower": "baby-shower",
  "wedding-services": "wedding-services",
  "anniversary-decoration": "anniversary-decoration",
  "pre-wedding-functions": "pre-wedding-functions",
  "event-artists": "event-artists",
  "mascots": "mascots",
  "carnival-event-organiser": "carnival-event-organiser",
  "games-on-rent": "games-on-rent",
  "corporate-events": "corporate-events",
  "special-occasion-decorations": "special-occasion-decorations",
  "party-equipment-rentals": "party-equipment-rentals",
  "water-activities": "water-activities",
};

const VALID_CATEGORIES = new Set(Object.keys(CATEGORY_SEEDS));

// Build an exact slug -> category map from the real service data files, so every
// specific service (e.g. "wedding-mandap-setup") resolves to the correct themed art.
function buildSlugCategoryMap(): Record<string, string> {
  const map: Record<string, string> = {};
  const register = (services: { slug: string }[], category: string) => {
    for (const s of services) map[s.slug] = category;
  };
  register(ALL_BIRTHDAY_SERVICES, "birthday-decoration");
  register(ALL_BABYSHOWER_SERVICES, "baby-shower");
  register(ALL_WEDDING_SERVICES, "wedding-services");
  register(ALL_ANNIVERSARY_SERVICES, "anniversary-decoration");
  register(ALL_PREWEDDING_SERVICES, "pre-wedding-functions");
  register(ALL_EVENT_ARTIST_SERVICES, "event-artists");
  register(ALL_MASCOT_SERVICES, "mascots");
  register(ALL_CARNIVAL_SERVICES, "carnival-event-organiser");
  register(ALL_GAMES_SERVICES, "games-on-rent");
  register(ALL_CORPORATE_SERVICES, "corporate-events");
  register(ALL_SPECIAL_OCCASION_SERVICES, "special-occasion-decorations");
  register(ALL_PARTY_EQUIPMENT_SERVICES, "party-equipment-rentals");
  register(ALL_WATER_ACTIVITY_SERVICES, "water-activities");
  return map;
}

const SLUG_CATEGORY_MAP = buildSlugCategoryMap();

// A handful of known non-service seeds used for general site chrome (hero/CTA
// banners, "recent celebrations" gallery strip) that don't correspond to a
// single service slug — mapped explicitly for accuracy.
const SPECIAL_SEED_OVERRIDES: Record<string, string> = {
  "es-hero-main": "wedding-services",
  "es-cta-banner": "wedding-services",
  "gal-haldi": "pre-wedding-functions",
  "gal-sangeet": "pre-wedding-functions",
  "gal-wedding": "wedding-services",
  "gal-birthday": "birthday-decoration",
  "gal-candle": "anniversary-decoration",
};

/** Resolve any seed (a specific service slug OR a category key) to a category. */
function resolveCategory(seed: string): string {
  if (VALID_CATEGORIES.has(seed)) return seed;
  if (SPECIAL_SEED_OVERRIDES[seed]) return SPECIAL_SEED_OVERRIDES[seed];
  if (SLUG_CATEGORY_MAP[seed]) return SLUG_CATEGORY_MAP[seed];
  // Fallback: keyword match against the seed itself (covers composite seeds like
  // "wedding-mandap-setup-1" used for gallery variants).
  for (const cat of VALID_CATEGORIES) {
    const keyword = cat.split("-")[0];
    if (seed.includes(keyword)) return cat;
  }
  return "special-occasion-decorations"; // safe, generic-but-relevant default
}

// Number of real photos available per category in /public/images/gallery/<cat>/N.jpg
// (kept in sync with public/images/gallery/_manifest.json).
const PHOTO_COUNT: Record<string, number> = {
  "wedding-services": 21,
  "birthday-decoration": 15,
  "corporate-events": 13,
  "special-occasion-decorations": 40,
  "party-equipment-rentals": 20,
  "event-artists": 13,
  "games-on-rent": 20,
  "mascots": 7,
  "pre-wedding-functions": 20,
  "baby-shower": 16,
  "anniversary-decoration": 12,
  "carnival-event-organiser": 20,
  "water-activities": 12,
};

const GALLERY_BASE = "/images/gallery";

/** Deterministic hash so the same seed always maps to the same photo. */
function seedHash(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(hash);
}

function photoPath(cat: string, index: number): string {
  const count = PHOTO_COUNT[cat] ?? 1;
  const n = (index % count) + 1; // photos are named 1.jpg..N.jpg
  return `${GALLERY_BASE}/${cat}/${n}.jpg`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- width/height kept for call-site API compatibility
export function heroImage(seed: string, _width = 1200, _height = 900): string {
  const cat = resolveCategory(seed);
  return photoPath(cat, seedHash(seed));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- width/height kept for call-site API compatibility
export function galleryImages(seed: string, count = 4, _width = 600, _height = 600): string[] {
  const cat = resolveCategory(seed);
  const base = seedHash(seed);
  return Array.from({ length: count }, (_, i) => photoPath(cat, base + i));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- width/height kept for call-site API compatibility
export function cardImage(seed: string, _width = 500, _height = 400): string {
  const cat = resolveCategory(seed);
  return photoPath(cat, seedHash(seed));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- width/height kept for call-site API compatibility
export function bannerImage(seed: string, _width = 1920, _height = 700): string {
  const cat = resolveCategory(seed);
  // The homepage hero specifically should always show the strongest, most
  // premium wedding-decoration photo (wedding-services/1.jpg), regardless of seed.
  if (seed === "es-hero-main") return `${GALLERY_BASE}/wedding-services/1.jpg`;
  return photoPath(cat, seedHash(seed));
}
