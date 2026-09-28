export interface SpecialOccasionService {
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

export const ALL_SPECIAL_OCCASION_SERVICES: SpecialOccasionService[] = [
  {
    slug: "proposal-decoration",
    name: "Proposal Decoration",
    tagline: "The moment you'll tell your grandkids about!",
    description: "Romantic proposal setups — rose petals, candles, balloons & fairy lights.",
    longDescription: "Our Proposal Decoration service creates the picture-perfect moment for popping the question! With rose petal pathways, candle arrangements, balloon décor, and fairy lights, we design a romantic scene tailored to your vision — at home, a rooftop, or a scenic outdoor location.",
    badge: "Once In A Lifetime",
    badgeColor: "#e11d48",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e11d48",
    category: "Special Occasion Decorations",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Rose Petal Pathway", desc: "Romantic petal trail leading to the moment" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Candle & Fairy Lights", desc: "Warm romantic ambient lighting" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Balloon Décor", desc: "Elegant heart & balloon arrangements" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Discreet Timing", desc: "Coordinated to keep the surprise intact" },
      { icon: "M9 12l2 2 4-4", title: "Photography Add-On", desc: "Hidden photographer to capture the moment" },
      { icon: "M12 8v4l3 3", title: "Home, Rooftop or Outdoor", desc: "Flexible location options" },
    ],
    includes: ["Rose petal & candle styling", "Balloon & floral décor", "Fairy lights", "Setup & discreet takedown"],
    faqs: [
      { q: "Can this be set up in a hotel room?", a: "Yes! We coordinate with major hotels for in-room proposal setups." },
      { q: "Is a hidden photographer available?", a: "Yes! We offer discreet photography to capture the reaction naturally." },
      { q: "How discreet is the setup process?", a: "Extremely — we coordinate closely with you to keep the surprise intact." },
      { q: "Can we choose an outdoor location?", a: "Yes! Beaches, gardens, and rooftops are popular proposal locations." },
    ],
    relatedSlugs: ["surprise-party-decoration", "romantic-room-decoration", "retirement-party-decoration", "welcome-home-decoration"],
  },
  {
    slug: "surprise-party-decoration",
    name: "Surprise Party Decoration",
    tagline: "Shh... let's make it unforgettable!",
    description: "Full surprise party planning — decor, timing coordination & reveal.",
    longDescription: "Our Surprise Party Decoration service takes care of every detail while keeping the guest of honour completely in the dark! From coordinating discreet setup timing to designing a stunning reveal moment, we ensure the surprise lands exactly as planned.",
    badge: "Full Surprise",
    badgeColor: "#a21caf",
    gradientFrom: "#1a0a2e",
    gradientTo: "#701a75",
    accentColor: "#a21caf",
    category: "Special Occasion Decorations",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Discreet Timed Setup", desc: "Coordinated while guest of honour is away" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Themed Décor", desc: "Balloon, floral or theme-based styling" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Reveal Coordination", desc: "Guest hiding & reveal cue managed" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Confetti & Banner", desc: "Grand surprise reveal effects" },
      { icon: "M9 12l2 2 4-4", title: "Cake & Gift Coordination", desc: "Optional cake and gift add-ons" },
      { icon: "M12 8v4l3 3", title: "Dedicated Coordinator", desc: "Single point of contact for smooth execution" },
    ],
    includes: ["Themed decoration", "Timed setup coordination", "Confetti & banner reveal", "Dedicated coordinator"],
    faqs: [
      { q: "How do you keep the surprise secret?", a: "We coordinate directly with the organiser and time setup around the guest of honour's schedule." },
      { q: "Can this be for any milestone celebration?", a: "Yes! Birthdays, promotions, retirements, and any surprise moment." },
      { q: "How much advance notice is needed?", a: "We recommend at least 3-4 days notice for full coordination." },
      { q: "Can we add a cake and gifts?", a: "Yes! Cake and gift sourcing can be arranged alongside decoration." },
    ],
    relatedSlugs: ["proposal-decoration", "retirement-party-decoration", "welcome-home-decoration", "farewell-party-decoration"],
  },
  {
    slug: "retirement-party-decoration",
    name: "Retirement Party Decoration",
    tagline: "Celebrating a lifetime of hard work!",
    description: "Elegant retirement celebration decor — backdrop, seating & memory wall.",
    longDescription: "Our Retirement Party Decoration service honours a career well-lived with a warm, celebratory setup! Featuring an elegant backdrop, dignified seating for the guest of honour, and an optional memory wall showcasing career highlights, we create a fitting tribute to years of dedication.",
    badge: "Well Deserved",
    badgeColor: "#d97706",
    gradientFrom: "#1a1000",
    gradientTo: "#b45309",
    accentColor: "#d97706",
    category: "Special Occasion Decorations",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Elegant Backdrop", desc: "Dignified, celebratory backdrop design" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Guest of Honour Seating", desc: "Special decorated seating area" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Memory Wall (Optional)", desc: "Photo display of career highlights" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Balloon & Floral Décor", desc: "Warm, celebratory colour styling" },
      { icon: "M9 12l2 2 4-4", title: "Cake Table Styling", desc: "Coordinated cake table setup" },
      { icon: "M12 8v4l3 3", title: "Office or Home Venue", desc: "Setup at workplace or residence" },
    ],
    includes: ["Backdrop & seating decor", "Balloon & floral styling", "Cake table setup", "Setup & takedown"],
    faqs: [
      { q: "Can this be set up at an office venue?", a: "Yes! We coordinate office and workplace retirement decorations." },
      { q: "Is a memory wall included?", a: "A memory/photo wall can be added as part of the package." },
      { q: "Can this be a surprise event?", a: "Yes! We coordinate discreet surprise retirement setups." },
      { q: "How many guests can be accommodated?", a: "From intimate team gatherings to larger celebrations." },
    ],
    relatedSlugs: ["surprise-party-decoration", "welcome-home-decoration", "farewell-party-decoration", "proposal-decoration"],
  },
  {
    slug: "welcome-home-decoration",
    name: "Welcome Home Decoration",
    tagline: "A warm welcome for a special return!",
    description: "Welcome home decoration for new babies, returning family, or new homes.",
    longDescription: "Our Welcome Home Decoration service creates a heartfelt welcome for special homecomings! Whether it's a new baby coming home, a family member returning after time away, or moving into a new house, we design a warm, festive setup that makes the moment memorable.",
    badge: "Warm Welcome",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#16a34a",
    category: "Special Occasion Decorations",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Entrance Décor", desc: "Balloon arch & welcome signage at entry" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Personalised Banner", desc: "Custom welcome home messaging" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Balloon & Floral Styling", desc: "Festive, celebratory colour theme" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Baby Welcome Option", desc: "Special theming for new baby homecomings" },
      { icon: "M9 12l2 2 4-4", title: "Quick Turnaround", desc: "Fast setup for time-sensitive welcomes" },
      { icon: "M12 8v4l3 3", title: "Indoor & Entrance Styling", desc: "Covers both entryway and interior" },
    ],
    includes: ["Entrance balloon arch", "Personalised welcome banner", "Interior décor accents", "Setup & takedown"],
    faqs: [
      { q: "Can this be arranged for a new baby's homecoming?", a: "Yes! We offer specially themed baby welcome home packages." },
      { q: "How quickly can setup be arranged?", a: "We can accommodate short-notice bookings, subject to availability — reach out as early as possible." },
      { q: "Can decoration be personalised with a name?", a: "Yes! Custom name and message banners are included." },
      { q: "Is this suitable for new home move-ins?", a: "Yes! We create a festive welcome for new house move-ins as well." },
    ],
    relatedSlugs: ["surprise-party-decoration", "retirement-party-decoration", "farewell-party-decoration", "proposal-decoration"],
  },
  {
    slug: "farewell-party-decoration",
    name: "Farewell Party Decoration",
    tagline: "A memorable send-off for a special someone!",
    description: "Farewell party decor for schools, colleges & offices — themed & elegant.",
    longDescription: "Our Farewell Party Decoration service creates a memorable, heartfelt send-off! Perfect for school and college farewells or office goodbyes, we design a themed setup with a photo memory wall, elegant backdrop, and celebratory styling that honours the occasion.",
    badge: "Memorable Send-Off",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Special Occasion Decorations",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Themed Backdrop", desc: "Elegant farewell-themed backdrop" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Photo Memory Wall", desc: "Display of shared memories & photos" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Balloon & Floral Décor", desc: "Celebratory colour-coordinated styling" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Stage Setup (Optional)", desc: "For school/college farewell functions" },
      { icon: "M9 12l2 2 4-4", title: "Signature Board", desc: "Guestbook or signature board styling" },
      { icon: "M12 8v4l3 3", title: "School, College & Office", desc: "Suited to any farewell setting" },
    ],
    includes: ["Themed backdrop", "Balloon & floral décor", "Photo memory wall", "Setup & takedown"],
    faqs: [
      { q: "Is this suitable for large college farewells?", a: "Yes! We scale for large auditorium and hall settings." },
      { q: "Can we add a stage setup?", a: "Yes! Stage decoration is available as an add-on." },
      { q: "Is a photo wall included?", a: "Yes! A photo memory wall is part of our standard farewell package." },
      { q: "How early should we book for a college event?", a: "We recommend booking 1-2 weeks in advance for large college farewells." },
    ],
    relatedSlugs: ["retirement-party-decoration", "welcome-home-decoration", "surprise-party-decoration", "proposal-decoration"],
  },
  {
    slug: "romantic-room-decoration",
    name: "Romantic Room Decoration",
    tagline: "Set the mood for a night to remember!",
    description: "Romantic room decor for birthdays, anniversaries & special date nights.",
    longDescription: "Our Romantic Room Decoration service crafts an intimate, beautiful setting for any special moment — a birthday surprise, a special date night, or simply an evening to say 'I love you'. With rose petals, candles, balloons, and fairy lights, we design a scene that feels effortlessly romantic.",
    badge: "Set The Mood",
    badgeColor: "#db2777",
    gradientFrom: "#2d0a1e",
    gradientTo: "#9d174d",
    accentColor: "#db2777",
    category: "Special Occasion Decorations",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Rose Petal Styling", desc: "Elegant petal decor on bed & floor" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "LED Candle Arrangement", desc: "Safe flameless candle styling" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Balloon & Heart Décor", desc: "Romantic balloon and heart arrangements" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Fairy Light Ambience", desc: "Warm twinkling lights throughout" },
      { icon: "M9 12l2 2 4-4", title: "Personalised Signage", desc: "Names or a message featured" },
      { icon: "M12 8v4l3 3", title: "Home or Hotel Setup", desc: "We decorate homes and hotel rooms" },
    ],
    includes: ["Rose petal & candle styling", "Balloon & floral décor", "Fairy lights", "Setup & takedown"],
    faqs: [
      { q: "Can this be a surprise setup?", a: "Yes! We coordinate quietly so your partner is surprised." },
      { q: "Is hotel room decoration available?", a: "Yes! We partner with major hotels for room decoration access." },
      { q: "Can we add a cake?", a: "Yes! Cake add-ons can be arranged alongside decoration." },
      { q: "How long does setup take?", a: "Typically 1.5-2 hours for a full romantic setup." },
    ],
    relatedSlugs: ["proposal-decoration", "surprise-party-decoration", "welcome-home-decoration", "farewell-party-decoration"],
  },
];

export function getSpecialOccasionServiceBySlug(slug: string): SpecialOccasionService | undefined {
  return ALL_SPECIAL_OCCASION_SERVICES.find(s => s.slug === slug);
}
export function getRelatedSpecialOccasionServices(slugs: string[]): SpecialOccasionService[] {
  return slugs.map(s => ALL_SPECIAL_OCCASION_SERVICES.find(g => g.slug === s)).filter(Boolean) as SpecialOccasionService[];
}
