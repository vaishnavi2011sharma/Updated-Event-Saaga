export interface LocationSEO {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export interface LocationServiceContent {
  h1: string;
  intro: string;
  description: string;
  faqs: { q: string; a: string }[];
  cta: string;
}

export interface LocationSchema {
  name: string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: { latitude: number; longitude: number };
  areaServed: string;
  priceRange: string;
}

export interface LocationConfig {
  slug: string;
  name: string;
  displayName: string;
  state: string;
  popular: boolean;
  seo: LocationSEO;
  schema: LocationSchema;
  services: {
    "birthday-decoration": LocationServiceContent;
    "baby-shower": LocationServiceContent;
    "wedding-services": LocationServiceContent;
    "anniversary-decoration": LocationServiceContent;
    "pre-wedding-functions": LocationServiceContent;
    "mascots": LocationServiceContent;
    "special-occasion-decorations": LocationServiceContent;
    "carnival-event-organiser": LocationServiceContent;
    "party-equipment-rentals": LocationServiceContent;
    "water-activities": LocationServiceContent;
    "event-artists": LocationServiceContent;
    "corporate-events": LocationServiceContent;
    "games-on-rent": LocationServiceContent;
  };
}
