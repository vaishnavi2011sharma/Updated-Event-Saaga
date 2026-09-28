export interface BabyShowerService {
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

export const ALL_BABYSHOWER_SERVICES: BabyShowerService[] = [
  {
    slug: "baby-shower-theme-decoration",
    name: "Baby Shower Theme Decoration",
    tagline: "Celebrate the journey to motherhood in style!",
    description: "Fully themed baby shower setups — florals, balloons & personalised backdrops.",
    longDescription: "Our Baby Shower Theme Decoration transforms any venue into a warm, celebratory space for the mother-to-be! Choose from florals, pastel balloon arrangements, boho macrame, or a fully custom theme — every setup includes a personalised backdrop, seating for the mother-to-be, and elegant table styling designed to be Instagram-perfect.",
    badge: "Most Loved",
    badgeColor: "#ec4899",
    gradientFrom: "#1a0814",
    gradientTo: "#9d174d",
    accentColor: "#ec4899",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Custom Backdrop", desc: "Personalised name & date backdrop" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Mother-to-Be Throne", desc: "Decorated seating for the guest of honour" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Pastel Balloon Décor", desc: "Soft pastel or gender-reveal colour balloons" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Floral Styling", desc: "Fresh or artificial floral accents" },
      { icon: "M9 12l2 2 4-4", title: "Table Styling", desc: "Coordinated dessert & gift table setup" },
      { icon: "M12 8v4l3 3", title: "Home or Venue", desc: "Setup at home, banquet hall, or hotel" },
    ],
    includes: ["Themed backdrop with name", "Decorated mother-to-be chair", "Balloon décor", "Floral & table styling", "Setup & takedown"],
    faqs: [
      { q: "Can the theme match a gender reveal?", a: "Yes! Pink, blue, or neutral gender-reveal colour palettes are available." },
      { q: "Is home setup available?", a: "Absolutely — home baby showers are our most popular booking." },
      { q: "Can we add a welcome sign?", a: "Yes! Personalised welcome signage is available as an add-on." },
      { q: "How early should we book?", a: "We recommend booking 5-7 days in advance." },
    ],
    relatedSlugs: ["baby-shower-balloon-arch", "godh-bharai-setup", "baby-shower-cake-table", "baby-shower-photography"],
  },
  {
    slug: "baby-shower-balloon-arch",
    name: "Baby Shower Balloon Arch",
    tagline: "A grand entrance for a grand celebration!",
    description: "Balloon arches & garlands in soft pastel tones for baby shower entrances.",
    longDescription: "Our Baby Shower Balloon Arch service creates a stunning entrance or backdrop feature using premium pastel and gender-reveal balloons. Organic garland-style or classic arch designs are available, complete with matching foil accents and personalised name balloons.",
    badge: "Instant Wow",
    badgeColor: "#f472b6",
    gradientFrom: "#1a0a14",
    gradientTo: "#be185d",
    accentColor: "#f472b6",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Organic Garland Arch", desc: "Soft, organic balloon garland design" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Pastel & Gender Tones", desc: "Pink, blue, or neutral colour palettes" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Name Foil Balloons", desc: "Baby's name in giant foil letters" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Entrance or Backdrop", desc: "Flexible placement for any venue layout" },
      { icon: "M9 12l2 2 4-4", title: "Long-Lasting Balloons", desc: "Premium balloons treated to last the event" },
      { icon: "M12 8v4l3 3", title: "Quick Setup", desc: "Ready well before guests arrive" },
    ],
    includes: ["Balloon arch or garland", "Name/foil balloon accents", "Setup & takedown"],
    faqs: [
      { q: "How long do the balloons last?", a: "Our premium balloons stay full and vibrant for the full event duration." },
      { q: "Can it be combined with theme decoration?", a: "Yes! This pairs perfectly with our full theme decoration package." },
      { q: "Can we choose specific colours?", a: "Yes! Any pastel or gender-reveal colour combination is available." },
      { q: "Is outdoor setup possible?", a: "Yes, subject to weather conditions." },
    ],
    relatedSlugs: ["baby-shower-theme-decoration", "baby-shower-cake-table", "baby-shower-return-gifts", "godh-bharai-setup"],
  },
  {
    slug: "godh-bharai-setup",
    name: "Godh Bharai / Seemantham Setup",
    tagline: "Honouring tradition with elegance and grace!",
    description: "Traditional Godh Bharai / Seemantham ceremony decoration & styling.",
    longDescription: "Our Godh Bharai / Seemantham Setup blends traditional rituals with beautiful modern decor! We style the ceremony area with traditional motifs, floral rangoli, a decorated seating area for the mother-to-be, and ritual essentials arrangement — creating a graceful setting for this cherished cultural celebration.",
    badge: "Traditional",
    badgeColor: "#d97706",
    gradientFrom: "#1a1000",
    gradientTo: "#b45309",
    accentColor: "#d97706",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Traditional Décor Motifs", desc: "Culturally rooted design elements" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Floral Rangoli", desc: "Handcrafted floral rangoli design" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Ceremonial Seating", desc: "Decorated seating for mother-to-be & elders" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Ritual Essentials Styling", desc: "Thali & ritual items arranged aesthetically" },
      { icon: "M9 12l2 2 4-4", title: "Regional Customisation", desc: "Styling adapted to your regional tradition" },
      { icon: "M12 8v4l3 3", title: "Photo-Ready Setup", desc: "Beautifully styled for photography" },
    ],
    includes: ["Ceremony backdrop & decor", "Floral rangoli", "Decorated seating", "Ritual items styling", "Setup & takedown"],
    faqs: [
      { q: "Can decoration be customised to our regional tradition?", a: "Yes! We adapt styling for Punjabi, South Indian, Marwari, Bengali & more traditions." },
      { q: "Do you provide the ritual items themselves?", a: "We style the presentation; ritual items are typically provided by the family or purohit." },
      { q: "Can this be combined with a modern baby shower theme?", a: "Yes! Many families combine traditional rituals with a themed reception decor." },
      { q: "How much space is required?", a: "A minimum 10x10 ft ceremony area is recommended." },
    ],
    relatedSlugs: ["baby-shower-theme-decoration", "baby-shower-cake-table", "baby-shower-catering", "baby-shower-photography"],
  },
  {
    slug: "baby-shower-cake-table",
    name: "Baby Shower Cake Table Setup",
    tagline: "A sweet centrepiece for a sweet celebration!",
    description: "Styled dessert & cake table with backdrop, florals & themed accents.",
    longDescription: "Our Baby Shower Cake Table Setup creates a beautiful focal point for cake cutting and dessert display! We style the table with a coordinated backdrop, florals, fairy lights, and themed accents — perfect for capturing the sweetest moments of the celebration.",
    badge: "Picture Perfect",
    badgeColor: "#ec4899",
    gradientFrom: "#1a0814",
    gradientTo: "#9d174d",
    accentColor: "#ec4899",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Styled Backdrop", desc: "Coordinated backdrop behind the cake" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Dessert Table Styling", desc: "Space for cupcakes, favours & sweets" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Floral & Fairy Lights", desc: "Soft romantic lighting & floral accents" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Themed Props", desc: "Baby-themed cake toppers & plaques" },
      { icon: "M9 12l2 2 4-4", title: "Table Draping", desc: "Premium fabric draping & runners" },
      { icon: "M12 8v4l3 3", title: "Quick Setup", desc: "Ready ahead of cake cutting time" },
    ],
    includes: ["Styled cake/dessert table & backdrop", "Floral & prop accents", "Fairy light setup", "Themed cake plaque"],
    faqs: [
      { q: "Do you provide the cake itself?", a: "Table styling only; cakes can be arranged as a separate add-on." },
      { q: "Can it match our chosen theme?", a: "Yes! Styling is coordinated with your full theme decoration." },
      { q: "What table size works best?", a: "A standard 4x2.5 ft table is ideal, but we adapt to your venue." },
      { q: "Can fresh flowers be used?", a: "Yes! Fresh floral upgrades are available on request." },
    ],
    relatedSlugs: ["baby-shower-theme-decoration", "baby-shower-balloon-arch", "baby-shower-catering", "baby-shower-return-gifts"],
  },
  {
    slug: "baby-shower-games-host",
    name: "Baby Shower Games & Host",
    tagline: "Fun, laughter & memories for the mother-to-be!",
    description: "Curated baby shower games with a dedicated host to run the celebration.",
    longDescription: "Our Baby Shower Games & Host service brings a curated selection of fun, guest-friendly games — baby food guessing, dirty diaper challenge, guess the belly size, and more — led by an energetic host who keeps the celebration flowing smoothly and full of laughter.",
    badge: "Guest Favourite",
    badgeColor: "#a21caf",
    gradientFrom: "#1a0a2e",
    gradientTo: "#701a75",
    accentColor: "#a21caf",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Curated Game Selection", desc: "8-10 popular baby shower games" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Dedicated Host", desc: "Energetic host runs the full flow" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Printed Game Cards", desc: "Ready-to-use game sheets & props" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Prize Coordination", desc: "Winner prizes arranged and distributed" },
      { icon: "M9 12l2 2 4-4", title: "1-2 Hour Sessions", desc: "Flexible duration for any guest count" },
      { icon: "M12 8v4l3 3", title: "Custom Selection", desc: "Games tailored to guest preferences" },
    ],
    includes: ["Dedicated party host", "8-10 curated games", "Game cards & props", "Prize support coordination"],
    faqs: [
      { q: "What games are typically played?", a: "Guess the belly size, baby food tasting, dirty diaper challenge, and more — customised to preference." },
      { q: "Is this suitable for large gatherings?", a: "Yes, we scale games for both intimate and large guest lists." },
      { q: "Can games be culturally adapted?", a: "Yes! We can tailor games to suit different cultural preferences." },
      { q: "How long does the session run?", a: "Typically 1-2 hours depending on the number of games chosen." },
    ],
    relatedSlugs: ["baby-shower-theme-decoration", "baby-shower-return-gifts", "baby-shower-photography", "baby-shower-catering"],
  },
  {
    slug: "baby-shower-return-gifts",
    name: "Baby Shower Return Gift Hampers",
    tagline: "A little thank you guests will treasure!",
    description: "Curated return gift hampers for baby shower guests, elegantly packaged.",
    longDescription: "Our Baby Shower Return Gift Hampers service takes the stress out of party favours! We curate thoughtful, elegantly packaged hampers — from scented candles and mini plants to personalised trinkets — that guests will genuinely treasure as a memory of the celebration.",
    badge: "Guest Delight",
    badgeColor: "#db2777",
    gradientFrom: "#2d0a1e",
    gradientTo: "#9d174d",
    accentColor: "#db2777",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Elegant Curation", desc: "Thoughtfully selected gift items" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Custom Packaging", desc: "Themed gift boxes or bags" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Personalised Tags", desc: "Named tags with thank-you messages" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Bulk Ordering", desc: "Volume pricing for large guest lists" },
      { icon: "M9 12l2 2 4-4", title: "Budget Options", desc: "Multiple price tiers available" },
      { icon: "M12 8v4l3 3", title: "On-Time Delivery", desc: "Delivered ready before your event" },
    ],
    includes: ["Curated return gift per guest", "Themed packaging", "Personalised tags", "Delivery before event"],
    faqs: [
      { q: "Can gifts be personalised?", a: "Yes! Custom tags with names or messages are included." },
      { q: "What's the minimum order quantity?", a: "Minimum order is typically 10 hampers." },
      { q: "Do you offer different budget tiers?", a: "Yes! Multiple price points to suit any budget." },
      { q: "Can packaging be theme-matched?", a: "Yes! Packaging can be coordinated with your baby shower theme." },
    ],
    relatedSlugs: ["baby-shower-theme-decoration", "baby-shower-games-host", "baby-shower-cake-table", "baby-shower-catering"],
  },
  {
    slug: "baby-shower-catering",
    name: "Baby Shower Catering",
    tagline: "Delicious spreads for a joyful gathering!",
    description: "Curated catering menus for baby shower celebrations — veg, snacks & desserts.",
    longDescription: "Our Baby Shower Catering service offers curated, guest-friendly menus perfect for daytime or evening celebrations! From elegant tea-party finger foods and live counters to full sit-down meals, our catering partners deliver quality food with professional service staff.",
    badge: "Delicious",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#16a34a",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Curated Menus", desc: "Tea-party finger foods to full meals" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Live Counters", desc: "Optional live chaat, dessert & beverage counters" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Dietary Options", desc: "Vegetarian, Jain & allergen-aware menus" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Professional Service Staff", desc: "Trained waitstaff included" },
      { icon: "M9 12l2 2 4-4", title: "Custom Headcount", desc: "Scalable from 15 to 200+ guests" },
      { icon: "M12 8v4l3 3", title: "Elegant Presentation", desc: "Beautifully styled food displays" },
    ],
    includes: ["Curated menu selection", "Service staff", "Crockery & display setup", "Setup & clearance"],
    faqs: [
      { q: "Are vegetarian and Jain options available?", a: "Yes! Full vegetarian and Jain menus are available." },
      { q: "What is the minimum guest count?", a: "Catering can be arranged for as few as 15 guests." },
      { q: "Can we do a live counter?", a: "Yes! Live chaat, pasta, or dessert counters are popular add-ons." },
      { q: "How far in advance should we finalise the menu?", a: "We recommend finalising 5-7 days before the event." },
    ],
    relatedSlugs: ["baby-shower-theme-decoration", "baby-shower-cake-table", "godh-bharai-setup", "baby-shower-photography"],
  },
  {
    slug: "baby-shower-photography",
    name: "Baby Shower Photography",
    tagline: "Every glow, every smile — beautifully captured!",
    description: "Professional baby shower photographer — candid & posed shots, fast delivery.",
    longDescription: "Our Baby Shower Photographers capture every precious moment of the celebration — from the decor reveal to games, rituals, and heartfelt family moments. Using professional cameras and thoughtful editing, we deliver a beautifully curated gallery you'll treasure forever.",
    badge: "Memories Forever",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Baby Shower",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Professional Camera", desc: "High-end equipment for sharp, warm photos" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Candid & Posed", desc: "Documentary-style candids and family portraits" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Online Gallery", desc: "Edited photos delivered via shareable link" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Fast Delivery", desc: "Photos delivered within 3-4 business days" },
      { icon: "M9 12l2 2 4-4", title: "Videography Add-On", desc: "Highlight reel video available" },
      { icon: "M12 8v4l3 3", title: "Print Options", desc: "Printed albums available on request" },
    ],
    includes: ["1 Professional photographer", "Coverage for event duration", "Edited digital photo gallery", "Online sharing link"],
    faqs: [
      { q: "How long until we receive the photos?", a: "Edited photos are delivered within 3-4 business days." },
      { q: "Is videography available?", a: "Yes! A highlight reel video is available as an add-on." },
      { q: "Can photos be printed into an album?", a: "Yes! Printed albums can be arranged at additional cost." },
      { q: "How many photos will we receive?", a: "Typically 50-100 edited photos per hour of coverage." },
    ],
    relatedSlugs: ["baby-shower-theme-decoration", "godh-bharai-setup", "baby-shower-games-host", "baby-shower-cake-table"],
  },
];

export function getBabyShowerServiceBySlug(slug: string): BabyShowerService | undefined {
  return ALL_BABYSHOWER_SERVICES.find(s => s.slug === slug);
}
export function getRelatedBabyShowerServices(slugs: string[]): BabyShowerService[] {
  return slugs.map(s => ALL_BABYSHOWER_SERVICES.find(g => g.slug === s)).filter(Boolean) as BabyShowerService[];
}
