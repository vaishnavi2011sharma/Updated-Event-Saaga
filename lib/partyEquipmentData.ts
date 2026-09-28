export interface PartyEquipmentService {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  badge: string;
  badgeColor: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  category: string;
  features: { icon: string; title: string; desc: string }[];
  includes: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
}

export const ALL_PARTY_EQUIPMENT_SERVICES: PartyEquipmentService[] = [
  {
    slug: "tent-shamiana-rental",
    name: "Tent / Shamiana on Rent",
    tagline: "Weatherproof shelter for any celebration!",
    description: "German hangar tents & traditional shamianas for events of any size.",
    longDescription: "Our Tent / Shamiana on Rent service provides reliable, weatherproof shelter for outdoor celebrations! From modern German hangar tents for large weddings to traditional shamianas for intimate gatherings, we deliver, install, and dismantle with full professional service.",
    badge: "Weather Ready",
    badgeColor: "#7c3aed",
    gradientFrom: "#0a001a",
    gradientTo: "#4c1d95",
    accentColor: "#7c3aed",
    category: "Party Equipment Rentals",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "German Hangar Tents", desc: "Modern, sturdy structures for large events" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Traditional Shamianas", desc: "Classic fabric tent options" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Weatherproof Coverage", desc: "Rain and sun protection guaranteed" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Multiple Sizes", desc: "Scalable from 50 to 2000+ guests" },
      { icon: "M9 12l2 2 4-4", title: "Flooring & Lighting Add-Ons", desc: "Optional flooring and lighting included" },
      { icon: "M12 8v4l3 3", title: "Full Installation Service", desc: "Delivery, setup & dismantling included" },
    ],
    includes: ["Tent/shamiana structure", "Installation & dismantling", "Basic flooring (as required)", "Delivery to venue"],
    faqs: [
      { q: "What size tent do we need for 200 guests?", a: "Approximately a 40x60 ft structure comfortably accommodates 200 seated guests." },
      { q: "Is flooring included?", a: "Basic flooring can be added as an add-on to any tent booking." },
      { q: "How long does installation take?", a: "Typically 4-8 hours depending on tent size and complexity." },
      { q: "Are these tents rainproof?", a: "Yes! Our tent materials are fully weatherproof and tested." },
    ],
    relatedSlugs: ["chair-table-rental", "sound-system-rental", "cooling-heating-rental", "lighting-equipment-rental"],
  },
  {
    slug: "chair-table-rental",
    name: "Chair & Table Rental",
    tagline: "Comfortable seating for every guest!",
    description: "Bulk chair & table rental — banquet, Napoleon, cocktail & round tables.",
    longDescription: "Our Chair & Table Rental service supplies quality furniture for events of any scale! From elegant Napoleon chairs and banquet tables to cocktail high-tops and round dining tables, we deliver clean, well-maintained furniture with flexible quantities to match your guest count.",
    badge: "Reliable Supply",
    badgeColor: "#d97706",
    gradientFrom: "#1a1000",
    gradientTo: "#b45309",
    accentColor: "#d97706",
    category: "Party Equipment Rentals",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Napoleon & Banquet Chairs", desc: "Elegant seating styles for any event" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Round & Rectangular Tables", desc: "Dining and buffet table options" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Cocktail High Tops", desc: "Standing tables for mixers & receptions" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Bulk Quantities", desc: "From 20 to 1000+ chairs/tables" },
      { icon: "M9 12l2 2 4-4", title: "Cover & Sash Options", desc: "Chair covers and sashes available" },
      { icon: "M12 8v4l3 3", title: "Delivery & Setup", desc: "Delivered, arranged & collected" },
    ],
    includes: ["Chairs/tables (as selected)", "Delivery & setup", "Collection after event"],
    faqs: [
      { q: "Can we mix chair styles for different areas?", a: "Yes! We can supply different chair styles for stage, dining, and lounge areas." },
      { q: "Do you offer chair covers?", a: "Yes! Chair covers and sashes are available as an add-on." },
      { q: "What's the minimum order?", a: "Minimum order is typically 20 units." },
      { q: "Is same-day delivery possible?", a: "Subject to availability — reach out early for urgent bookings." },
    ],
    relatedSlugs: ["tent-shamiana-rental", "sound-system-rental", "cooling-heating-rental", "photo-booth-equipment-rental"],
  },
  {
    slug: "sound-system-rental",
    name: "Sound System on Rent",
    tagline: "Crystal-clear audio for every occasion!",
    description: "Professional PA & sound system rental for events of any size.",
    longDescription: "Our Sound System on Rent service delivers reliable, high-quality audio equipment for any event! From compact PA systems for small gatherings to full concert-grade setups for large weddings and corporate events, we provide equipment along with technical support.",
    badge: "Crystal Clear",
    badgeColor: "#dc2626",
    gradientFrom: "#1a0000",
    gradientTo: "#7f1d1d",
    accentColor: "#ef4444",
    category: "Party Equipment Rentals",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Scalable Sound Systems", desc: "From compact PA to large event rigs" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Wireless Microphones", desc: "Handheld & lapel mic options" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Technical Support", desc: "Sound engineer available on request" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Indoor & Outdoor", desc: "Weatherproof options for outdoor use" },
      { icon: "M9 12l2 2 4-4", title: "DJ Console Add-On", desc: "DJ mixing setup available on request" },
      { icon: "M12 8v4l3 3", title: "Backup Equipment", desc: "Redundant gear for zero downtime" },
    ],
    includes: ["Sound system/PA setup", "Wireless microphone(s)", "Delivery, setup & collection"],
    faqs: [
      { q: "How many speakers do we need for 300 guests?", a: "Typically 2-4 speakers depending on venue size and layout — our team advises based on your space." },
      { q: "Is a sound engineer included?", a: "A technical operator can be added on request for larger setups." },
      { q: "Can this include DJ equipment?", a: "Yes! DJ consoles and mixing equipment are available as an add-on." },
      { q: "Is outdoor sound rental weatherproof?", a: "Yes, our outdoor equipment is weather-resistant and safety-tested." },
    ],
    relatedSlugs: ["tent-shamiana-rental", "lighting-equipment-rental", "chair-table-rental", "photo-booth-equipment-rental"],
  },
  {
    slug: "lighting-equipment-rental",
    name: "Lighting Equipment on Rent",
    tagline: "Illuminate every moment beautifully!",
    description: "Ambient, stage & decorative lighting equipment rental for any event.",
    longDescription: "Our Lighting Equipment on Rent service provides everything needed to light up your celebration! From warm fairy lights and uplighting to dynamic stage lighting rigs and LED effects, we supply and install lighting equipment tailored to your event's mood and scale.",
    badge: "Set The Mood",
    badgeColor: "#a21caf",
    gradientFrom: "#1a0a2e",
    gradientTo: "#701a75",
    accentColor: "#a21caf",
    category: "Party Equipment Rentals",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Fairy & String Lighting", desc: "Warm ambient lighting for any venue" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Architectural Uplighting", desc: "Highlighting venue features beautifully" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Stage & Dance Lighting", desc: "Dynamic LED and moving-head lights" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Colour Programming", desc: "RGB lighting matched to your theme" },
      { icon: "M9 12l2 2 4-4", title: "Outdoor Weatherproof", desc: "Safe, weatherproof outdoor fixtures" },
      { icon: "M12 8v4l3 3", title: "Technical Setup Included", desc: "Full installation & safe wiring" },
    ],
    includes: ["Lighting equipment (as selected)", "Installation & wiring", "Technical operator (on request)", "Collection after event"],
    faqs: [
      { q: "Can lighting match our theme colours?", a: "Yes! RGB and coloured gel lighting can match any palette." },
      { q: "Is outdoor lighting weatherproof?", a: "Yes, all outdoor fixtures are weatherproof and safety-tested." },
      { q: "Do you offer music-synced lighting?", a: "Yes! Dynamic, music-synced lighting is available for sangeet and party nights." },
      { q: "How much power supply is needed?", a: "Our team assesses venue power capacity and arranges backup if needed." },
    ],
    relatedSlugs: ["sound-system-rental", "tent-shamiana-rental", "cooling-heating-rental", "photo-booth-equipment-rental"],
  },
  {
    slug: "cooling-heating-rental",
    name: "Cooling & Heating Equipment on Rent",
    tagline: "Perfect comfort, whatever the weather!",
    description: "Air coolers, mist fans & room heaters for outdoor & indoor events.",
    longDescription: "Our Cooling & Heating Equipment on Rent service ensures your guests stay comfortable no matter the season! With industrial air coolers and mist fans for summer events and efficient room heaters for winter celebrations, we help create the ideal climate for your venue.",
    badge: "All-Weather Comfort",
    badgeColor: "#0891b2",
    gradientFrom: "#020c1a",
    gradientTo: "#0e7490",
    accentColor: "#06b6d4",
    category: "Party Equipment Rentals",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Industrial Air Coolers", desc: "High-capacity cooling for large tents" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Mist Fans", desc: "Outdoor cooling with fine water mist" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Room Heaters", desc: "Efficient heaters for winter events" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Quiet Operation", desc: "Low-noise units suitable for events" },
      { icon: "M9 12l2 2 4-4", title: "Safe Power Setup", desc: "Proper electrical arrangement handled" },
      { icon: "M12 8v4l3 3", title: "Delivery & Installation", desc: "Delivered, installed & collected" },
    ],
    includes: ["Cooling/heating units (as selected)", "Power setup & installation", "Delivery & collection"],
    faqs: [
      { q: "How many coolers do we need for a 100x60 ft tent?", a: "Typically 8-12 units depending on ambient temperature — our team assesses and recommends." },
      { q: "Is this suitable for outdoor lawn events?", a: "Yes! Mist fans are especially popular for outdoor summer events." },
      { q: "Can heaters be used indoors safely?", a: "Yes, our heaters are designed and vetted for safe indoor use." },
      { q: "Is power backup required?", a: "We assess venue power and can arrange generator backup if needed." },
    ],
    relatedSlugs: ["tent-shamiana-rental", "chair-table-rental", "sound-system-rental", "lighting-equipment-rental"],
  },
  {
    slug: "photo-booth-equipment-rental",
    name: "Photo Booth Equipment on Rent",
    tagline: "Instant memories, ready to print!",
    description: "360° booths, magic mirrors & selfie booths available for standalone rental.",
    longDescription: "Our Photo Booth Equipment on Rent service offers standalone booth rentals for any event type! Whether it's a 360-degree video booth, an interactive magic mirror, or a classic selfie booth, we deliver, operate, and manage the full experience for weddings, corporate events, and parties.",
    badge: "Instant Memories",
    badgeColor: "#e8647a",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e8647a",
    category: "Party Equipment Rentals",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "360° Video Booth", desc: "Celebrity-style rotating video booth" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Magic Mirror Booth", desc: "Interactive touchscreen mirror photo booth" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Classic Selfie Booth", desc: "Simple, fun backdrop photo booth" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Instant Sharing", desc: "QR code & instant print options" },
      { icon: "M9 12l2 2 4-4", title: "Dedicated Operator", desc: "Trained attendant manages the booth" },
      { icon: "M12 8v4l3 3", title: "Custom Branding", desc: "Event name/logo on prints & overlays" },
    ],
    includes: ["1 Photo booth unit (as selected)", "Dedicated operator", "Props & branding overlay", "Setup & takedown"],
    faqs: [
      { q: "Which booth type is best for weddings?", a: "The Magic Mirror and 360° booth are our most popular choices for weddings and receptions." },
      { q: "Is printing included?", a: "Instant printing is available depending on the booth type selected." },
      { q: "How much space is required?", a: "Approximately 10x10 ft of clear space is recommended for most booth types." },
      { q: "Can branding be customised for corporate events?", a: "Yes! Company logos and branding overlays are available for corporate bookings." },
    ],
    relatedSlugs: ["sound-system-rental", "lighting-equipment-rental", "tent-shamiana-rental", "chair-table-rental"],
  },
];

export function getPartyEquipmentServiceBySlug(slug: string): PartyEquipmentService | undefined {
  return ALL_PARTY_EQUIPMENT_SERVICES.find(s => s.slug === slug);
}
export function getRelatedPartyEquipmentServices(slugs: string[]): PartyEquipmentService[] {
  return slugs.map(s => ALL_PARTY_EQUIPMENT_SERVICES.find(g => g.slug === s)).filter(Boolean) as PartyEquipmentService[];
}
