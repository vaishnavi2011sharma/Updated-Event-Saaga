export interface CarnivalService {
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

export const ALL_CARNIVAL_SERVICES: CarnivalService[] = [
  {
    slug: "school-carnival-organiser",
    name: "School Carnival Organiser",
    tagline: "A full day of fun for the whole school!",
    description: "End-to-end school carnival management — games, stalls, artists & rides.",
    longDescription: "Our School Carnival Organiser service delivers a complete, hassle-free carnival experience! From game stalls and food counters to mascots, artists, and fun rides, we manage every element of the event, letting schools focus on the celebration while we handle the logistics.",
    badge: "Full Management",
    badgeColor: "#f97316",
    gradientFrom: "#1a0800",
    gradientTo: "#c2410c",
    accentColor: "#f97316",
    category: "Carnival Event Organiser",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Game Stall Setup", desc: "10+ classic carnival game stalls" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Food Stall Coordination", desc: "Popcorn, candy floss & snack counters" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Mascots & Artists", desc: "Character performers & entertainers" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Rides & Inflatables", desc: "Bouncy castles & fun rides" },
      { icon: "M9 12l2 2 4-4", title: "Full On-Ground Team", desc: "Staff manage the entire event live" },
      { icon: "M12 8v4l3 3", title: "Scalable for Any Size", desc: "From small fairs to 5000+ students" },
    ],
    includes: ["Game & food stalls", "Mascot & artist performances", "Rides & inflatables", "On-ground event management team"],
    faqs: [
      { q: "How many students can you cater for?", a: "We manage school carnivals from 100 to 5,000+ students." },
      { q: "Can we customise the games and stalls?", a: "Yes! We tailor the stall and game mix to your school's preferences and budget." },
      { q: "Do you handle ticketing/coupon systems?", a: "Yes! We can set up token or coupon systems for stalls if required." },
      { q: "How far in advance should we book?", a: "We recommend booking 3-4 weeks in advance for large school carnivals." },
    ],
    relatedSlugs: ["society-fun-fair-organiser", "corporate-fun-fair", "carnival-game-stalls", "carnival-food-stalls"],
  },
  {
    slug: "society-fun-fair-organiser",
    name: "Society / Apartment Fun Fair",
    tagline: "Bringing neighbours together for a day of fun!",
    description: "Complete fun fair management for residential societies & apartments.",
    longDescription: "Our Society / Apartment Fun Fair service creates a vibrant community celebration! With game stalls, food counters, entertainment, and activities for all ages, we help residential communities host a memorable fun fair that brings neighbours together.",
    badge: "Community Favourite",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#16a34a",
    category: "Carnival Event Organiser",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "All-Age Activities", desc: "Games and stalls suited for every age group" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Food & Snack Counters", desc: "Popcorn, candy floss & live counters" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "DJ & Music", desc: "Optional DJ setup for community energy" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Kids Zone", desc: "Dedicated bouncy castle & games area" },
      { icon: "M9 12l2 2 4-4", title: "Vendor Coordination", desc: "Optional resident vendor stall coordination" },
      { icon: "M12 8v4l3 3", title: "Flexible Scale", desc: "From single tower events to full townships" },
    ],
    includes: ["Game & food stalls", "Kids activity zone", "On-ground coordination team", "Setup & takedown"],
    faqs: [
      { q: "Can we include a talent show or stage segment?", a: "Yes! We can integrate stage performances alongside the fair activities." },
      { q: "Is this suitable for smaller societies?", a: "Yes! We scale packages for both compact and large townships." },
      { q: "Do you coordinate with the RWA/management committee?", a: "Yes! We work directly with your society's event committee." },
      { q: "Can residents run their own stalls too?", a: "Yes! We can coordinate space for resident-run stalls alongside our offerings." },
    ],
    relatedSlugs: ["school-carnival-organiser", "corporate-fun-fair", "carnival-game-stalls", "carnival-food-stalls"],
  },
  {
    slug: "corporate-fun-fair",
    name: "Corporate Fun Fair",
    tagline: "Team bonding, carnival style!",
    description: "Corporate fun fair organisation — games, food & entertainment for teams.",
    longDescription: "Our Corporate Fun Fair service brings carnival-style fun to workplace celebrations! Perfect for family days, festive celebrations, and team bonding events, we set up engaging games, food stalls, and entertainment that employees and their families will love.",
    badge: "Team Bonding",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Carnival Event Organiser",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Team-Friendly Games", desc: "Fun activities suited for adults & families" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Food Stall Coordination", desc: "Live counters & snack stations" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Family Day Friendly", desc: "Kids zone for employees' families" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Branding Integration", desc: "Company branding across the fair" },
      { icon: "M9 12l2 2 4-4", title: "Entertainment Options", desc: "DJ, mascots & performers available" },
      { icon: "M12 8v4l3 3", title: "Full Event Management", desc: "Single point of contact end-to-end" },
    ],
    includes: ["Game & food stalls", "Entertainment coordination", "On-ground event management team", "Branded signage"],
    faqs: [
      { q: "Can this include employee families?", a: "Yes! Family day fun fairs are a popular corporate booking." },
      { q: "Can our company branding be integrated?", a: "Yes! Logo placements and brand colours can be incorporated throughout." },
      { q: "What team sizes can you support?", a: "From 50-person teams to 1000+ employee gatherings." },
      { q: "Can this be combined with a corporate annual day?", a: "Yes! Fun fair activities pair well with our Corporate Annual Day package." },
    ],
    relatedSlugs: ["school-carnival-organiser", "society-fun-fair-organiser", "carnival-game-stalls", "carnival-rides-inflatables"],
  },
  {
    slug: "carnival-game-stalls",
    name: "Carnival Game Stalls",
    tagline: "Classic games, endless fun!",
    description: "Curated carnival game stalls — ring toss, duck pond, balloon shooting & more.",
    longDescription: "Our Carnival Game Stalls service brings the nostalgic charm of classic fairground games to your event! From ring toss and duck pond to balloon shooting and bean bag throw, our fully-staffed stalls keep guests of all ages engaged and entertained.",
    badge: "Classic Fun",
    badgeColor: "#7c3aed",
    gradientFrom: "#0a001a",
    gradientTo: "#4c1d95",
    accentColor: "#7c3aed",
    category: "Carnival Event Organiser",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "10+ Game Options", desc: "Ring toss, duck pond, balloon shoot & more" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Fully Staffed Stalls", desc: "Trained attendants at every stall" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Prize Coordination", desc: "Winner prizes managed and distributed" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Colourful Stall Décor", desc: "Vibrant, carnival-themed stall design" },
      { icon: "M9 12l2 2 4-4", title: "Indoor & Outdoor", desc: "Adaptable to any venue type" },
      { icon: "M12 8v4l3 3", title: "Custom Selection", desc: "Choose the exact game mix you want" },
    ],
    includes: ["Selected game stalls (per package)", "Trained attendants", "Prize support coordination", "Setup & takedown"],
    faqs: [
      { q: "How many stalls do we need for our guest count?", a: "As a guideline, 1 stall per 30-40 guests keeps queues manageable." },
      { q: "Can we choose specific games?", a: "Yes! We customise the game selection to your preference." },
      { q: "Is this available as a standalone booking?", a: "Yes! Game stalls can be booked independently of full carnival management." },
      { q: "Do you provide prizes?", a: "We coordinate prize sourcing and distribution; specific prizes can be customised." },
    ],
    relatedSlugs: ["carnival-food-stalls", "carnival-rides-inflatables", "school-carnival-organiser", "society-fun-fair-organiser"],
  },
  {
    slug: "carnival-food-stalls",
    name: "Carnival Food Stalls",
    tagline: "Fairground flavours for every guest!",
    description: "Curated carnival food stalls — chaat, popcorn, candy floss & live counters.",
    longDescription: "Our Carnival Food Stalls service brings the fun of fairground food to your event! With a curated mix of chaat counters, popcorn, candy floss, and other beloved carnival treats, we set up a vibrant food zone that keeps guests happily fed throughout the celebration.",
    badge: "Tasty Fun",
    badgeColor: "#dc2626",
    gradientFrom: "#1a0000",
    gradientTo: "#7f1d1d",
    accentColor: "#ef4444",
    category: "Carnival Event Organiser",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Live Chaat Counters", desc: "Popular Indian street food favourites" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Popcorn & Candy Floss", desc: "Classic carnival sweet treats" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Beverage Stations", desc: "Mocktails, slushies & juice counters" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Hygienic Setup", desc: "Food-safe stall setup & handling" },
      { icon: "M9 12l2 2 4-4", title: "Themed Stall Décor", desc: "Vibrant, carnival-styled counters" },
      { icon: "M12 8v4l3 3", title: "Custom Menu Selection", desc: "Choose the food mix for your event" },
    ],
    includes: ["Selected food stalls (per package)", "Ingredients & staff", "Hygienic setup", "Setup & clearance"],
    faqs: [
      { q: "Can we choose specific food stalls?", a: "Yes! We customise the food stall mix to your preference and budget." },
      { q: "Are hygiene standards maintained?", a: "Yes! All stalls follow food-safe handling and hygiene practices." },
      { q: "How many guests can be served?", a: "Scalable from 50 guests to large-scale carnivals of 1000+." },
      { q: "Can this be combined with game stalls?", a: "Yes! Food and game stalls are frequently booked together for a complete carnival." },
    ],
    relatedSlugs: ["carnival-game-stalls", "carnival-rides-inflatables", "school-carnival-organiser", "corporate-fun-fair"],
  },
  {
    slug: "carnival-rides-inflatables",
    name: "Carnival Rides & Inflatables",
    tagline: "Bounce, slide & ride the fun away!",
    description: "Bouncy castles, slides & mini rides for carnivals & large-scale events.",
    longDescription: "Our Carnival Rides & Inflatables service adds high-energy attractions to any large event! With bouncy castles, inflatable slides, and mini rides, we create an exciting activity zone that keeps kids entertained for hours at school carnivals, society fairs, and corporate events.",
    badge: "Big Attraction",
    badgeColor: "#e11d48",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e11d48",
    category: "Carnival Event Organiser",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Bouncy Castles", desc: "Multiple sizes and themes available" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Inflatable Slides", desc: "Large slides for extra excitement" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Mini Rides", desc: "Carousel & mini rides for select venues" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Safety Supervision", desc: "Trained attendants at every attraction" },
      { icon: "M9 12l2 2 4-4", title: "Large Venue Coverage", desc: "Suited for schools, grounds & fairs" },
      { icon: "M12 8v4l3 3", title: "Safety Certified Equipment", desc: "Fully tested & maintained rides" },
    ],
    includes: ["Selected rides/inflatables", "Attendant supervision per attraction", "Setup & takedown"],
    faqs: [
      { q: "How much space is needed for multiple rides?", a: "We assess your venue and recommend the right mix based on available space." },
      { q: "Are the rides safety certified?", a: "Yes! All equipment is safety-tested and regularly maintained." },
      { q: "Can you supply rides for outdoor grounds?", a: "Yes! Our rides are suited for school grounds, open fields, and large venues." },
      { q: "Is supervision included?", a: "Yes! Trained attendants supervise every ride and inflatable throughout the event." },
    ],
    relatedSlugs: ["carnival-game-stalls", "carnival-food-stalls", "school-carnival-organiser", "society-fun-fair-organiser"],
  },
];

export function getCarnivalServiceBySlug(slug: string): CarnivalService | undefined {
  return ALL_CARNIVAL_SERVICES.find(s => s.slug === slug);
}
export function getRelatedCarnivalServices(slugs: string[]): CarnivalService[] {
  return slugs.map(s => ALL_CARNIVAL_SERVICES.find(g => g.slug === s)).filter(Boolean) as CarnivalService[];
}
