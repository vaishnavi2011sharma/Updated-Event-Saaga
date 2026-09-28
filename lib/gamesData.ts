export interface GamesService {
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

export const ALL_GAMES_SERVICES: GamesService[] = [
  {
    slug: "bouncy-castle-on-rent",
    name: "Bouncy Castle on Rent",
    tagline: "Bounce, jump & giggle all day long!",
    description: "Colourful inflatable bouncy castles for birthdays, carnivals & society events.",
    longDescription: "Our Bouncy Castle on Rent service brings hours of high-energy fun to any event! Available in multiple sizes and vibrant themes, our inflatable castles are safety-tested, professionally installed, and supervised throughout your event for worry-free enjoyment.",
    badge: "Kids Favourite",
    badgeColor: "#be123c",
    gradientFrom: "#1a0b2e",
    gradientTo: "#9d174d",
    accentColor: "#c81452",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Multiple Sizes & Themes", desc: "Choose from various colours and sizes" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Safety Certified", desc: "Fully tested & maintained equipment" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "On-Site Supervision", desc: "Trained attendant supervises usage" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Indoor & Outdoor", desc: "Suitable for lawns, halls & terraces" },
      { icon: "M9 12l2 2 4-4", title: "Quick Setup", desc: "Inflated and ready within 30 minutes" },
      { icon: "M12 8v4l3 3", title: "Hygienically Cleaned", desc: "Sanitised before every event" },
    ],
    includes: ["1 Bouncy castle unit", "Blower & power backup", "On-site attendant", "Setup & takedown"],
    faqs: [
      { q: "What age group is this suitable for?", a: "Ideal for children aged 3-12 years." },
      { q: "How much space is required?", a: "Approximately 15x15 ft of flat, clear space." },
      { q: "Is it safe for outdoor use?", a: "Yes, with proper anchoring; we monitor weather conditions for outdoor bookings." },
      { q: "How long is the rental duration?", a: "Standard bookings are for 3-4 hours; extensions available." },
    ],
    relatedSlugs: ["popcorn-machine-on-rent", "candy-floss-machine-on-rent", "electronic-games-on-rent", "casino-game-on-rent"],
  },
  {
    slug: "casino-game-on-rent",
    name: "Casino Game on Rent",
    tagline: "Roll the dice — Vegas-style fun for your event!",
    description: "Poker, roulette & blackjack tables with dealers for parties & corporate events.",
    longDescription: "Our Casino Game on Rent service brings the glamour of a casino night to your celebration! Complete with professional-grade poker, roulette, and blackjack tables plus experienced dealers, this is a guaranteed hit for corporate events, birthdays, and themed parties.",
    badge: "Vegas Nights",
    badgeColor: "#7c3aed",
    gradientFrom: "#0a001a",
    gradientTo: "#4c1d95",
    accentColor: "#7c3aed",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Poker, Roulette & Blackjack", desc: "Full range of classic casino tables" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Professional Dealers", desc: "Experienced dealers run every table" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Play-Money Chips", desc: "Fun-only chips, no real gambling" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Themed Setup", desc: "Casino-style ambience & signage" },
      { icon: "M9 12l2 2 4-4", title: "Multiple Table Options", desc: "Scale from 1 to 6+ tables" },
      { icon: "M12 8v4l3 3", title: "Corporate Friendly", desc: "Popular for company events & galas" },
    ],
    includes: ["Casino table(s) of choice", "Professional dealer(s)", "Play-money chips", "Setup & takedown"],
    faqs: [
      { q: "Is real money gambling involved?", a: "No, this is a fun-only entertainment setup using play chips — no real money is wagered." },
      { q: "How many tables do we need for our guest count?", a: "As a guideline, 1 table per 15-20 guests keeps the energy high." },
      { q: "Is this legal to host at private events?", a: "Yes, as a play-money entertainment activity it is a popular and compliant party feature." },
      { q: "Can dealers explain rules to first-timers?", a: "Yes! Our dealers happily guide beginners through the games." },
    ],
    relatedSlugs: ["electronic-games-on-rent", "bouncy-castle-on-rent", "chocolate-fountain-on-rent", "popcorn-machine-on-rent"],
  },
  {
    slug: "popcorn-machine-on-rent",
    name: "Popcorn Machine on Rent",
    tagline: "Fresh, buttery popcorn for every guest!",
    description: "Live popcorn machine setup with attendant — sweet, salty & caramel flavours.",
    longDescription: "Our Popcorn Machine on Rent service adds a fun, nostalgic snack station to any celebration! With fresh popcorn made live in front of guests, available in classic salty, sweet, and caramel flavours, it's a crowd-pleasing addition to birthdays, carnivals, and corporate events.",
    badge: "Crowd Pleaser",
    badgeColor: "#f97316",
    gradientFrom: "#1a0800",
    gradientTo: "#c2410c",
    accentColor: "#f97316",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Live Preparation", desc: "Fresh popcorn made in front of guests" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Multiple Flavours", desc: "Salty, sweet, caramel & masala options" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Themed Cart Available", desc: "Vintage-style popcorn cart option" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Attendant Included", desc: "Staff manages the station throughout" },
      { icon: "M9 12l2 2 4-4", title: "Unlimited Servings", desc: "Continuous serving for agreed duration" },
      { icon: "M12 8v4l3 3", title: "Compact Footprint", desc: "Fits any indoor or outdoor venue" },
    ],
    includes: ["Popcorn machine & cart", "Ingredients for chosen flavours", "Attendant", "Serving cups"],
    faqs: [
      { q: "How many guests can be served?", a: "Unlimited servings for the agreed rental duration — typically covers 100+ guests comfortably." },
      { q: "Can we choose multiple flavours?", a: "Yes! Up to 2-3 flavours can be offered per booking." },
      { q: "Do you provide serving cups?", a: "Yes! Branded or plain popcorn cups are included." },
      { q: "Is power supply required?", a: "Yes, a standard power socket is needed near the setup location." },
    ],
    relatedSlugs: ["candy-floss-machine-on-rent", "chocolate-fountain-on-rent", "bouncy-castle-on-rent", "electronic-games-on-rent"],
  },
  {
    slug: "candy-floss-machine-on-rent",
    name: "Candy Floss Machine on Rent",
    tagline: "Sweet, fluffy clouds of nostalgia!",
    description: "Live cotton candy machine with attendant — classic carnival treat for guests.",
    longDescription: "Our Candy Floss Machine on Rent service brings the joy of fairground cotton candy to your celebration! Spun fresh in front of guests in classic pink, blue, or custom colours, it's a beloved treat that delights kids and adults alike.",
    badge: "Carnival Classic",
    badgeColor: "#ec4899",
    gradientFrom: "#1a0814",
    gradientTo: "#be185d",
    accentColor: "#ec4899",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Live Spinning", desc: "Cotton candy spun fresh for each guest" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Custom Colours", desc: "Pink, blue, rainbow & theme colours" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Carnival Cart Option", desc: "Vintage-style decorated cart available" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Attendant Included", desc: "Staff manages the station throughout" },
      { icon: "M9 12l2 2 4-4", title: "Unlimited Servings", desc: "Continuous serving for agreed duration" },
      { icon: "M12 8v4l3 3", title: "All Ages", desc: "A nostalgic favourite for every age" },
    ],
    includes: ["Candy floss machine & cart", "Sugar & flavour supplies", "Attendant", "Serving sticks"],
    faqs: [
      { q: "Can we choose custom colours?", a: "Yes! Any colour, including theme-matched combinations, is available." },
      { q: "How many servings are included?", a: "Unlimited servings for the agreed rental duration." },
      { q: "Is this suitable for indoor venues?", a: "Yes! The machine is compact and works well indoors or outdoors." },
      { q: "Can it be paired with a popcorn station?", a: "Yes! Popcorn and candy floss stations are frequently booked together." },
    ],
    relatedSlugs: ["popcorn-machine-on-rent", "chocolate-fountain-on-rent", "bouncy-castle-on-rent", "casino-game-on-rent"],
  },
  {
    slug: "chocolate-fountain-on-rent",
    name: "Chocolate Fountain on Rent",
    tagline: "Dip into pure indulgence!",
    description: "Cascading chocolate fountain with fruits, marshmallows & dipping treats.",
    longDescription: "Our Chocolate Fountain on Rent service adds a luxurious, indulgent touch to any dessert table! With a flowing chocolate fountain paired with a curated selection of fruits, marshmallows, and cookies for dipping, it's an elegant and interactive treat station guests love.",
    badge: "Indulgent Treat",
    badgeColor: "#78350f",
    gradientFrom: "#1a0f00",
    gradientTo: "#78350f",
    accentColor: "#b45309",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Cascading Chocolate Fountain", desc: "Continuous flowing chocolate display" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Curated Dipping Items", desc: "Fresh fruits, marshmallows & cookies" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Multiple Fountain Sizes", desc: "Compact to grand tiered fountains" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Attendant Included", desc: "Staff maintains and refills the station" },
      { icon: "M9 12l2 2 4-4", title: "Elegant Presentation", desc: "Beautifully styled dessert table" },
      { icon: "M12 8v4l3 3", title: "Milk, Dark & White Options", desc: "Choose your preferred chocolate type" },
    ],
    includes: ["Chocolate fountain unit", "Chocolate supply", "Dipping items (fruits, marshmallows, cookies)", "Attendant"],
    faqs: [
      { q: "What chocolate types are available?", a: "Milk, dark, and white chocolate options are all available." },
      { q: "How many guests can be served?", a: "Depends on fountain size — from 30 to 150+ guests." },
      { q: "Can we choose our own dipping items?", a: "Yes! We can customise the dipping selection to your preference." },
      { q: "Is power supply required?", a: "Yes, a standard power socket is needed near the setup." },
    ],
    relatedSlugs: ["candy-floss-machine-on-rent", "popcorn-machine-on-rent", "casino-game-on-rent", "electronic-games-on-rent"],
  },
  {
    slug: "electronic-games-on-rent",
    name: "Electronic Games on Rent",
    tagline: "Arcade thrills for every celebration!",
    description: "Arcade & electronic game stations — foosball, air hockey, VR & more.",
    longDescription: "Our Electronic Games on Rent service brings arcade-style excitement to your event! From classic foosball and air hockey tables to immersive VR experiences and claw machines, we set up an engaging game zone that keeps guests of all ages entertained.",
    badge: "Arcade Fun",
    badgeColor: "#0891b2",
    gradientFrom: "#020c1a",
    gradientTo: "#0e7490",
    accentColor: "#06b6d4",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Foosball & Air Hockey", desc: "Classic tabletop arcade games" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "VR Experience Stations", desc: "Immersive virtual reality gaming" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Claw Machines", desc: "Fun prize-grab arcade machines" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Multiplayer Setup", desc: "Multiple stations for group play" },
      { icon: "M9 12l2 2 4-4", title: "Attendant Support", desc: "Staff assists guests throughout" },
      { icon: "M12 8v4l3 3", title: "All Ages", desc: "Loved by kids, teens & adults" },
    ],
    includes: ["Selected game stations", "Setup & power arrangement", "On-site attendant", "Takedown"],
    faqs: [
      { q: "How many game stations can we book?", a: "From a single station to a full arcade zone with 6+ games." },
      { q: "Is VR safe for all ages?", a: "VR experiences are recommended for guests aged 10 and above." },
      { q: "How much space is needed?", a: "Depends on the games chosen — our team advises based on your venue." },
      { q: "Is this suitable for corporate events?", a: "Yes! Electronic games are a popular addition to corporate fun fairs and offsites." },
    ],
    relatedSlugs: ["casino-game-on-rent", "bouncy-castle-on-rent", "chocolate-fountain-on-rent", "popcorn-machine-on-rent"],
  },
  {
    slug: "trampoline-on-rent",
    name: "Trampoline on Rent",
    tagline: "Jump higher, laugh louder!",
    description: "Safety-netted trampolines for birthdays, carnivals & society events.",
    longDescription: "Our Trampoline on Rent service delivers safe, high-energy fun for kids' events! Complete with protective safety netting and cushioned surrounds, our trampolines are professionally installed and supervised, making them a favourite at birthdays and carnivals alike.",
    badge: "High Energy",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#22c55e",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Safety Netting", desc: "Full protective enclosure around the jump area" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Cushioned Surrounds", desc: "Padded edges for safe landings" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Multiple Sizes", desc: "Single-jumper to multi-jumper units" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "On-Site Supervision", desc: "Trained attendant monitors usage" },
      { icon: "M9 12l2 2 4-4", title: "Indoor & Outdoor", desc: "Suitable for lawns, halls & terraces" },
      { icon: "M12 8v4l3 3", title: "Quick Setup", desc: "Assembled and ready within 45 minutes" },
    ],
    includes: ["1 Trampoline unit with safety netting", "On-site attendant", "Setup & takedown"],
    faqs: [
      { q: "What age group is this suitable for?", a: "Recommended for children aged 4-14 years, with supervised turns." },
      { q: "How much space is required?", a: "Approximately 12x12 ft of flat, clear space." },
      { q: "Is a safety attendant included?", a: "Yes! An attendant supervises usage and manages turn-taking." },
      { q: "How many kids can use it at once?", a: "1-2 jumpers at a time depending on the trampoline size, for safety." },
    ],
    relatedSlugs: ["bouncy-castle-on-rent", "electronic-games-on-rent", "popcorn-machine-on-rent", "candy-floss-machine-on-rent"],
  },
  {
    slug: "photo-booth-games-rent",
    name: "Photo Booth on Rent",
    tagline: "Snap, laugh, and take memories home!",
    description: "Classic photo booth with props & instant prints for parties & events.",
    longDescription: "Our Photo Booth on Rent service adds an interactive entertainment element loved by guests of all ages! Complete with a themed backdrop, fun prop kit, and optional instant printing, our photo booth becomes the go-to spot for candid memories throughout your event.",
    badge: "Guest Favourite",
    badgeColor: "#e11d48",
    gradientFrom: "#2d0a14",
    gradientTo: "#9f1239",
    accentColor: "#e11d48",
    category: "Games on Rent",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Themed Backdrop", desc: "Backdrop matched to your event theme" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Fun Props", desc: "Hats, glasses, signs & novelty props" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Instant Printing", desc: "Optional instant photo prints for guests" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Digital Copies", desc: "All photos shared digitally after event" },
      { icon: "M9 12l2 2 4-4", title: "Self-Service or Attended", desc: "With or without a dedicated attendant" },
      { icon: "M12 8v4l3 3", title: "All Ages", desc: "Loved by kids and adults alike" },
    ],
    includes: ["Themed photo booth backdrop", "Prop kit", "2-3 hour rental duration", "Digital photo delivery"],
    faqs: [
      { q: "Do you provide instant prints?", a: "Yes! Instant printing is available as an add-on service." },
      { q: "How much space is required?", a: "A minimum 8x8 ft area works best for the booth setup." },
      { q: "Can the backdrop match our event theme?", a: "Yes! We design the backdrop to match your chosen theme and colours." },
      { q: "Is an attendant included?", a: "A self-service setup is standard; an attendant can be added on request." },
    ],
    relatedSlugs: ["electronic-games-on-rent", "candy-floss-machine-on-rent", "bouncy-castle-on-rent", "casino-game-on-rent"],
  },
];

export function getGamesServiceBySlug(slug: string): GamesService | undefined {
  return ALL_GAMES_SERVICES.find(s => s.slug === slug);
}
export function getRelatedGamesServices(slugs: string[]): GamesService[] {
  return slugs.map(s => ALL_GAMES_SERVICES.find(g => g.slug === s)).filter(Boolean) as GamesService[];
}
