export interface MascotService {
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

export const ALL_MASCOT_SERVICES: MascotService[] = [
  {
    slug: "superhero-mascot-characters",
    name: "Superhero Mascot Characters",
    tagline: "Real-life heroes for your little hero's big day!",
    description: "Costumed superhero mascots — Spiderman, Batman, Ironman & more.",
    longDescription: "Our Superhero Mascot Characters bring larger-than-life excitement to any celebration! With professionally costumed performers portraying Spiderman, Batman, Ironman, Captain America and more, children get to meet their heroes face-to-face for photos, games, and unforgettable interaction.",
    badge: "Kids Go Wild",
    badgeColor: "#7c3aed",
    gradientFrom: "#0a001a",
    gradientTo: "#4c1d95",
    accentColor: "#7c3aed",
    category: "Mascots",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "10+ Superhero Options", desc: "Spiderman, Batman, Ironman, Captain America & more" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Trained Performers", desc: "Professional, child-friendly character actors" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Interactive Sessions", desc: "Photo ops, high-fives & mini action poses" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Surprise Entry Option", desc: "Character arrives as a dramatic surprise" },
      { icon: "M9 12l2 2 4-4", title: "1-2 Hour Sessions", desc: "Flexible performance duration options" },
      { icon: "M12 8v4l3 3", title: "Photo-Ready Costume", desc: "High-quality, screen-accurate costumes" },
    ],
    includes: ["1 Costumed superhero performer", "Character interaction (45-90 mins)", "Photo session with guests", "Surprise entry coordination"],
    faqs: [
      { q: "Which superheroes are available?", a: "Spiderman, Batman, Ironman, Captain America, Superman, and more, subject to city availability." },
      { q: "Can we book 2 heroes together?", a: "Yes! Combo bookings with multiple heroes are available." },
      { q: "How long does the character stay?", a: "Standard session is 45-60 minutes; extended 90-minute sessions available." },
      { q: "Is the costume suitable for hot weather?", a: "Yes, our costumes are designed for comfort during Indian summers." },
    ],
    relatedSlugs: ["disney-princess-mascot", "cartoon-character-mascot", "mascot-dance-performance", "mascot-surprise-entry"],
  },
  {
    slug: "disney-princess-mascot",
    name: "Disney Princess Mascot",
    tagline: "Once upon a time, meet your favourite princess!",
    description: "Costumed princess mascots — Elsa, Anna, Cinderella, Belle & more.",
    longDescription: "Our Disney Princess Mascot service brings fairytale magic to life! With elegantly costumed performers portraying Elsa, Anna, Cinderella, Belle and more, little ones get to meet, hug, and pose with their favourite princess — creating truly magical memories.",
    badge: "Fairytale Magic",
    badgeColor: "#ec4899",
    gradientFrom: "#1a0814",
    gradientTo: "#9d174d",
    accentColor: "#ec4899",
    category: "Mascots",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "8+ Princess Options", desc: "Elsa, Anna, Cinderella, Belle, Rapunzel & more" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Elegant Costumes", desc: "Detailed, high-quality princess gowns" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Storytelling Session", desc: "Optional short storytelling segment" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Photo & Hug Moments", desc: "One-on-one photo time with guests" },
      { icon: "M9 12l2 2 4-4", title: "Sing-Along Option", desc: "Optional themed song segment" },
      { icon: "M12 8v4l3 3", title: "1-2 Hour Sessions", desc: "Flexible performance duration" },
    ],
    includes: ["1 Costumed princess performer", "Character interaction (45-90 mins)", "Photo session with guests", "Optional storytelling segment"],
    faqs: [
      { q: "Which princesses are available?", a: "Elsa, Anna, Cinderella, Belle, Rapunzel, and more, subject to city availability." },
      { q: "Is storytelling included?", a: "A short storytelling segment can be added on request." },
      { q: "Can we book multiple princesses?", a: "Yes! Combo bookings with multiple princesses are available." },
      { q: "How early should we book?", a: "We recommend booking at least 5-7 days in advance." },
    ],
    relatedSlugs: ["superhero-mascot-characters", "cartoon-character-mascot", "mascot-dance-performance", "mascot-surprise-entry"],
  },
  {
    slug: "cartoon-character-mascot",
    name: "Cartoon Character Mascot",
    tagline: "Bring beloved cartoons to life!",
    description: "Costumed cartoon mascots — Mickey, Minnie, Doraemon, Chhota Bheem & more.",
    longDescription: "Our Cartoon Character Mascot service brings children's favourite animated characters into the real world! From Mickey and Minnie Mouse to Doraemon, Chhota Bheem, and Motu Patlu, our costumed performers interact, dance, and pose for photos, delighting kids of all ages.",
    badge: "Kids Favourite",
    badgeColor: "#16a34a",
    gradientFrom: "#052e16",
    gradientTo: "#15803d",
    accentColor: "#22c55e",
    category: "Mascots",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "25+ Character Options", desc: "Mickey, Minnie, Doraemon, Chhota Bheem & more" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Trained Performers", desc: "Professional child-friendly character actors" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Interactive Sessions", desc: "Dancing, games & photo ops with guests" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Surprise Entry Option", desc: "Character arrives as a surprise entry" },
      { icon: "M9 12l2 2 4-4", title: "1-2 Hour Sessions", desc: "Flexible performance duration options" },
      { icon: "M12 8v4l3 3", title: "Photo-Ready Costume", desc: "High-quality photogenic costumes" },
    ],
    includes: ["1 Costumed mascot performer", "Character interaction (45-90 mins)", "Photo session with guests", "Surprise entry coordination"],
    faqs: [
      { q: "Which characters are available?", a: "Mickey, Minnie, Doraemon, Chhota Bheem, Motu Patlu, Minions, Peppa Pig, and 20+ more." },
      { q: "Can we book 2 characters together?", a: "Yes! Combo bookings are available." },
      { q: "How long does the character stay?", a: "Standard session is 45-60 minutes. Extended 90-minute sessions available." },
      { q: "Is the costume high quality?", a: "Yes! All costumes are professional-grade and photogenic." },
    ],
    relatedSlugs: ["superhero-mascot-characters", "disney-princess-mascot", "mascot-dance-performance", "mascot-school-event"],
  },
  {
    slug: "mascot-dance-performance",
    name: "Mascot Dance Performance",
    tagline: "Your favourite character, now dancing for you!",
    description: "Choreographed mascot dance performances for parties, schools & events.",
    longDescription: "Our Mascot Dance Performance service adds high-energy entertainment to any celebration! Costumed characters perform choreographed dance routines set to popular music, getting kids up and dancing along, making for a lively, memorable highlight of the event.",
    badge: "High Energy",
    badgeColor: "#f97316",
    gradientFrom: "#1a0800",
    gradientTo: "#c2410c",
    accentColor: "#f97316",
    category: "Mascots",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Choreographed Routines", desc: "Fun dance acts set to popular music" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Kid Participation", desc: "Guests invited to dance along" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Character of Choice", desc: "Pair with any mascot character" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Sound System Included", desc: "Portable speaker for music playback" },
      { icon: "M9 12l2 2 4-4", title: "15-30 Min Performance", desc: "High-energy, focused performance slot" },
      { icon: "M12 8v4l3 3", title: "Great for Schools & Parties", desc: "Popular for both settings" },
    ],
    includes: ["1 Costumed performer", "Choreographed dance act (15-30 mins)", "Portable sound system"],
    faqs: [
      { q: "Can we choose the music?", a: "Yes! We can incorporate your song preferences into the routine." },
      { q: "Can this pair with a mascot meet-and-greet?", a: "Yes! Dance performance is often bundled with photo/interaction time." },
      { q: "Is this suitable for school events?", a: "Yes! Mascot dance performances are very popular at school functions." },
      { q: "How much space is needed?", a: "A minimum 10x10 ft open area is recommended." },
    ],
    relatedSlugs: ["cartoon-character-mascot", "superhero-mascot-characters", "mascot-surprise-entry", "mascot-school-event"],
  },
  {
    slug: "mascot-surprise-entry",
    name: "Mascot Surprise Entry",
    tagline: "A grand entrance they'll never forget!",
    description: "Dramatic mascot surprise entrance — balloons, music & confetti reveal.",
    longDescription: "Our Mascot Surprise Entry service creates a jaw-dropping moment of celebration! With a dramatic entrance featuring music cues, confetti, and a beloved character reveal, this is the perfect way to elevate any birthday or celebration to unforgettable status.",
    badge: "Grand Reveal",
    badgeColor: "#a21caf",
    gradientFrom: "#1a0a2e",
    gradientTo: "#701a75",
    accentColor: "#a21caf",
    category: "Mascots",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Dramatic Entrance", desc: "Timed grand reveal moment" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Music & Confetti", desc: "Cued music and confetti burst" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Character of Choice", desc: "Any mascot from our full catalogue" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Photo Moment", desc: "Instant photo opportunity at reveal" },
      { icon: "M9 12l2 2 4-4", title: "Coordinated Timing", desc: "Synced with your event schedule" },
      { icon: "M12 8v4l3 3", title: "Add-On Friendly", desc: "Pairs with any mascot booking" },
    ],
    includes: ["Timed surprise entry coordination", "Music cue & confetti effect", "Costumed character", "Photo moment"],
    faqs: [
      { q: "Can the entry be timed with cake cutting?", a: "Yes! We coordinate the surprise entry with your event flow, including cake cutting." },
      { q: "Is confetti safe for indoor use?", a: "Yes, we use safe, easy-to-clean confetti for indoor venues." },
      { q: "Can we combine this with a dance performance?", a: "Yes! Surprise entry followed by a dance act is a popular combo." },
      { q: "How much advance notice is needed?", a: "We recommend booking at least 5 days in advance." },
    ],
    relatedSlugs: ["mascot-dance-performance", "cartoon-character-mascot", "superhero-mascot-characters", "disney-princess-mascot"],
  },
  {
    slug: "mascot-school-event",
    name: "Mascot for School Events",
    tagline: "Making school days magical!",
    description: "Mascot performers for school annual days, fun fairs & children's day.",
    longDescription: "Our Mascot for School Events service brings joyful character interactions to school celebrations! Perfect for annual days, children's day, fun fairs, and orientation events, our performers engage large groups of students with games, photo ops, and high-energy fun.",
    badge: "School Favourite",
    badgeColor: "#1a7ab5",
    gradientFrom: "#080e1a",
    gradientTo: "#1a3a6e",
    accentColor: "#3b82f6",
    category: "Mascots",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Large Group Engagement", desc: "Designed for school-scale audiences" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Multiple Characters", desc: "Book 2-3 mascots for bigger events" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Stage Interaction", desc: "Character can join stage segments" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Photo Sessions by Class", desc: "Organised photo time per class/section" },
      { icon: "M9 12l2 2 4-4", title: "Flexible Duration", desc: "1-3 hour school event coverage" },
      { icon: "M12 8v4l3 3", title: "Safety Screened", desc: "All performers background verified" },
    ],
    includes: ["1+ Costumed performers", "Group interaction & photo sessions", "Stage coordination if required"],
    faqs: [
      { q: "Can you manage interaction across multiple classes?", a: "Yes! We plan structured rotations for large student groups." },
      { q: "Are performers background verified?", a: "Yes! All our performers are screened for school-safe engagements." },
      { q: "Can multiple characters be booked for a large event?", a: "Yes! Multi-character bookings are common for school annual days." },
      { q: "Do you coordinate with the school's event schedule?", a: "Yes! We work closely with school event coordinators on timing." },
    ],
    relatedSlugs: ["cartoon-character-mascot", "mascot-dance-performance", "mascot-surprise-entry", "superhero-mascot-characters"],
  },
  {
    slug: "mascot-carnival-package",
    name: "Mascot Carnival Package",
    tagline: "A full cast of characters for maximum fun!",
    description: "Multi-mascot package for carnivals & large events — variety & value.",
    longDescription: "Our Mascot Carnival Package bundles multiple beloved characters into one cost-effective package, perfect for carnivals, society events, and large celebrations! With 3-4 mascots roaming and interacting throughout the event, guests enjoy variety and non-stop character fun.",
    badge: "Best Value",
    badgeColor: "#d97706",
    gradientFrom: "#1a1000",
    gradientTo: "#b45309",
    accentColor: "#d97706",
    category: "Mascots",
    features: [
      { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "3-4 Character Bundle", desc: "Multiple mascots at combined pricing" },
      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", title: "Roaming Interaction", desc: "Characters circulate throughout the venue" },
      { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Photo Zones", desc: "Dedicated photo spots per character" },
      { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Extended Duration", desc: "2-3 hour coverage as standard" },
      { icon: "M9 12l2 2 4-4", title: "Mixed Character Options", desc: "Combine superheroes, princesses & cartoons" },
      { icon: "M12 8v4l3 3", title: "Best for Large Events", desc: "Ideal for carnivals & fun fairs" },
    ],
    includes: ["3-4 Costumed performers", "2-3 hour roaming interaction", "Photo zone coordination"],
    faqs: [
      { q: "Can we mix character types in the package?", a: "Yes! You can combine superheroes, princesses, and cartoon characters." },
      { q: "Is this suitable for society or apartment events?", a: "Yes! This is one of our most popular packages for society carnivals." },
      { q: "How does pricing compare to booking mascots individually?", a: "The bundle offers significant savings compared to individual bookings." },
      { q: "Can this be combined with our carnival event organiser service?", a: "Yes! This pairs perfectly with our full Carnival Event Organiser package." },
    ],
    relatedSlugs: ["cartoon-character-mascot", "mascot-school-event", "mascot-dance-performance", "mascot-surprise-entry"],
  },
];

export function getMascotServiceBySlug(slug: string): MascotService | undefined {
  return ALL_MASCOT_SERVICES.find(s => s.slug === slug);
}
export function getRelatedMascotServices(slugs: string[]): MascotService[] {
  return slugs.map(s => ALL_MASCOT_SERVICES.find(g => g.slug === s)).filter(Boolean) as MascotService[];
}
