export interface WaterActivityService {
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

export const ALL_WATER_ACTIVITY_SERVICES: WaterActivityService[] = [
  {
    slug: "water-pool",
    name: "Water Pool on Rent",
    tagline: "Splash into the fun — your very own pool party awaits!",
    description: "Inflatable & portable water pools on rent for parties & events.",
    longDescription: "Our Water Pool Rental brings the excitement of a private pool to any event! Available in multiple sizes — from small splash pools for toddlers to large rectangular pools for pool parties — our inflatable and portable pools are clean, safe, and set up by our team. Perfect for birthday parties, summer events, and family gatherings.",
    badge: "Splash Zone",
    badgeColor: "#0891b2",
    gradientFrom: "#020c1a",
    gradientTo: "#0e7490",
    accentColor: "#06b6d4",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Multiple Pool Sizes", desc: "Small splash pools to large party pools" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Clean & Hygienic", desc: "Thoroughly cleaned before every event" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Quick Inflation Setup", desc: "Pool ready in under 30 minutes" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Safety Supervised", desc: "Safety guidelines provided with every rental" },
      { icon: "M9 12l2 2 4-4", title: "Lawn & Indoor Ready", desc: "Works on grass, tiles, and flat surfaces" },
      { icon: "M12 8v4l3 3", title: "Delivery & Pickup", desc: "We deliver, set up, and collect after event" },
    ],
    includes: ["Pool (size as booked)", "Inflation & filling setup", "Post-event deflation & pickup"],
    faqs: [
      { q: "What sizes are available?", a: "We have small (6x4ft), medium (10x6ft), and large (15x10ft) pools." },
      { q: "Is the pool hygienic?", a: "Yes! Thoroughly cleaned and sanitised before every delivery." },
      { q: "Can it be set up indoors?", a: "Yes, on flat surfaces with adequate space." },
      { q: "How long does setup take?", a: "Typically 20–30 minutes for inflation and filling." },
    ],
    relatedSlugs: ["pool-party-planner", "pool-theme-party-planner", "rain-dance", "foam-machine"],
  },
  {
    slug: "rain-dance",
    name: "Rain Dance Setup",
    tagline: "Dance in the rain — the most fun you'll have all summer!",
    description: "Professional rain dance setup with shower system & DJ for parties.",
    longDescription: "Our Rain Dance Setup brings one of the most exhilarating party experiences to your event! A professional overhead shower system creates a monsoon-like rainfall effect while a DJ keeps the energy high — guests dance, splash, and celebrate in a safe, controlled rain environment. Perfect for summer birthday parties, college fests, and corporate fun days.",
    badge: "Most Thrilling",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Monsoon Shower System", desc: "Professional overhead rain shower setup" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "DJ Setup Included", desc: "DJ & sound system to keep the energy high" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Safe Water System", desc: "Controlled water pressure — safe for all ages" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Coloured Lighting", desc: "LED colour lighting for night rain dance events" },
      { icon: "M9 12l2 2 4-4", title: "Outdoor Setup", desc: "Available for lawns, terraces, and open areas" },
      { icon: "M12 8v4l3 3", title: "2–4 Hour Sessions", desc: "Flexible duration options" },
    ],
    includes: ["Overhead rain shower system", "DJ & sound setup", "Coloured LED lighting", "Water supply management", "Setup & takedown"],
    faqs: [
      { q: "Is rain dance safe for children?", a: "Yes! Water pressure is controlled and safe for all age groups." },
      { q: "Is DJ included?", a: "Yes! A DJ with sound system is part of our rain dance package." },
      { q: "How much space is needed?", a: "Minimum 20x20ft of open outdoor space recommended." },
      { q: "What about water supply?", a: "We manage the water supply connection; a water source at the venue is needed." },
    ],
    relatedSlugs: ["foam-machine", "water-pool", "pool-party-planner", "bubble-house-game"],
  },
  {
    slug: "foam-machine",
    name: "Foam Machine on Rent",
    tagline: "Foam frenzy — the party everyone talks about!",
    description: "Professional foam machine rental — creates mountains of safe party foam.",
    longDescription: "Our Foam Machine Rental transforms any party into an unforgettable foam frenzy! Our professional foam machines produce thousands of litres of soft, non-toxic foam that guests can dance, play, and party in. Safe for all ages, biodegradable, and absolutely incredible for photos and videos — a guaranteed party highlight.",
    badge: "Crowd Favourite",
    badgeColor: "#7c3aed",
    gradientFrom: "#0a001a",
    gradientTo: "#4c1d95",
    accentColor: "#7c3aed",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "High-Output Foam", desc: "Thousands of litres of foam per hour" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Non-Toxic & Safe", desc: "Child-safe, biodegradable foam solution" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Foam Liquid Included", desc: "Foam solution supplied for event duration" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Indoor & Outdoor", desc: "Works in both settings" },
      { icon: "M9 12l2 2 4-4", title: "Remote Controlled", desc: "Timed foam bursts via remote" },
      { icon: "M12 8v4l3 3", title: "Multiple Machines", desc: "Book multiple units for large areas" },
    ],
    includes: ["1 Foam machine", "Foam solution (sufficient for event)", "Remote control", "Delivery, setup & pickup"],
    faqs: [
      { q: "Is foam safe for children?", a: "Yes! We use non-toxic, biodegradable foam solution safe from age 3+." },
      { q: "Does foam leave a mess?", a: "Foam dissolves into water — minimal cleanup required." },
      { q: "Can it be used indoors?", a: "Yes! Works indoors; ensure the floor is slip-safe." },
      { q: "How long does foam last?", a: "Foam stays active for 10–15 minutes per burst then dissolves naturally." },
    ],
    relatedSlugs: ["foam-tub", "rain-dance", "bubble-house-game", "water-pool"],
  },
  {
    slug: "foam-tub",
    name: "Foam Tub on Rent",
    tagline: "Get into the foam — the most fun tub ever!",
    description: "Large foam-filled inflatable tubs for parties — safe, fun & photo-worthy.",
    longDescription: "Our Foam Tub Rental offers an enclosed inflatable tub experience filled with mountains of safe, non-toxic foam — perfect for a smaller, more controlled foam experience. Guests step in, get surrounded by foam, and create incredible photos and memories. Great for birthday parties, kids events, and fun zones at carnivals.",
    badge: "Fun Zone",
    badgeColor: "#ec4899",
    gradientFrom: "#1a0814",
    gradientTo: "#9d174d",
    accentColor: "#ec4899",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Enclosed Inflatable Tub", desc: "Safe enclosed structure filled with foam" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Non-Toxic Foam", desc: "Safe, biodegradable foam solution" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Photo-Perfect", desc: "Incredible for party photography" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Kids Friendly", desc: "Safe and supervised for all age groups" },
      { icon: "M9 12l2 2 4-4", title: "Quick Refill", desc: "Foam refillable throughout the event" },
      { icon: "M12 8v4l3 3", title: "Compact Footprint", desc: "Fits in small spaces — indoor & outdoor" },
    ],
    includes: ["1 Inflatable foam tub", "Foam solution (sufficient for event)", "Foam machine for refilling", "Delivery, setup & pickup"],
    faqs: [
      { q: "How many people fit in the foam tub?", a: "Standard tub fits 4–6 people at a time comfortably." },
      { q: "Is it safe for young children?", a: "Yes, with adult supervision recommended for children under 5." },
      { q: "Can the foam be refilled during the event?", a: "Yes! Foam can be refreshed multiple times during the event." },
      { q: "Does it work indoors?", a: "Yes — ensure adequate ventilation and a non-slip floor." },
    ],
    relatedSlugs: ["foam-machine", "bubble-house-game", "water-pool", "rain-dance"],
  },
  {
    slug: "snow-fall-machine-water",
    name: "Snow Fall Machine on Rent",
    tagline: "Make it snow at your party — magical & unforgettable!",
    description: "Artificial snowfall machine rental — indoor snow effect for any event.",
    longDescription: "Our Snow Fall Machine creates a breathtaking artificial snowfall effect that transforms your venue into a winter wonderland! Using safe, biodegradable artificial snow fluid, our machines create realistic fluttering snowflakes — perfect for Christmas parties, winter-themed birthdays, sangeet nights, and theme events.",
    badge: "Winter Magic",
    badgeColor: "#38bdf8",
    gradientFrom: "#082032",
    gradientTo: "#1e40af",
    accentColor: "#38bdf8",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Realistic Snow Effect", desc: "Fluttering artificial snowflakes" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Safe Snow Fluid", desc: "Biodegradable, non-toxic snow solution" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Indoor Use", desc: "Best for indoor halls and banquet venues" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Remote Controlled", desc: "Timed snow bursts via remote" },
      { icon: "M9 12l2 2 4-4", title: "Photo Worthy", desc: "Stunning in photos and videos" },
      { icon: "M12 8v4l3 3", title: "Fluid Included", desc: "Snow fluid for full event duration" },
    ],
    includes: ["1 Snow fall machine", "Snow fluid (sufficient for event)", "Remote control", "Delivery, setup & pickup"],
    faqs: [
      { q: "Is artificial snow safe?", a: "Yes! We use biodegradable, non-toxic snow fluid safe for all ages." },
      { q: "Does it make the floor slippery?", a: "Slightly — we recommend non-slip mats in the snow area." },
      { q: "Is it available outdoors?", a: "Best used indoors or in covered areas." },
      { q: "How many bursts does one fluid bottle produce?", a: "Each bottle supports 8–10 bursts of 30–60 seconds each." },
    ],
    relatedSlugs: ["bubble-house-game", "foam-machine", "rain-dance", "water-pool"],
  },
  {
    slug: "bubble-house-game",
    name: "Bubble House Game",
    tagline: "Step inside the bubble — the most unique party game!",
    description: "Inflatable bubble house & zorb ball games for kids & adults.",
    longDescription: "Our Bubble House Game brings one of the most unique and hilarious party experiences available! Guests climb inside giant transparent inflatable zorb balls or walk around in inflatable bubble suits — bumping, rolling, and laughing their way through games. Safe, supervised, and absolutely unforgettable for birthdays, carnivals, and corporate fun days.",
    badge: "Unique Experience",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#22c55e",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Zorb Ball & Bubble Suits", desc: "Giant transparent inflatable zorb experiences" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Safe & Supervised", desc: "Trained attendant manages all sessions" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Multiple Game Formats", desc: "Sumo, bumper, relay races & more" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "All Ages", desc: "Fun for kids and adults alike" },
      { icon: "M9 12l2 2 4-4", title: "Indoor & Outdoor", desc: "Playable in both settings" },
      { icon: "M12 8v4l3 3", title: "High Crowd Energy", desc: "Spectators enjoy watching as much as players" },
    ],
    includes: ["Bubble suits / zorb balls (quantity as booked)", "Trained attendant", "Game format coordination", "Delivery, setup & pickup"],
    faqs: [
      { q: "What age group is this for?", a: "Suitable for ages 6 and above; adult supervision for younger children." },
      { q: "How many people can play at once?", a: "Typically 4–8 players at a time depending on the game format." },
      { q: "Is it safe?", a: "Yes! All equipment is padded and attendant-supervised." },
      { q: "How much space is needed?", a: "Minimum 20x20ft of open flat space recommended." },
    ],
    relatedSlugs: ["foam-machine", "foam-tub", "rain-dance", "pool-party-planner"],
  },
  {
    slug: "pool-party-planner",
    name: "Pool Party Planner",
    tagline: "The ultimate pool party — planned to perfection!",
    description: "Complete pool party planning — decor, entertainment, food & more.",
    longDescription: "Our Pool Party Planner service handles everything for the ultimate pool party experience! From poolside decoration and themed props to DJ setup, food stalls, inflatables, and games coordination, our team manages every detail — so you can relax and enjoy the party. Available for home pools, rented pools, and resort venues.",
    badge: "Full Service",
    badgeColor: "#f97316",
    gradientFrom: "#1a0800",
    gradientTo: "#c2410c",
    accentColor: "#f97316",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "End-to-End Planning", desc: "Complete pool party managed by our team" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Poolside Decoration", desc: "Themed decor, balloons & poolside styling" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "DJ & Entertainment", desc: "DJ setup for poolside music" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Games & Inflatables", desc: "Pool games and inflatable setups" },
      { icon: "M9 12l2 2 4-4", title: "Dedicated Party Manager", desc: "On-site coordinator for smooth execution" },
      { icon: "M12 8v4l3 3", title: "Food Stall Coordination", desc: "Poolside food & beverage setups available" },
    ],
    includes: ["Party concept & planning", "Poolside decoration", "DJ & sound setup", "Games coordination", "Dedicated on-site party manager"],
    faqs: [
      { q: "Do you provide the pool?", a: "We can arrange a portable pool or plan around your existing pool." },
      { q: "Is food catering included?", a: "We coordinate with catering partners — share your requirements." },
      { q: "How early should we book?", a: "Minimum 2 weeks in advance; 3–4 weeks for larger parties." },
      { q: "What is the minimum guest count?", a: "We plan pool parties for 20 guests and above." },
    ],
    relatedSlugs: ["pool-theme-party-planner", "water-pool", "rain-dance", "foam-machine"],
  },
  {
    slug: "pool-theme-party-planner",
    name: "Pool Theme Party Planner",
    tagline: "Themed pool parties that WOW from start to finish!",
    description: "Themed pool party setups — Hawaiian, Mermaid, Tropical & more.",
    longDescription: "Our Pool Theme Party Planner takes pool parties to the next level with fully immersive themed setups! Choose from Hawaiian luau, Mermaid kingdom, Tropical beach, Under the Sea, Miami vibes, or a fully custom theme — we create matching decorations, costumes, props, themed food stations, and entertainment that transforms the entire poolside into a themed wonderland.",
    badge: "Themed WOW",
    badgeColor: "#0891b2",
    gradientFrom: "#021a1a",
    gradientTo: "#0f766e",
    accentColor: "#14b8a6",
    category: "Water Activities",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "10+ Theme Options", desc: "Hawaiian, Mermaid, Tropical, Under the Sea & more" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Full Themed Decor", desc: "Decorations, props & signage in chosen theme" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Themed Costumes", desc: "Theme-matching costume suggestions for guests" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Themed Food Stations", desc: "Food & beverage setups matching the theme" },
      { icon: "M9 12l2 2 4-4", title: "Entertainment Matching", desc: "Theme-appropriate entertainment coordination" },
      { icon: "M12 8v4l3 3", title: "Custom Themes", desc: "Fully custom themes on request" },
    ],
    includes: ["Theme concept & planning", "Full themed poolside decoration", "Theme props & signage", "Themed entertainment coordination", "Dedicated on-site party manager"],
    faqs: [
      { q: "What themes are available?", a: "Hawaiian, Mermaid, Tropical, Under the Sea, Miami, Flamingo, Neon Pool & custom themes." },
      { q: "Can we have a fully custom theme?", a: "Yes! Share your concept and we'll design it from scratch." },
      { q: "Does this include the pool?", a: "We can arrange a portable pool or plan around your existing one." },
      { q: "How early should we book?", a: "At least 3–4 weeks in advance for themed setups." },
    ],
    relatedSlugs: ["pool-party-planner", "water-pool", "foam-machine", "rain-dance"],
  },
];

export function getWaterActivityServiceBySlug(slug: string): WaterActivityService | undefined {
  return ALL_WATER_ACTIVITY_SERVICES.find(s => s.slug === slug);
}
export function getRelatedWaterActivityServices(slugs: string[]): WaterActivityService[] {
  return slugs.map(s => ALL_WATER_ACTIVITY_SERVICES.find(g => g.slug === s)).filter(Boolean) as WaterActivityService[];
}
