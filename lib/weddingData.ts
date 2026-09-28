export interface WeddingService {
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

export const ALL_WEDDING_SERVICES: WeddingService[] = [
  {
    slug: "wedding-stage-decoration",
    name: "Wedding Stage Decoration",
    tagline: "The centrepiece of your forever moment!",
    description: "Grand wedding stage decoration — florals, drapes, lighting & custom backdrops.",
    longDescription: "Our Wedding Stage Decoration service creates the breathtaking focal point every wedding deserves! From lush floral backdrops and elegant drapery to statement lighting and custom mandap-style structures, our designers craft a stage that reflects your personal style — traditional, contemporary, or fusion.",
    badge: "Signature Service",
    badgeColor: "#d97706",
    gradientFrom: "#1a1000",
    gradientTo: "#b45309",
    accentColor: "#d97706",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Custom Floral Backdrop", desc: "Fresh or artificial florals in your palette" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Premium Drapery", desc: "Elegant fabric draping & canopy styling" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Statement Lighting", desc: "Chandeliers, fairy lights & uplighting" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Traditional or Fusion", desc: "Mandap, Christian altar, or fusion designs" },
      { icon: "M9 12l2 2 4-4", title: "Seating for Couple", desc: "Custom-designed couple thrones" },
      { icon: "M12 8v4l3 3", title: "Scalable Grandeur", desc: "Intimate to grand-scale designs" },
    ],
    includes: ["Full stage backdrop design", "Floral & fabric styling", "Couple seating", "Ambient lighting", "Setup & takedown"],
    faqs: [
      { q: "Can the design match our wedding theme?", a: "Yes! We design every stage around your chosen colour palette and theme." },
      { q: "How far in advance should we book?", a: "We recommend booking 3-4 weeks in advance for wedding season dates." },
      { q: "Do you handle destination weddings?", a: "Yes! We coordinate stage decor for destination weddings across India." },
      { q: "Can fresh flowers be used?", a: "Yes! Fresh floral upgrades are available on request." },
    ],
    relatedSlugs: ["wedding-mandap-setup", "wedding-lighting-design", "wedding-floral-decor", "wedding-photography"],
  },
  {
    slug: "wedding-mandap-setup",
    name: "Wedding Mandap Setup",
    tagline: "Sacred vows, beautifully staged!",
    description: "Traditional & designer mandap setups — floral, fabric & theme-based designs.",
    longDescription: "Our Wedding Mandap Setup service brings the sacred wedding ceremony space to life with breathtaking design! From traditional floral mandaps to contemporary geometric and crystal-draped structures, we craft a mandap that honours tradition while reflecting your personal aesthetic.",
    badge: "Sacred & Stunning",
    badgeColor: "#ca8a04",
    gradientFrom: "#1a1400",
    gradientTo: "#854d0e",
    accentColor: "#ca8a04",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Traditional & Designer Options", desc: "Classic floral or modern geometric mandaps" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Four-Pillar Structure", desc: "Sturdy, elegantly draped mandap frame" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Floral & Crystal Detailing", desc: "Rich floral garlands or crystal drape work" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Havan Kund Styling", desc: "Beautifully decorated ritual fire area" },
      { icon: "M9 12l2 2 4-4", title: "Regional Customisation", desc: "South Indian, North Indian, Gujarati styles" },
      { icon: "M12 8v4l3 3", title: "Indoor & Outdoor", desc: "Designed for any venue type" },
    ],
    includes: ["Mandap structure & drapery", "Floral or crystal detailing", "Havan kund styling", "Seating for rituals", "Setup & takedown"],
    faqs: [
      { q: "Can the mandap reflect our regional tradition?", a: "Yes! We design mandaps to match North Indian, South Indian, Gujarati, and more traditions." },
      { q: "Is an outdoor mandap possible?", a: "Yes! We build weather-appropriate outdoor mandap structures." },
      { q: "How long does setup take?", a: "Typically 4-6 hours depending on design complexity." },
      { q: "Can we combine mandap with stage decoration?", a: "Yes! Mandap and stage decor are frequently booked together." },
    ],
    relatedSlugs: ["wedding-stage-decoration", "wedding-floral-decor", "wedding-lighting-design", "wedding-catering"],
  },
  {
    slug: "wedding-floral-decor",
    name: "Wedding Floral Decoration",
    tagline: "Blooms that tell your love story!",
    description: "Fresh & artificial floral decoration for wedding venues, entrances & aisles.",
    longDescription: "Our Wedding Floral Decoration service brings nature's beauty to every corner of your celebration! From grand entrance floral arches and aisle runners to table centrepieces and hanging installations, our florists craft arrangements using seasonal fresh blooms or premium artificial florals.",
    badge: "Elegant Blooms",
    badgeColor: "#db2777",
    gradientFrom: "#2d0a1e",
    gradientTo: "#9d174d",
    accentColor: "#db2777",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Entrance Floral Arch", desc: "Grand welcome arch for your guests" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Aisle & Walkway Styling", desc: "Floral-lined aisle runners" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Table Centrepieces", desc: "Coordinated centrepieces for every table" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Hanging Installations", desc: "Ceiling floral drops & installations" },
      { icon: "M9 12l2 2 4-4", title: "Fresh & Artificial Options", desc: "Choose seasonal fresh or long-lasting artificial" },
      { icon: "M12 8v4l3 3", title: "Colour Palette Matched", desc: "Florals matched to your wedding colours" },
    ],
    includes: ["Entrance floral arch", "Aisle styling", "Table centrepieces", "Optional hanging installations", "Setup & takedown"],
    faqs: [
      { q: "Fresh or artificial — which is better?", a: "Fresh offers natural fragrance and texture; artificial is cost-effective and long-lasting. We advise based on your budget and season." },
      { q: "Can florals match our exact colour theme?", a: "Yes! We source and style flowers to match any palette." },
      { q: "How far ahead should fresh flowers be ordered?", a: "We recommend confirming fresh floral orders at least 2 weeks in advance." },
      { q: "Do you handle destination wedding florals?", a: "Yes! We coordinate floral logistics for destination weddings." },
    ],
    relatedSlugs: ["wedding-stage-decoration", "wedding-mandap-setup", "wedding-lighting-design", "wedding-catering"],
  },
  {
    slug: "wedding-lighting-design",
    name: "Wedding Lighting Design",
    tagline: "Set the mood, light up the celebration!",
    description: "Ambient & architectural lighting design for weddings — indoor & outdoor.",
    longDescription: "Our Wedding Lighting Design service transforms venues with beautifully layered lighting! From warm fairy-light canopies and dramatic uplighting to laser and LED effects for sangeet nights, our lighting designers create the perfect atmosphere for every moment of your celebration.",
    badge: "Set The Mood",
    badgeColor: "#a21caf",
    gradientFrom: "#1a0a2e",
    gradientTo: "#701a75",
    accentColor: "#a21caf",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Ambient Fairy Lighting", desc: "Warm canopy & string lighting" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Architectural Uplighting", desc: "Highlighting venue architecture beautifully" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Sangeet Stage Lighting", desc: "Dynamic LED & laser effects for dance nights" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Colour-Changing RGB", desc: "Programmable mood lighting" },
      { icon: "M9 12l2 2 4-4", title: "Outdoor Weatherproof", desc: "Safe, weatherproof outdoor lighting" },
      { icon: "M12 8v4l3 3", title: "Full Venue Coverage", desc: "Entrance, stage, dining & dance floor" },
    ],
    includes: ["Ambient & architectural lighting design", "Stage lighting setup", "Colour programming", "Safe electrical wiring", "Setup & takedown"],
    faqs: [
      { q: "Can lighting be synced to music for sangeet?", a: "Yes! We offer music-synced dynamic lighting for sangeet and reception nights." },
      { q: "Is outdoor lighting weatherproof?", a: "Yes, all outdoor lighting fixtures are weatherproof and safety-tested." },
      { q: "Can lighting match our theme colours?", a: "Yes! RGB and coloured gel lighting can match any palette." },
      { q: "How much power supply is needed?", a: "Our team assesses venue power capacity and brings backup generators if needed." },
    ],
    relatedSlugs: ["wedding-stage-decoration", "wedding-mandap-setup", "wedding-floral-decor", "wedding-dj-sound"],
  },
  {
    slug: "wedding-catering",
    name: "Wedding Catering",
    tagline: "Feasts worthy of your celebration!",
    description: "Multi-cuisine wedding catering — live counters, buffets & plated service.",
    longDescription: "Our Wedding Catering service delivers exceptional multi-cuisine dining experiences for your big day! From elaborate live counters and traditional thalis to elegant plated dinners and dessert stations, our catering partners ensure every guest is delighted with quality food and impeccable service.",
    badge: "Culinary Excellence",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#16a34a",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Multi-Cuisine Menus", desc: "Indian, Continental, Chinese, Italian & more" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Live Counters", desc: "Chaat, pasta, dosa, and dessert live stations" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Buffet or Plated Service", desc: "Choose your preferred serving style" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Dietary Accommodations", desc: "Vegetarian, Jain, vegan & allergen-aware" },
      { icon: "M9 12l2 2 4-4", title: "Professional Staff", desc: "Trained waitstaff & service coordination" },
      { icon: "M12 8v4l3 3", title: "Elegant Presentation", desc: "Beautifully styled buffet & counter displays" },
    ],
    includes: ["Multi-cuisine menu", "Live counters (as selected)", "Service staff & crockery", "Setup & clearance"],
    faqs: [
      { q: "How many guests can you cater for?", a: "From intimate 50-guest gatherings to grand 1000+ guest weddings." },
      { q: "Are Jain and vegan menus available?", a: "Yes! We fully accommodate Jain, vegan, and other dietary requirements." },
      { q: "When should the menu be finalised?", a: "We recommend finalising the menu 2-3 weeks before the event." },
      { q: "Do you provide a tasting session?", a: "Yes! A pre-event tasting session can be arranged on request." },
    ],
    relatedSlugs: ["wedding-stage-decoration", "wedding-dj-sound", "wedding-photography", "wedding-floral-decor"],
  },
  {
    slug: "wedding-dj-sound",
    name: "Wedding DJ & Sound",
    tagline: "The soundtrack to your celebration!",
    description: "Professional wedding DJ, live sound system & MC for sangeet & reception.",
    longDescription: "Our Wedding DJ & Sound service brings high-energy music and crystal-clear audio to every wedding function! With an experienced DJ curating the perfect playlist, a professional sound system, and an optional MC to keep the energy flowing, we ensure your dance floor never stops moving.",
    badge: "High Energy",
    badgeColor: "#dc2626",
    gradientFrom: "#1a0000",
    gradientTo: "#7f1d1d",
    accentColor: "#ef4444",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Professional DJ", desc: "Experienced wedding DJ with curated playlists" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Premium Sound System", desc: "High-quality speakers & audio equipment" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "MC / Anchor Option", desc: "Optional bilingual MC to host functions" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Custom Playlist", desc: "Music curated to your taste & guest mix" },
      { icon: "M9 12l2 2 4-4", title: "Dance Floor Lighting", desc: "Integrated party lighting with the sound setup" },
      { icon: "M12 8v4l3 3", title: "Multi-Function Coverage", desc: "Sangeet, baraat, and reception coverage" },
    ],
    includes: ["1 Professional DJ", "Premium sound system", "Basic dance floor lighting", "Coverage for agreed duration"],
    faqs: [
      { q: "Can we share a custom playlist in advance?", a: "Yes! We build the playlist collaboratively based on your preferences." },
      { q: "Is an MC/anchor included?", a: "MC service is available as an add-on to the DJ package." },
      { q: "How many hours of coverage are included?", a: "Standard packages include 3-4 hours; extensions available." },
      { q: "Do you provide sound for outdoor baraat?", a: "Yes! Portable baraat sound systems are available." },
    ],
    relatedSlugs: ["wedding-lighting-design", "wedding-catering", "wedding-stage-decoration", "wedding-photography"],
  },
  {
    slug: "wedding-photography",
    name: "Wedding Photography & Videography",
    tagline: "Every vow, every tear, every joy — forever captured!",
    description: "Professional wedding photography & cinematic videography coverage.",
    longDescription: "Our Wedding Photography & Videography service captures the full emotional arc of your celebration! From candid pre-wedding moments to the ceremony, reception, and every joyful detail in between, our photographers and cinematographers deliver a beautifully edited, timeless record of your day.",
    badge: "Timeless Memories",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Candid & Traditional Coverage", desc: "Documentary-style candids plus posed portraits" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Cinematic Videography", desc: "Highlight reel & full-length film options" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Drone Coverage", desc: "Aerial shots for grand venue moments" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Multi-Day Coverage", desc: "Full coverage across all wedding functions" },
      { icon: "M9 12l2 2 4-4", title: "Online Gallery", desc: "Edited photos shared via private gallery" },
      { icon: "M12 8v4l3 3", title: "Premium Albums", desc: "Curated printed albums available" },
    ],
    includes: ["Photography team", "Videography team", "Edited digital gallery", "Highlight reel video"],
    faqs: [
      { q: "Do you cover multi-day weddings?", a: "Yes! Packages scale for single-day to multi-day, multi-city weddings." },
      { q: "Is drone coverage included?", a: "Drone coverage is available as an add-on, subject to venue permissions." },
      { q: "How long until we receive the final gallery?", a: "Edited galleries are typically delivered within 3-4 weeks." },
      { q: "Can we get a same-day highlight reel?", a: "Yes! A same-day edit reel is available as a premium add-on." },
    ],
    relatedSlugs: ["wedding-stage-decoration", "wedding-dj-sound", "wedding-catering", "wedding-mandap-setup"],
  },
  {
    slug: "wedding-planning-coordination",
    name: "Wedding Planning & Coordination",
    tagline: "Your dream wedding, seamlessly executed!",
    description: "End-to-end wedding planning, vendor coordination & day-of management.",
    longDescription: "Our Wedding Planning & Coordination service takes the stress out of your big day! From vendor sourcing and budget management to timeline planning and on-ground day-of coordination, our dedicated wedding planners ensure every detail comes together flawlessly.",
    badge: "Full Service",
    badgeColor: "#f97316",
    gradientFrom: "#1a0800",
    gradientTo: "#c2410c",
    accentColor: "#f97316",
    category: "Wedding Services",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Dedicated Wedding Planner", desc: "Personal planner manages your entire wedding" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Vendor Coordination", desc: "We source and manage all vendors" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Budget Management", desc: "Transparent budget tracking & guidance" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Timeline Planning", desc: "Detailed function-by-function schedule" },
      { icon: "M9 12l2 2 4-4", title: "Day-Of Coordination", desc: "On-ground team manages execution live" },
      { icon: "M12 8v4l3 3", title: "Multi-Function Support", desc: "Covers all pre-wedding & wedding functions" },
    ],
    includes: ["Dedicated planner", "Vendor sourcing & management", "Budget planning", "Day-of on-ground coordination team"],
    faqs: [
      { q: "How early should we engage a planner?", a: "Ideally 4-6 months before the wedding for full planning support." },
      { q: "Do you handle destination weddings?", a: "Yes! We coordinate destination weddings across India and select international locations." },
      { q: "Is partial planning available?", a: "Yes! We offer full planning, partial planning, and day-of coordination packages." },
      { q: "Can we choose our own vendors?", a: "Yes! We can coordinate with your preferred vendors alongside our trusted network." },
    ],
    relatedSlugs: ["wedding-stage-decoration", "wedding-catering", "wedding-photography", "wedding-dj-sound"],
  },
];

export function getWeddingServiceBySlug(slug: string): WeddingService | undefined {
  return ALL_WEDDING_SERVICES.find(s => s.slug === slug);
}
export function getRelatedWeddingServices(slugs: string[]): WeddingService[] {
  return slugs.map(s => ALL_WEDDING_SERVICES.find(g => g.slug === s)).filter(Boolean) as WeddingService[];
}
