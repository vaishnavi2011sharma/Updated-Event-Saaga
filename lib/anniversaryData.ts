export interface AnniversaryService {
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

export const ALL_ANNIVERSARY_SERVICES: AnniversaryService[] = [
  {
    slug: "anniversary-room-decoration",
    name: "Anniversary Room Decoration",
    tagline: "Celebrate your journey together, beautifully!",
    description: "Romantic anniversary room decor — florals, balloons & candlelight setups.",
    longDescription: "Our Anniversary Room Decoration service transforms any space into a romantic celebration of your journey together! With rose petal styling, elegant balloon arrangements, fairy lights, and personalised name/year signage, we create an intimate setting perfect for celebrating another year of love.",
    badge: "Most Loved",
    badgeColor: "#e11d48",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e11d48",
    category: "Anniversary Decoration",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Rose Petal Styling", desc: "Elegant petal decor on bed & floor" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Balloon & Floral Décor", desc: "Romantic balloon and floral arrangements" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Fairy Light Ambience", desc: "Warm twinkling lights for a romantic glow" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Personalised Signage", desc: "Names & anniversary year featured" },
      { icon: "M9 12l2 2 4-4", title: "Candle Styling", desc: "LED candle arrangements for safety" },
      { icon: "M12 8v4l3 3", title: "Home or Hotel Setup", desc: "We decorate homes and hotel rooms" },
    ],
    includes: ["Balloon & floral decor", "Rose petal styling", "Fairy lights", "Personalised name/year sign", "Setup & takedown"],
    faqs: [
      { q: "Can this be a surprise setup?", a: "Yes! We coordinate quietly so your partner is surprised." },
      { q: "Is hotel room decoration available?", a: "Yes! We partner with major hotels for room decoration access." },
      { q: "Can we add a cake or gifts?", a: "Yes! Cakes and gift add-ons can be arranged alongside decoration." },
      { q: "How long does setup take?", a: "Typically 1.5-2 hours for a full romantic setup." },
    ],
    relatedSlugs: ["anniversary-candlelight-dinner", "anniversary-cake-celebration", "anniversary-photography", "anniversary-surprise-planner"],
  },
  {
    slug: "anniversary-candlelight-dinner",
    name: "Anniversary Candlelight Dinner",
    tagline: "An intimate evening, just for two!",
    description: "Private candlelight dinner setup with décor, music & curated menu.",
    longDescription: "Our Anniversary Candlelight Dinner service creates an unforgettable private dining experience! With elegant table styling, soft candlelight, curated music, and a personalised menu, we set the perfect romantic scene for celebrating your special day — at home, on a rooftop, or in a private venue.",
    badge: "Romantic Evening",
    badgeColor: "#db2777",
    gradientFrom: "#2d0a1e",
    gradientTo: "#9d174d",
    accentColor: "#db2777",
    category: "Anniversary Decoration",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Elegant Table Styling", desc: "Beautifully set private dining table" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Curated Menu", desc: "Multi-course meal tailored to preference" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Ambient Music", desc: "Curated romantic playlist" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Rooftop & Private Venues", desc: "Home, rooftop, or hotel options" },
      { icon: "M9 12l2 2 4-4", title: "Dedicated Server", desc: "Private service for a personal touch" },
      { icon: "M12 8v4l3 3", title: "Photography Add-On", desc: "Capture the evening with optional photography" },
    ],
    includes: ["Table & seating setup", "Candlelight & floral styling", "Curated dinner menu", "Private service staff"],
    faqs: [
      { q: "Can we choose our own menu?", a: "Yes! We curate the menu together based on your preferences." },
      { q: "Is rooftop dinner setup available?", a: "Yes! Rooftop and terrace setups are among our most popular bookings." },
      { q: "Can this be combined with room decoration?", a: "Yes! Many couples pair this with our anniversary room decoration package." },
      { q: "How many guests can be accommodated?", a: "This is designed for 2, but can be scaled for small family celebrations." },
    ],
    relatedSlugs: ["anniversary-room-decoration", "anniversary-cake-celebration", "anniversary-photography", "anniversary-surprise-planner"],
  },
  {
    slug: "anniversary-cake-celebration",
    name: "Anniversary Cake & Celebration Setup",
    tagline: "Sweeten the moment with a stunning centrepiece!",
    description: "Styled cake table with backdrop, florals & personalised cake toppers.",
    longDescription: "Our Anniversary Cake & Celebration Setup creates a beautiful focal point for your special toast! We style the cake table with a coordinated backdrop, florals, fairy lights, and personalised toppers — perfect for capturing the sweetest moment of your anniversary celebration.",
    badge: "Sweet Moments",
    badgeColor: "#e11d48",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e11d48",
    category: "Anniversary Decoration",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Styled Backdrop", desc: "Coordinated backdrop behind the cake" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Personalised Toppers", desc: "Names & anniversary year toppers" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Floral Accents", desc: "Fresh or artificial floral styling" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Fairy Lights", desc: "Warm ambient lighting for photos" },
      { icon: "M9 12l2 2 4-4", title: "Table Draping", desc: "Premium fabric draping & runners" },
      { icon: "M12 8v4l3 3", title: "Quick Setup", desc: "Ready before your celebration moment" },
    ],
    includes: ["Styled cake table & backdrop", "Floral & prop accents", "Fairy light setup", "Personalised topper"],
    faqs: [
      { q: "Do you provide the cake itself?", a: "Table styling only; cakes can be arranged as a separate add-on." },
      { q: "Can it match our room decoration theme?", a: "Yes! Cake table styling is coordinated with your full decoration." },
      { q: "What table size works best?", a: "A standard 4x2.5 ft table is ideal, but we adapt to your venue." },
      { q: "Can fresh flowers be used?", a: "Yes! Fresh floral upgrades are available on request." },
    ],
    relatedSlugs: ["anniversary-room-decoration", "anniversary-candlelight-dinner", "anniversary-photography", "anniversary-surprise-planner"],
  },
  {
    slug: "anniversary-photography",
    name: "Anniversary Photography",
    tagline: "Every year, every moment — captured forever!",
    description: "Professional anniversary photographer — candid couple shots, fast delivery.",
    longDescription: "Our Anniversary Photographers capture the warmth and romance of your celebration! From candid couple moments to styled portrait shots, we deliver a beautifully edited gallery that lets you relive the magic of your special day for years to come.",
    badge: "Memories Forever",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Anniversary Decoration",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Candid Couple Shots", desc: "Natural, romantic candid photography" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Styled Portraits", desc: "Posed shots amidst your decor setup" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Online Gallery", desc: "Edited photos delivered via shareable link" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Fast Delivery", desc: "Photos delivered within 3 business days" },
      { icon: "M9 12l2 2 4-4", title: "Videography Add-On", desc: "Short highlight video available" },
      { icon: "M12 8v4l3 3", title: "Flexible Duration", desc: "1-2 hour coverage options" },
    ],
    includes: ["1 Professional photographer", "1-2 hour coverage", "Edited digital photo gallery", "Online sharing link"],
    faqs: [
      { q: "How long until we receive the photos?", a: "Edited photos are delivered within 3 business days." },
      { q: "Is videography available?", a: "Yes! A short highlight video is available as an add-on." },
      { q: "Can photography be combined with decoration?", a: "Yes! This pairs perfectly with our room decoration and candlelight dinner packages." },
      { q: "Can we get printed photos?", a: "Yes! Printed photos can be arranged at additional cost." },
    ],
    relatedSlugs: ["anniversary-room-decoration", "anniversary-candlelight-dinner", "anniversary-cake-celebration", "anniversary-surprise-planner"],
  },
  {
    slug: "anniversary-surprise-planner",
    name: "Anniversary Surprise Planner",
    tagline: "Leave the surprise to us — you just show up!",
    description: "Full surprise anniversary planning — decor, gifts, timing & coordination.",
    longDescription: "Our Anniversary Surprise Planner service handles every detail of a perfectly timed surprise! From coordinating decor setup while your partner is away to arranging gifts, cake, and music cues, our team ensures the surprise unfolds flawlessly and the moment is exactly as you imagined.",
    badge: "Full Surprise",
    badgeColor: "#a21caf",
    gradientFrom: "#1a0a2e",
    gradientTo: "#701a75",
    accentColor: "#a21caf",
    category: "Anniversary Decoration",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Timed Coordination", desc: "Setup timed around your partner's schedule" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Gift Sourcing", desc: "We help source and wrap gifts" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Full Decor & Cake", desc: "Complete setup bundled together" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Discreet Execution", desc: "Quiet, professional coordination" },
      { icon: "M9 12l2 2 4-4", title: "Music & Ambience Cues", desc: "Playlist and lighting timed to the reveal" },
      { icon: "M12 8v4l3 3", title: "Dedicated Coordinator", desc: "Single point of contact managing everything" },
    ],
    includes: ["Full room/venue decoration", "Cake & gift coordination", "Timed setup execution", "Dedicated coordinator"],
    faqs: [
      { q: "How do you keep the surprise a secret?", a: "We coordinate directly with you and time our setup so your partner never suspects a thing." },
      { q: "Can you source specific gifts?", a: "Yes! We can help source and wrap gifts based on your preferences and budget." },
      { q: "How much advance notice do you need?", a: "We recommend at least 3-4 days notice for a fully coordinated surprise." },
      { q: "Is this available for milestone anniversaries?", a: "Yes! Milestone years (10th, 25th, 50th) get extra-special styling options." },
    ],
    relatedSlugs: ["anniversary-room-decoration", "anniversary-candlelight-dinner", "anniversary-cake-celebration", "anniversary-photography"],
  },
  {
    slug: "anniversary-outdoor-decoration",
    name: "Anniversary Outdoor / Terrace Decoration",
    tagline: "Celebrate your love under the open sky!",
    description: "Rooftop & terrace anniversary decoration with fairy lights & cozy seating.",
    longDescription: "Our Anniversary Outdoor / Terrace Decoration service creates a dreamy open-air celebration space! With fairy light canopies, cozy lounge seating, floral accents, and warm ambient lighting, we transform any rooftop or terrace into a magical setting perfect for celebrating your love story.",
    badge: "Open-Air Romance",
    badgeColor: "#e11d48",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e11d48",
    category: "Anniversary Decoration",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Fairy Light Canopy", desc: "Overhead string light canopy setup" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Cozy Lounge Seating", desc: "Comfortable romantic seating area" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Floral Styling", desc: "Fresh or artificial floral accents" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Weather Contingency", desc: "Backup plans for changing weather" },
      { icon: "M9 12l2 2 4-4", title: "Evening Ambience", desc: "Warm lighting perfect for sunset toasts" },
      { icon: "M12 8v4l3 3", title: "Home or Venue", desc: "Residential terraces or banquet rooftops" },
    ],
    includes: ["Fairy light canopy setup", "Seating arrangement", "Floral styling", "Setup & takedown"],
    faqs: [
      { q: "Can this be done at home terraces?", a: "Yes! We set up at residential terraces, rooftops, and open lawns." },
      { q: "What if it rains?", a: "We offer weather contingency plans including canopy covers." },
      { q: "Can this be combined with a candlelight dinner?", a: "Yes! Outdoor decor pairs beautifully with our candlelight dinner package." },
      { q: "Is lighting safe for outdoor use?", a: "Yes, all our lighting is weatherproof and safety-tested." },
    ],
    relatedSlugs: ["anniversary-candlelight-dinner", "anniversary-room-decoration", "anniversary-cake-celebration", "anniversary-photography"],
  },
];

export function getAnniversaryServiceBySlug(slug: string): AnniversaryService | undefined {
  return ALL_ANNIVERSARY_SERVICES.find(s => s.slug === slug);
}
export function getRelatedAnniversaryServices(slugs: string[]): AnniversaryService[] {
  return slugs.map(s => ALL_ANNIVERSARY_SERVICES.find(g => g.slug === s)).filter(Boolean) as AnniversaryService[];
}
