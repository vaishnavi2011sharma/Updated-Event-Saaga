export interface PreWeddingService {
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

export const ALL_PREWEDDING_SERVICES: PreWeddingService[] = [
  {
    slug: "haldi-ceremony-decoration",
    name: "Haldi Ceremony Decoration",
    tagline: "Bright, cheerful & full of tradition!",
    description: "Vibrant marigold & yellow-themed haldi decoration for home or venue.",
    longDescription: "Our Haldi Ceremony Decoration service brings the cheerful spirit of this beloved ritual to life! With vibrant marigold garlands, yellow and orange drapery, decorated seating for the bride/groom, and props for the traditional haldi application, we create a joyful, photo-ready setting.",
    badge: "Vibrant & Fun",
    badgeColor: "#d97706",
    gradientFrom: "#1a1000",
    gradientTo: "#b45309",
    accentColor: "#d97706",
    category: "Pre-Wedding Functions",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Marigold Garland Décor", desc: "Fresh marigold garlands & backdrops" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Yellow-Themed Styling", desc: "Vibrant yellow & orange drapery" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Decorated Seating", desc: "Styled seating for bride/groom" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Ritual Props", desc: "Haldi bowls, umbrellas & thalis styled" },
      { icon: "M9 12l2 2 4-4", title: "Photo-Ready Backdrop", desc: "Instagram-worthy floral backdrop" },
      { icon: "M12 8v4l3 3", title: "Indoor & Outdoor", desc: "Home lawns, terraces or banquet halls" },
    ],
    includes: ["Marigold & floral backdrop", "Yellow drapery styling", "Decorated seating", "Ritual prop styling", "Setup & takedown"],
    faqs: [
      { q: "Can this be set up at home lawns?", a: "Yes! Home lawn haldi setups are among our most popular bookings." },
      { q: "Do you provide the haldi/turmeric paste?", a: "We handle decor and styling; ritual items are typically arranged by the family or purohit." },
      { q: "Can we combine haldi with mehndi decoration?", a: "Yes! Combined haldi-mehndi packages are available at special pricing." },
      { q: "How much space is needed?", a: "A minimum 10x10 ft area is recommended for the seating and backdrop." },
    ],
    relatedSlugs: ["mehndi-ceremony-decoration", "sangeet-night-setup", "pre-wedding-photoshoot", "pre-wedding-catering"],
  },
  {
    slug: "mehndi-ceremony-decoration",
    name: "Mehndi Ceremony Decoration",
    tagline: "Intricate art deserves an equally beautiful setting!",
    description: "Elegant mehndi decoration — floral jhoolas, drapes & vibrant seating.",
    longDescription: "Our Mehndi Ceremony Decoration service creates a stunning, festive backdrop for this cherished ritual! With floral jhoolas (swings), colourful drapery, decorative umbrellas, and vibrant seating arrangements, we design a setting that celebrates the artistry and joy of mehndi day.",
    badge: "Festive & Elegant",
    badgeColor: "#db2777",
    gradientFrom: "#2d0a1e",
    gradientTo: "#9d174d",
    accentColor: "#db2777",
    category: "Pre-Wedding Functions",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Floral Jhoola Setup", desc: "Decorated floral swing for the bride" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Colourful Drapery", desc: "Vibrant fabric drapes & backdrops" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Decorative Umbrellas", desc: "Rajasthani-style hanging umbrellas" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Seating for Guests", desc: "Comfortable floor or chair seating" },
      { icon: "M9 12l2 2 4-4", title: "Photo Corner", desc: "Dedicated backdrop for guest photos" },
      { icon: "M12 8v4l3 3", title: "Mehndi Artist Coordination", desc: "Can be paired with our mehndi artists" },
    ],
    includes: ["Floral jhoola/swing", "Backdrop & drapery", "Decorative umbrellas", "Seating arrangement", "Setup & takedown"],
    faqs: [
      { q: "Can you arrange mehndi artists too?", a: "Yes! We can coordinate professional mehndi artists alongside the decoration." },
      { q: "Is the floral jhoola customisable in colour?", a: "Yes! Colours are matched to your outfit or theme preference." },
      { q: "Can this be done outdoors?", a: "Yes! Garden and lawn mehndi setups are very popular." },
      { q: "How early should we book?", a: "We recommend booking 7-10 days in advance during wedding season." },
    ],
    relatedSlugs: ["haldi-ceremony-decoration", "sangeet-night-setup", "pre-wedding-photoshoot", "pre-wedding-catering"],
  },
  {
    slug: "sangeet-night-setup",
    name: "Sangeet Night Setup",
    tagline: "Dance the night away in style!",
    description: "Glamorous sangeet stage, lighting & sound setup for a night of music.",
    longDescription: "Our Sangeet Night Setup service creates a dazzling stage for your family's musical celebration! With a glamorous performance stage, dynamic LED lighting, professional sound, and a dance floor, we set the scene for an unforgettable night of songs, dance, and celebration.",
    badge: "Show Stopper",
    badgeColor: "#a21caf",
    gradientFrom: "#1a0a2e",
    gradientTo: "#701a75",
    accentColor: "#a21caf",
    category: "Pre-Wedding Functions",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Performance Stage", desc: "Glamorous stage with backdrop" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Dynamic LED Lighting", desc: "Colour-changing dance floor lighting" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Professional Sound", desc: "Premium sound system for performances" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Dance Floor", desc: "Dedicated space for family performances" },
      { icon: "M9 12l2 2 4-4", title: "DJ Coordination", desc: "Can be paired with our wedding DJ service" },
      { icon: "M12 8v4l3 3", title: "Seating Arrangement", desc: "Comfortable guest seating around the stage" },
    ],
    includes: ["Performance stage & backdrop", "Dance floor lighting", "Sound system", "Guest seating"],
    faqs: [
      { q: "Can you support family dance rehearsals with music cues?", a: "Yes! We coordinate sound cues for choreographed family performances." },
      { q: "Is this indoor or outdoor?", a: "Both! We set up sangeet stages at banquet halls, lawns, and rooftops." },
      { q: "Can this be combined with a DJ?", a: "Yes! Our Wedding DJ & Sound service pairs perfectly with sangeet setups." },
      { q: "How large is the stage?", a: "Standard stage is 12x8 ft; larger sizes available on request." },
    ],
    relatedSlugs: ["haldi-ceremony-decoration", "mehndi-ceremony-decoration", "pre-wedding-catering", "pre-wedding-photoshoot"],
  },
  {
    slug: "engagement-decoration",
    name: "Engagement Ceremony Decoration",
    tagline: "The beginning of forever, beautifully staged!",
    description: "Elegant ring ceremony decoration — stage, florals & couple seating.",
    longDescription: "Our Engagement Ceremony Decoration service creates a beautiful, elegant setting for this milestone moment! With a designer stage backdrop, romantic floral styling, coordinated couple seating, and ambient lighting, we ensure your ring ceremony looks as special as the moment itself.",
    badge: "Milestone Moment",
    badgeColor: "#e11d48",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e11d48",
    category: "Pre-Wedding Functions",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Designer Stage Backdrop", desc: "Elegant floral or fabric backdrop" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Couple Seating", desc: "Coordinated seating for the couple" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Floral Styling", desc: "Fresh or artificial floral décor" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Ambient Lighting", desc: "Warm lighting for the ring exchange" },
      { icon: "M9 12l2 2 4-4", title: "Ring Platter Styling", desc: "Decorated ring exchange platter" },
      { icon: "M12 8v4l3 3", title: "Guest Seating", desc: "Elegant seating arrangement for guests" },
    ],
    includes: ["Stage backdrop design", "Couple seating", "Floral & lighting styling", "Ring platter decor", "Setup & takedown"],
    faqs: [
      { q: "Can the decor match our wedding theme colours?", a: "Yes! We coordinate engagement decor with your overall wedding palette." },
      { q: "Do you provide the ring platter itself?", a: "We style the platter presentation; the ring/tray is typically provided by the family." },
      { q: "Is outdoor engagement decoration available?", a: "Yes! Garden and terrace engagement setups are very popular." },
      { q: "How early should we book?", a: "We recommend booking 2-3 weeks in advance for wedding season dates." },
    ],
    relatedSlugs: ["sangeet-night-setup", "pre-wedding-photoshoot", "pre-wedding-catering", "haldi-ceremony-decoration"],
  },
  {
    slug: "pre-wedding-photoshoot",
    name: "Pre-Wedding Photoshoot",
    tagline: "Your love story, beautifully told!",
    description: "Professional pre-wedding photography & videography at scenic locations.",
    longDescription: "Our Pre-Wedding Photoshoot service captures the romance of your journey together before the big day! From scenic outdoor locations to styled indoor sets, our photographers craft cinematic, story-driven shoots that couples treasure and love sharing with family and friends.",
    badge: "Cinematic Story",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Pre-Wedding Functions",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Scenic Location Shoots", desc: "Curated outdoor & indoor locations" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Cinematic Videography", desc: "Story-driven pre-wedding video" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Outfit Coordination Guidance", desc: "Styling tips for coordinated looks" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Drone Coverage", desc: "Aerial shots for dramatic visuals" },
      { icon: "M9 12l2 2 4-4", title: "Online Gallery", desc: "Edited photos delivered via private link" },
      { icon: "M12 8v4l3 3", title: "Full-Day Coverage", desc: "Multi-location, full-day shoot options" },
    ],
    includes: ["Photography team", "Location scouting", "Edited digital gallery", "Highlight reel video (optional)"],
    faqs: [
      { q: "Do you help choose the shoot location?", a: "Yes! We suggest scenic locations based on your preferences and budget." },
      { q: "Is drone coverage available?", a: "Yes! Drone shots are available as an add-on, subject to permissions." },
      { q: "How long until we receive the photos?", a: "Edited galleries are typically delivered within 2-3 weeks." },
      { q: "Can we do multiple outfit changes?", a: "Yes! Multi-location, multi-outfit shoots are popular and fully supported." },
    ],
    relatedSlugs: ["engagement-decoration", "sangeet-night-setup", "haldi-ceremony-decoration", "pre-wedding-catering"],
  },
  {
    slug: "pre-wedding-catering",
    name: "Pre-Wedding Function Catering",
    tagline: "Delicious bites for every function!",
    description: "Curated catering for haldi, mehndi & sangeet — snacks, chaat & live counters.",
    longDescription: "Our Pre-Wedding Function Catering service brings delicious, festive menus to every pre-wedding celebration! From spicy chaat counters at mehndi to elaborate buffets for sangeet night, our catering partners deliver quality food and professional service tailored to each function's vibe.",
    badge: "Festive Flavours",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#16a34a",
    category: "Pre-Wedding Functions",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Function-Specific Menus", desc: "Curated menus for haldi, mehndi & sangeet" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Live Chaat Counters", desc: "Popular live chaat & snack stations" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Beverage Stations", desc: "Mocktails, juices & tea/coffee counters" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Dietary Options", desc: "Vegetarian & Jain menus available" },
      { icon: "M9 12l2 2 4-4", title: "Professional Service Staff", desc: "Trained waitstaff for smooth service" },
      { icon: "M12 8v4l3 3", title: "Scalable Headcount", desc: "From intimate to large family gatherings" },
    ],
    includes: ["Curated menu per function", "Live counters (as selected)", "Service staff", "Setup & clearance"],
    faqs: [
      { q: "Can menus differ across each function?", a: "Yes! We curate distinct menus suited to haldi, mehndi, and sangeet separately." },
      { q: "Are Jain options available?", a: "Yes! Full Jain and vegetarian menus are available." },
      { q: "What is the minimum guest count?", a: "Catering can be arranged for as few as 20 guests." },
      { q: "Can we book catering across all functions together?", a: "Yes! Multi-function catering packages come at special combined pricing." },
    ],
    relatedSlugs: ["haldi-ceremony-decoration", "mehndi-ceremony-decoration", "sangeet-night-setup", "engagement-decoration"],
  },
];

export function getPreWeddingServiceBySlug(slug: string): PreWeddingService | undefined {
  return ALL_PREWEDDING_SERVICES.find(s => s.slug === slug);
}
export function getRelatedPreWeddingServices(slugs: string[]): PreWeddingService[] {
  return slugs.map(s => ALL_PREWEDDING_SERVICES.find(g => g.slug === s)).filter(Boolean) as PreWeddingService[];
}
