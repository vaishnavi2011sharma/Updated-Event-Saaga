import type { LocationConfig } from "./types";

const delhi: LocationConfig = {
  slug: "delhi",
  name: "Delhi",
  displayName: "Delhi NCR",
  state: "Delhi",
  popular: true,
  seo: {
    title: "Event Decoration & Entertainment Services in Delhi | EventSaaga",
    description: "Premium event decoration, birthday parties, wedding services, baby shower & entertainment in Delhi NCR. 5000+ events delivered. Book now!",
    h1: "Event Decoration & Entertainment Services in Delhi",
    intro: "EventSaaga brings Delhi's most celebrated event decoration and entertainment services to your doorstep. From grand wedding setups in South Delhi to intimate birthday parties in Dwarka, our expert teams serve every corner of the capital.",
  },
  schema: {
    name: "EventSaaga Delhi",
    url: "https://eventsaaga.com/delhi",
    telephone: "+919876543210",
    address: {
      streetAddress: "Connaught Place",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    geo: { latitude: 28.6139, longitude: 77.209 },
    areaServed: "Delhi NCR",
    priceRange: "₹₹",
  },
  services: {
    "birthday-decoration": {
      h1: "Birthday Decoration Services in Delhi",
      intro: "Make your birthday unforgettable with Delhi's finest decoration team. From kids theme parties in Rohini to elegant adult setups in Greater Kailash, we cover every corner of Delhi.",
      description: "EventSaaga has decorated 5,000+ birthdays across Delhi NCR. Our expert decorators bring themes, balloon arches, backdrops, fairy lights, and personalised setups to homes, banquet halls, hotels, and rooftops throughout the city.",
      faqs: [
        { q: "Do you deliver birthday decoration services in all Delhi areas?", a: "Yes! We cover all Delhi areas including South Delhi, West Delhi, East Delhi, North Delhi, Dwarka, Rohini, Lajpat Nagar, Connaught Place, Saket, Vasant Kunj and more." },
        { q: "How early should I book birthday decoration in Delhi?", a: "We recommend booking 5–7 days in advance for Delhi. For weekends and festive seasons, 10–14 days in advance ensures the best availability." },
        { q: "What is the starting price for birthday decoration in Delhi?", a: "Birthday decoration in Delhi starts from ₹2,499 for basic setups. Premium and theme packages start from ₹5,999." },
        { q: "Can you set up a birthday decoration surprise in Delhi?", a: "Yes! Surprise birthday setups are our specialty across Delhi — we coordinate while the birthday person is away." },
      ],
      cta: "Book Birthday Decoration in Delhi",
    },
    "baby-shower": {
      h1: "Baby Shower Decoration in Delhi",
      intro: "Celebrate the arrival of your little one with a dreamy baby shower in Delhi. Our team creates stunning setups in homes, banquet halls, and hotel rooms across the city.",
      description: "From pastel floral setups in South Delhi to vibrant gender reveal parties in Dwarka, EventSaaga's baby shower specialists create magical celebrations for moms-to-be across Delhi NCR.",
      faqs: [
        { q: "Do you do baby shower decoration at home in Delhi?", a: "Yes! Home setups in Delhi are our most popular baby shower request — from apartments to independent houses." },
        { q: "Is gender reveal setup available in Delhi?", a: "Yes! Gender reveal setups with confetti cannons, powder bombs, and reveal boxes are available across Delhi." },
      ],
      cta: "Book Baby Shower in Delhi",
    },
    "wedding-services": {
      h1: "Wedding Services in Delhi",
      intro: "Delhi's weddings deserve Delhi's finest. From Punjabi baraat entries in Janakpuri to royal South Delhi receptions, our wedding team delivers spectacular celebrations.",
      description: "EventSaaga handles complete wedding services in Delhi — mehndi, haldi, sangeet, pheras, and reception. Our vendors cover stage setup, flower decoration, sound & light, DJ, bartending, tent, and bridal entry across all Delhi venues.",
      faqs: [
        { q: "Which Delhi venues do you work with?", a: "We work with all major Delhi venues — banquet halls, farmhouses, hotels (ITC Maurya, Taj, Leela), wedding lawns, and community centres." },
        { q: "Do you handle full multi-day wedding functions in Delhi?", a: "Yes! We manage mehndi, haldi, sangeet, wedding, and reception — all with a dedicated on-site coordinator in Delhi." },
      ],
      cta: "Book Wedding Services in Delhi",
    },
    "anniversary-decoration": {
      h1: "Anniversary Decoration in Delhi",
      intro: "Celebrate your love story in the heart of Delhi. Romantic candlelight setups, rooftop dinners, and personalised anniversary decorations crafted for Delhi couples.",
      description: "From intimate rooftop candlelight dinners in CP to elaborate anniversary party setups in South Delhi, EventSaaga creates deeply romantic celebrations for couples across Delhi NCR.",
      faqs: [
        { q: "Can you do rooftop anniversary decoration in Delhi?", a: "Yes! Rooftop setups are extremely popular in Delhi — we serve terrace/rooftop venues across all Delhi areas." },
        { q: "Is same-day anniversary decoration available in Delhi?", a: "Subject to availability — we recommend booking 3–5 days in advance for Delhi anniversary setups." },
      ],
      cta: "Book Anniversary Decoration in Delhi",
    },
    "pre-wedding-functions": {
      h1: "Pre-Wedding Functions in Delhi",
      intro: "Delhi weddings are grand — and their pre-wedding functions match! Our mehndi, haldi, and sangeet specialists bring vibrant, festive setups to homes and venues across the capital.",
      description: "From marigold-draped haldi setups in Punjabi Bagh to glam sangeet nights in South Delhi, EventSaaga's pre-wedding team ensures every function is as memorable as the main event.",
      faqs: [
        { q: "Do you set up pre-wedding functions at Delhi lawns?", a: "Yes! Lawn setups for mehndi, haldi, and sangeet are among our most popular requests in Delhi." },
        { q: "Can you handle all three functions — mehndi, haldi, sangeet — in Delhi?", a: "Yes! Multi-function packages are available for Delhi weddings at special combined pricing." },
      ],
      cta: "Book Pre-Wedding Functions in Delhi",
    },
    mascots: {
      h1: "Mascot Characters for Events in Delhi",
      intro: "Bring your child's favourite cartoon characters to life in Delhi! Our professional mascot performers are available for birthday parties, carnivals, and school events across Delhi NCR.",
      description: "Mickey Mouse, Chhota Bheem, Doraemon, Minnie Mouse, Motu Patlu and 25+ characters available for Delhi parties. Professional, trained performers delivering magical moments across the city.",
      faqs: [
        { q: "Are mascot performers available across all Delhi areas?", a: "Yes! Our mascot performers cover all of Delhi including Dwarka, Rohini, South Delhi, East Delhi, and North Delhi." },
        { q: "How early should I book a mascot in Delhi?", a: "Book at least 7 days in advance for popular characters. Weekends fill up fast in Delhi." },
      ],
      cta: "Book Mascot in Delhi",
    },
    "special-occasion-decorations": {
      h1: "Special Occasion Decorations in Delhi",
      intro: "Every special moment deserves a stunning setup. Proposal decorations, surprise parties, retirement celebrations, and romantic room decorations across Delhi.",
      description: "EventSaaga specialises in crafting perfect moments for proposals, surprises, retirements, and romantic occasions throughout Delhi — from hotel rooms to rooftops to private homes.",
      faqs: [
        { q: "Can you do a proposal decoration in a Delhi hotel room?", a: "Yes! We coordinate with major Delhi hotels to set up romantic proposal decorations in your room." },
        { q: "Is surprise party decoration available in Delhi?", a: "Yes! We set up while the guest of honour is away — complete surprise coordination in Delhi." },
      ],
      cta: "Book Special Occasion Decoration in Delhi",
    },
    "carnival-event-organiser": {
      h1: "Carnival Event Organiser in Delhi",
      intro: "Host the most exciting carnival in Delhi! Games, artists, food stalls, mascots, fun rides — we plan and execute full carnival events across Delhi NCR.",
      description: "From school carnivals in Vasant Vihar to corporate fun fairs in Connaught Place, EventSaaga's carnival team delivers end-to-end carnival management across Delhi.",
      faqs: [
        { q: "Can you organise a school carnival in Delhi?", a: "Yes! School carnivals are one of our most popular requests in Delhi — games, stalls, artists, and rides all arranged." },
        { q: "What is the minimum guest count for a carnival in Delhi?", a: "We handle carnivals for 100 guests to 5,000+ guests across Delhi venues." },
      ],
      cta: "Book Carnival in Delhi",
    },
    "party-equipment-rentals": {
      h1: "Party Equipment on Rent in Delhi",
      intro: "Delhi's most comprehensive party equipment rental service. Bean bags, photo booths, tents, sound systems, cooling equipment — everything delivered to your Delhi venue.",
      description: "EventSaaga supplies and sets up party equipment across Delhi NCR — from foam machines in Dwarka to German hanger tents in Noida border areas. Same-day delivery available in central Delhi.",
      faqs: [
        { q: "Do you deliver party equipment to all Delhi areas?", a: "Yes! We deliver to all Delhi areas. Same-day delivery available in select central Delhi locations." },
        { q: "Is 360 degree selfie booth rental available in Delhi?", a: "Yes! 360° selfie booths are available for rent across Delhi." },
      ],
      cta: "Rent Party Equipment in Delhi",
    },
    "water-activities": {
      h1: "Water Activities & Pool Parties in Delhi",
      intro: "Beat Delhi's heat with our water activities! Rain dance, foam parties, pool setups, and bubble houses — the most fun you'll have at any Delhi event.",
      description: "Delhi summers call for water fun! EventSaaga sets up rain dance stations, foam machines, portable pools, and bubble houses at homes, farmhouses, and event venues across Delhi NCR.",
      faqs: [
        { q: "Is rain dance available in all Delhi areas?", a: "Yes! Rain dance setups are available at farms, lawns, and open venues across Delhi NCR." },
        { q: "Can you set up a foam party at a Delhi venue?", a: "Yes! Foam machine setups at homes, farmhouses, and venues across Delhi." },
      ],
      cta: "Book Water Activities in Delhi",
    },
    "event-artists": {
      h1: "Event Artists & Performers in Delhi",
      intro: "Delhi's most diverse entertainment roster. Magicians, jugglers, dhol players, Bhangra groups, caricature artists, face painters, and 30+ more performers available across Delhi.",
      description: "EventSaaga represents Delhi's top event artists — from Punjabi dhol players for baraat entries in Janakpuri to fire jugglers for corporate events in Cyber City. Any artist, any occasion, across all of Delhi.",
      faqs: [
        { q: "Are Punjabi dhol players available in Delhi?", a: "Yes! Dhol players for baraat, birthday entries, and events are available across Delhi — same day on availability." },
        { q: "Can I book multiple event artists together in Delhi?", a: "Yes! Package bookings for multiple artists in Delhi come at special combined rates." },
      ],
      cta: "Book Event Artists in Delhi",
    },
    "corporate-events": {
      h1: "Corporate Event Management in Delhi NCR",
      intro: "EventSaaga powers memorable corporate events across Delhi NCR — product launches, annual days, team offsites, and client celebrations, planned and executed by our dedicated corporate events team.",
      description: "From boardroom-style product launches to large-scale annual day celebrations, EventSaaga handles venue styling, entertainment, catering coordination, and on-ground execution for corporate clients across Delhi NCR.",
      faqs: [
        { q: "Do you handle corporate events for large teams in Delhi NCR?", a: "Yes! We manage corporate events of all sizes across Delhi NCR, from 20-person offsites to 1000+ guest annual days." },
        { q: "Can you coordinate branding and theming for our company event?", a: "Yes! We incorporate your brand colours, logo placements, and custom theming into every corporate setup in Delhi NCR." },
      ],
      cta: "Book Corporate Event in Delhi NCR",
    },
    "games-on-rent": {
      h1: "Games & Fun Activities on Rent in Delhi NCR",
      intro: "Add non-stop fun to any celebration in Delhi NCR! Bouncy castles, casino game setups, popcorn & candy floss machines, and electronic games — delivered and set up at your venue.",
      description: "EventSaaga's games on rent service covers birthdays, corporate fun fairs, and society events across Delhi NCR — with a wide catalogue of indoor and outdoor entertainment equipment delivered on time.",
      faqs: [
        { q: "What games are available on rent in Delhi NCR?", a: "Bouncy castles, casino tables, popcorn machines, candy floss machines, chocolate fountains, and electronic arcade games are all available across Delhi NCR." },
        { q: "Is same-day delivery available in Delhi NCR?", a: "Same-day delivery is available in select central areas of Delhi NCR, subject to availability." },
      ],
      cta: "Rent Games in Delhi NCR",
    },
  },
};

export default delhi;
