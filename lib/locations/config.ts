import type { LocationConfig } from "./types";

// ── Lazy imports (each city file loaded only when needed) ──────────────────
export const LOCATION_SLUGS = [
  "delhi", "noida", "gurgaon", "faridabad", "ghaziabad",
  "bangalore", "mumbai", "pune", "hyderabad", "chennai",
  "kolkata", "ahmedabad", "jaipur", "lucknow", "chandigarh",
  "surat", "indore", "bhopal", "nagpur", "kochi",
] as const;

export type LocationSlug = typeof LOCATION_SLUGS[number];

export const LOCATION_DISPLAY: Record<LocationSlug, string> = {
  delhi:      "Delhi",
  noida:      "Noida",
  gurgaon:    "Gurgaon",
  faridabad:  "Faridabad",
  ghaziabad:  "Ghaziabad",
  bangalore:  "Bangalore",
  mumbai:     "Mumbai",
  pune:       "Pune",
  hyderabad:  "Hyderabad",
  chennai:    "Chennai",
  kolkata:    "Kolkata",
  ahmedabad:  "Ahmedabad",
  jaipur:     "Jaipur",
  lucknow:    "Lucknow",
  chandigarh: "Chandigarh",
  surat:      "Surat",
  indore:     "Indore",
  bhopal:     "Bhopal",
  nagpur:     "Nagpur",
  kochi:      "Kochi",
};

/** Grouped for popup UI */
export const LOCATION_GROUPS = [
  {
    label: "North India",
    cities: ["delhi", "noida", "gurgaon", "faridabad", "ghaziabad", "lucknow", "chandigarh", "jaipur"] as LocationSlug[],
  },
  {
    label: "West India",
    cities: ["mumbai", "pune", "ahmedabad", "surat", "indore", "bhopal", "nagpur"] as LocationSlug[],
  },
  {
    label: "South India",
    cities: ["bangalore", "hyderabad", "chennai", "kochi"] as LocationSlug[],
  },
  {
    label: "East India",
    cities: ["kolkata"] as LocationSlug[],
  },
];

/** Dynamic import — only loads the file for the requested city */
export async function getLocationConfig(slug: string): Promise<LocationConfig | null> {
  if (!LOCATION_SLUGS.includes(slug as LocationSlug)) return null;
  try {
    const mod = await import(`./${slug}`);
    return mod.default as LocationConfig;
  } catch {
    return null;
  }
}

/** Sync check — is this a valid location slug? */
export function isValidLocation(slug: string): slug is LocationSlug {
  return LOCATION_SLUGS.includes(slug as LocationSlug);
}

/** For generateStaticParams */
export function getAllLocationSlugs() {
  return LOCATION_SLUGS.map(slug => ({ location: slug }));
}
