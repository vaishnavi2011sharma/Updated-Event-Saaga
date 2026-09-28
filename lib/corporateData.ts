export interface CorporateService {
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

export const ALL_CORPORATE_SERVICES: CorporateService[] = [
  {
    slug: "corporate-annual-day",
    name: "Corporate Annual Day",
    tagline: "Celebrate a year of achievements in style!",
    description: "End-to-end annual day event management — stage, entertainment & awards.",
    longDescription: "Our Corporate Annual Day service delivers a polished, memorable celebration of your company's year! From stage design and branded backdrops to entertainment, award ceremony coordination, and catering, we manage every detail so your team can simply enjoy the evening.",
    badge: "Flagship Event",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Corporate Events",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Branded Stage Design", desc: "Custom stage with your company branding" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Award Ceremony Flow", desc: "Scripted, well-paced awards segment" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Entertainment Line-Up", desc: "Live band, DJ, or performance acts" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Emcee & Script", desc: "Professional bilingual host" },
      { icon: "M9 12l2 2 4-4", title: "AV & Production", desc: "Sound, lighting, LED screens" },
      { icon: "M12 8v4l3 3", title: "Full Event Management", desc: "Single point of contact end-to-end" },
    ],
    includes: ["Stage & branded backdrop", "AV & production setup", "Emcee", "Award ceremony coordination", "Event management team"],
    faqs: [
      { q: "Can you accommodate 500+ employees?", a: "Yes! We manage annual days from 50 to 2000+ attendees." },
      { q: "Can branding be integrated throughout the venue?", a: "Yes! Logo placements, brand colours, and custom signage are included." },
      { q: "Do you arrange entertainment acts?", a: "Yes! Live bands, DJs, dance performances, and comedians can be arranged." },
      { q: "How far in advance should we book?", a: "We recommend booking 3-4 weeks in advance for large annual days." },
    ],
    relatedSlugs: ["corporate-product-launch", "corporate-team-offsite", "corporate-catering", "corporate-av-production"],
  },
  {
    slug: "corporate-product-launch",
    name: "Corporate Product Launch",
    tagline: "Make your launch unforgettable!",
    description: "Impactful product launch events — stage design, press coordination & reveal.",
    longDescription: "Our Corporate Product Launch service creates high-impact events that generate buzz! From dramatic reveal staging and branded environments to media coordination and guest experience design, we ensure your product gets the launch it deserves.",
    badge: "High Impact",
    badgeColor: "#dc2626",
    gradientFrom: "#1a0000",
    gradientTo: "#7f1d1d",
    accentColor: "#ef4444",
    category: "Corporate Events",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Dramatic Reveal Staging", desc: "Custom reveal mechanisms & lighting" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Branded Environment", desc: "Full venue styled to brand guidelines" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Media Coordination", desc: "Press area & photo-op zones" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Guest Experience Design", desc: "Registration, seating & flow planning" },
      { icon: "M9 12l2 2 4-4", title: "Live Streaming Option", desc: "Hybrid launch with online broadcast" },
      { icon: "M12 8v4l3 3", title: "AV & Production", desc: "Premium sound, lighting & screens" },
    ],
    includes: ["Reveal stage design", "Branded décor", "AV & production", "Guest flow management", "Media area setup"],
    faqs: [
      { q: "Can you support a hybrid launch with live streaming?", a: "Yes! We coordinate professional live streaming alongside the in-person event." },
      { q: "Do you help with press invitations?", a: "We coordinate the venue-side press experience; invitations are typically managed by your PR team." },
      { q: "Can the design match our brand guidelines exactly?", a: "Yes! We work from your brand kit to ensure full consistency." },
      { q: "What's the typical planning timeline?", a: "3-6 weeks depending on the scale and complexity of the launch." },
    ],
    relatedSlugs: ["corporate-annual-day", "corporate-av-production", "corporate-catering", "corporate-team-offsite"],
  },
  {
    slug: "corporate-team-offsite",
    name: "Corporate Team Offsite",
    tagline: "Recharge, reconnect, and realign your team!",
    description: "Team offsite planning — venue, activities, catering & logistics managed.",
    longDescription: "Our Corporate Team Offsite service takes care of every logistical detail so your team can focus on bonding and strategy! From venue selection and team-building activities to catering and transport coordination, we design offsites that energise and align your team.",
    badge: "Team Building",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#16a34a",
    category: "Corporate Events",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Venue Selection", desc: "Curated resorts, farmhouses & venues" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Team-Building Activities", desc: "Games, workshops & bonding sessions" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Catering & Meals", desc: "Full-day meal planning & service" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Transport Coordination", desc: "Group travel logistics managed" },
      { icon: "M9 12l2 2 4-4", title: "Evening Entertainment", desc: "DJ, bonfire, or games night" },
      { icon: "M12 8v4l3 3", title: "On-Ground Coordinator", desc: "Dedicated team manages the day" },
    ],
    includes: ["Venue sourcing & booking", "Team activities design", "Catering coordination", "Transport arrangement", "On-ground coordinator"],
    faqs: [
      { q: "Can you plan multi-day offsites?", a: "Yes! We manage single-day to multi-day offsite retreats." },
      { q: "Do you provide team-building facilitators?", a: "Yes! Professional facilitators can be arranged for structured activities." },
      { q: "What group sizes do you support?", a: "From small teams of 10 to large departments of 200+." },
      { q: "Can offsites be planned outside the city?", a: "Yes! We coordinate offsites at nearby hill stations, resorts, and getaway destinations." },
    ],
    relatedSlugs: ["corporate-annual-day", "corporate-catering", "corporate-product-launch", "corporate-av-production"],
  },
  {
    slug: "corporate-catering",
    name: "Corporate Event Catering",
    tagline: "Fuel your event with great food!",
    description: "Professional catering for corporate events — buffets, boxed meals & counters.",
    longDescription: "Our Corporate Event Catering service delivers quality food that keeps your event running smoothly! From efficient boxed meal service for conferences to elaborate buffet spreads for annual days, our catering partners ensure every guest is well-fed and impressed.",
    badge: "Reliable Service",
    badgeColor: "#d97706",
    gradientFrom: "#1a1000",
    gradientTo: "#b45309",
    accentColor: "#d97706",
    category: "Corporate Events",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Buffet & Boxed Options", desc: "Flexible service styles for any format" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Multi-Cuisine Menus", desc: "Indian, Continental & Asian options" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Live Counters", desc: "Coffee, chaat & dessert counters" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Dietary Accommodation", desc: "Vegetarian, vegan & allergen-aware" },
      { icon: "M9 12l2 2 4-4", title: "On-Time Service", desc: "Punctual delivery for tight schedules" },
      { icon: "M12 8v4l3 3", title: "Professional Staff", desc: "Trained service staff included" },
    ],
    includes: ["Curated menu", "Service staff", "Crockery & setup", "On-time delivery & clearance"],
    faqs: [
      { q: "Can you cater for conferences with tight schedules?", a: "Yes! We specialise in punctual boxed meal and coffee break service." },
      { q: "What is the minimum order size?", a: "Corporate catering can be arranged for 20+ guests." },
      { q: "Are vegan and allergen-free options available?", a: "Yes! We fully accommodate dietary requirements with advance notice." },
      { q: "Can you cater recurring weekly events?", a: "Yes! We offer standing arrangements for regular corporate catering needs." },
    ],
    relatedSlugs: ["corporate-annual-day", "corporate-team-offsite", "corporate-product-launch", "corporate-av-production"],
  },
  {
    slug: "corporate-av-production",
    name: "Corporate AV & Production",
    tagline: "Crystal-clear sound, stunning visuals!",
    description: "Professional AV production — sound, lighting, LED screens & live streaming.",
    longDescription: "Our Corporate AV & Production service ensures your event looks and sounds flawless! With premium sound systems, dynamic lighting design, LED video walls, and professional live-streaming capability, we handle the full technical backbone of your corporate event.",
    badge: "Technical Excellence",
    badgeColor: "#7c3aed",
    gradientFrom: "#0a001a",
    gradientTo: "#4c1d95",
    accentColor: "#7c3aed",
    category: "Corporate Events",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Premium Sound Systems", desc: "Crystal-clear audio for any venue size" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "LED Video Walls", desc: "High-resolution screens for presentations" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Stage Lighting", desc: "Dynamic, programmable lighting design" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Live Streaming", desc: "Professional multi-camera broadcast" },
      { icon: "M9 12l2 2 4-4", title: "Technical Crew", desc: "Experienced operators on-site" },
      { icon: "M12 8v4l3 3", title: "Backup Systems", desc: "Redundant equipment for zero downtime" },
    ],
    includes: ["Sound system setup", "Lighting design", "LED screen (as required)", "Technical crew", "Backup equipment"],
    faqs: [
      { q: "Can you support hybrid events with live streaming?", a: "Yes! Multi-camera live streaming with professional switching is available." },
      { q: "What venue sizes can you handle?", a: "From boardrooms to large auditoriums and outdoor venues." },
      { q: "Is backup equipment included?", a: "Yes! We always carry backup gear to prevent any technical downtime." },
      { q: "Can you integrate with our in-house AV team?", a: "Yes! We coordinate seamlessly with in-house or venue AV teams." },
    ],
    relatedSlugs: ["corporate-product-launch", "corporate-annual-day", "corporate-catering", "corporate-team-offsite"],
  },
  {
    slug: "corporate-csr-event",
    name: "Corporate CSR Event",
    tagline: "Purpose-driven events that create impact!",
    description: "CSR event planning — community drives, plantation events & charity galas.",
    longDescription: "Our Corporate CSR Event service helps bring your company's social responsibility initiatives to life! From tree plantation drives and community outreach events to charity galas and fundraising dinners, we manage the logistics so your CSR message shines through.",
    badge: "Purpose Driven",
    badgeColor: "#059669",
    gradientFrom: "#022c22",
    gradientTo: "#065f46",
    accentColor: "#10b981",
    category: "Corporate Events",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Community Drive Planning", desc: "Plantation, cleanup & outreach events" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Charity Gala Setup", desc: "Elegant fundraising event decor" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "NGO Coordination", desc: "Partnership logistics with NGO partners" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Volunteer Management", desc: "On-ground volunteer coordination" },
      { icon: "M9 12l2 2 4-4", title: "Documentation", desc: "Photography for CSR reporting" },
      { icon: "M12 8v4l3 3", title: "Brand Integration", desc: "Company branding woven throughout" },
    ],
    includes: ["Event concept & planning", "On-ground execution team", "Volunteer coordination", "Event photography"],
    faqs: [
      { q: "Can you coordinate with our NGO partner?", a: "Yes! We work alongside your chosen NGO partners for seamless execution." },
      { q: "Do you provide photography for CSR reports?", a: "Yes! Documentation photography is included for your internal reporting." },
      { q: "What types of CSR events do you manage?", a: "Plantation drives, cleanup campaigns, charity galas, health camps, and educational outreach events." },
      { q: "Can this be combined with an internal company event?", a: "Yes! CSR activities are often paired with team offsites or annual days." },
    ],
    relatedSlugs: ["corporate-team-offsite", "corporate-annual-day", "corporate-catering", "corporate-product-launch"],
  },
];

export function getCorporateServiceBySlug(slug: string): CorporateService | undefined {
  return ALL_CORPORATE_SERVICES.find(s => s.slug === slug);
}
export function getRelatedCorporateServices(slugs: string[]): CorporateService[] {
  return slugs.map(s => ALL_CORPORATE_SERVICES.find(g => g.slug === s)).filter(Boolean) as CorporateService[];
}
