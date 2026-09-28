import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { cardImage } from "@/lib/images";
import { getLocationConfig, getAllLocationSlugs } from "@/lib/locations/config";
import { buildLocationContent } from "@/lib/locationContent";

// ── Data imports (existing files — unchanged) ─────────────────────────────
import { ALL_BIRTHDAY_SERVICES } from "@/lib/birthdayData";
import { ALL_BABYSHOWER_SERVICES } from "@/lib/babyShowerData";
import { ALL_WEDDING_SERVICES } from "@/lib/weddingData";
import { ALL_ANNIVERSARY_SERVICES } from "@/lib/anniversaryData";
import { ALL_PREWEDDING_SERVICES } from "@/lib/preWeddingData";
import { ALL_MASCOT_SERVICES } from "@/lib/mascotsData";
import { ALL_SPECIAL_OCCASION_SERVICES } from "@/lib/specialOccasionData";
import { ALL_CARNIVAL_SERVICES } from "@/lib/carnivalData";
import { ALL_PARTY_EQUIPMENT_SERVICES } from "@/lib/partyEquipmentData";
import { ALL_WATER_ACTIVITY_SERVICES } from "@/lib/waterActivitiesData";
import { ALL_EVENT_ARTIST_SERVICES } from "@/lib/eventArtistsData";
import { ALL_CORPORATE_SERVICES } from "@/lib/corporateData";
import { ALL_GAMES_SERVICES } from "@/lib/gamesData";

const WHATSAPP = "919876543210";
const PHONE = "9876543210";

// ── Service registry ───────────────────────────────────────────────────────
const SERVICE_REGISTRY: Record<string, {
  label: string;
  items: { slug: string; name: string; description: string; badge: string; badgeColor: string; gradientFrom: string; gradientTo: string; features: { icon: string }[] }[];
  accentColor: string;
  gradFrom: string;
  gradTo: string;
}> = {
  "birthday-decoration":         { label: "Birthday Decoration",        items: ALL_BIRTHDAY_SERVICES,         accentColor: "#e11d48", gradFrom: "#2d0a14", gradTo: "#9f1239" },
  "baby-shower":                 { label: "Baby Shower",                items: ALL_BABYSHOWER_SERVICES,        accentColor: "#ec4899", gradFrom: "#1a0814", gradTo: "#9d174d" },
  "wedding-services":            { label: "Wedding Services",           items: ALL_WEDDING_SERVICES,           accentColor: "#d97706", gradFrom: "#1a1000", gradTo: "#b45309" },
  "anniversary-decoration":      { label: "Anniversary Decoration",     items: ALL_ANNIVERSARY_SERVICES,       accentColor: "#e11d48", gradFrom: "#2d0a14", gradTo: "#9f1239" },
  "pre-wedding-functions":       { label: "Pre-Wedding Functions",      items: ALL_PREWEDDING_SERVICES,        accentColor: "#d97706", gradFrom: "#1a1000", gradTo: "#b45309" },
  "mascots":                     { label: "Mascots & Characters",       items: ALL_MASCOT_SERVICES,            accentColor: "#7c3aed", gradFrom: "#0a001a", gradTo: "#4c1d95" },
  "special-occasion-decorations":{ label: "Special Occasion Decorations",items: ALL_SPECIAL_OCCASION_SERVICES, accentColor: "#3b82f6", gradFrom: "#080e1a", gradTo: "#1e3a6e" },
  "carnival-event-organiser":    { label: "Carnival Events",            items: ALL_CARNIVAL_SERVICES,          accentColor: "#f97316", gradFrom: "#1a0800", gradTo: "#c2410c" },
  "party-equipment-rentals":     { label: "Party Equipment Rentals",    items: ALL_PARTY_EQUIPMENT_SERVICES,   accentColor: "#7c3aed", gradFrom: "#0a001a", gradTo: "#4c1d95" },
  "water-activities":            { label: "Water Activities",           items: ALL_WATER_ACTIVITY_SERVICES,    accentColor: "#06b6d4", gradFrom: "#020c1a", gradTo: "#0e7490" },
  "event-artists":               { label: "Event Artists & Performers", items: ALL_EVENT_ARTIST_SERVICES,      accentColor: "#7c3aed", gradFrom: "#0a001a", gradTo: "#4c1d95" },
  "corporate-events":            { label: "Corporate Events",           items: ALL_CORPORATE_SERVICES,         accentColor: "#3b82f6", gradFrom: "#080e1a", gradTo: "#1a3a6e" },
  "games-on-rent":               { label: "Games on Rent",              items: ALL_GAMES_SERVICES,             accentColor: "#e11d48", gradFrom: "#2d0a14", gradTo: "#9f1239" },
};

// ── Static params: 20 locations × 13 services = 260 pages ─────────────────
export async function generateStaticParams() {
  const locationSlugs = getAllLocationSlugs().map(l => l.location);
  const serviceSlugs  = Object.keys(SERVICE_REGISTRY);
  return locationSlugs.flatMap(location =>
    serviceSlugs.map(service => ({ location, service }))
  );
}

// ── Metadata ───────────────────────────────────────────────────────────────
interface Props { params: Promise<{ location: string; service: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location, service } = await params;
  const loc = await getLocationConfig(location);
  const reg = SERVICE_REGISTRY[service];
  if (!loc || !reg) return { title: "Not Found" };

  const content = loc.services[service as keyof typeof loc.services];
  const title = `${reg.label} in ${loc.displayName} | EventSaaga`;
  const description = content?.intro?.slice(0, 155) ?? `Professional ${reg.label} in ${loc.displayName}. Book now!`;

  return {
    title,
    description,
    alternates: { canonical: `https://eventsaaga.com/${location}/${service}` },
    openGraph: { title, description, url: `https://eventsaaga.com/${location}/${service}` },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function LocationServicePage({ params }: Props) {
  const { location, service } = await params;
  const loc = await getLocationConfig(location);
  const reg = SERVICE_REGISTRY[service];
  if (!loc || !reg) notFound();

  const content = loc.services[service as keyof typeof loc.services];
  const a = reg.accentColor;
  const extra = buildLocationContent({
    citySlug: location as import("@/lib/locations/config").LocationSlug,
    cityName: loc.displayName,
    categoryLabel: reg.label,
    categorySlug: service,
    items: reg.items,
  });

  // JSON-LD schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",            item: "https://eventsaaga.com" },
      { "@type": "ListItem", position: 2, name: loc.displayName,   item: `https://eventsaaga.com/${location}` },
      { "@type": "ListItem", position: 3, name: reg.label,         item: `https://eventsaaga.com/${location}/${service}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${reg.label} in ${loc.displayName}`,
    description: content?.description,
    provider: {
      "@type": "LocalBusiness",
      name: loc.schema.name,
      telephone: loc.schema.telephone,
      address: { "@type": "PostalAddress", ...loc.schema.address },
    },
    areaServed: loc.schema.areaServed,
  };

  const allFaqs = [...(content?.faqs ?? []), ...extra.extraFaqs];
  const faqSchema = allFaqs.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}/>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/>}

      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

        {/* ── Hero ── */}
        <div style={{
          background: `linear-gradient(135deg, ${reg.gradFrom} 0%, ${reg.gradTo} 100%)`,
          padding: "60px 5% 50px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 50%, ${a}30 0%, transparent 60%)`, pointerEvents: "none" }}/>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)", pointerEvents: "none" }}/>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "12px" }}>
            {loc.displayName} — EventSaaga
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "white", marginBottom: "16px", lineHeight: 1.2 }}>
            {content?.h1 ?? `${reg.label} in ${loc.displayName}`}
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto 28px", lineHeight: 1.7 }}>
            {content?.intro}
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {["Verified Team", "On-Time Setup", "5★ Rated", `Serving ${loc.displayName}`].map((l, i) => (
              <div key={i} style={{ padding: "7px 16px", background: "rgba(255,255,255,0.12)", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "12px 5%" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#6b7280", textDecoration: "none" }}>Home</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <Link href={`/${location}`} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#6b7280", textDecoration: "none" }}>{loc.displayName}</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: a, fontWeight: 600 }}>{reg.label}</span>
          </div>
        </div>

        {/* ── About this service in this city ── */}
        {content?.description && (
          <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "36px 5%" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="loc-svc-about">
                <div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: a }}>
                    About This Service
                  </span>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: "#111827", margin: "8px 0 14px", lineHeight: 1.3 }}>
                    {reg.label} in {loc.displayName}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.92rem", color: "#6b7280", lineHeight: 1.8, margin: 0 }}>
                    {content.description}
                  </p>
                </div>

                {/* Quick contact */}
                <div style={{ background: "#f9fafb", borderRadius: "20px", padding: "28px", border: "1px solid #f0f0f0" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#111827", marginBottom: "20px" }}>
                    Book {reg.label} in {loc.name} Today
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I want to book ${reg.label} in ${loc.displayName}.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "14px", background: "#25d366", color: "white", borderRadius: "12px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Chat on WhatsApp
                    </a>
                    <a href={`tel:${PHONE}`}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "14px", background: `linear-gradient(135deg,${a},${a}cc)`, color: "white", borderRadius: "12px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", boxShadow: `0 4px 16px ${a}40` }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                      Call Now — Free Quote
                    </a>
                  </div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#9ca3af", textAlign: "center", margin: "14px 0 0" }}>
                    📍 Serving all areas in {loc.displayName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Extended Location Content (900+ words, genuinely varied per city/category) ── */}
        <div style={{ background: "#f9fafb", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "40px 5%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }} className="loc-svc-extra">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.3vw,1.6rem)", color: "#111827", marginBottom: "12px" }}>
                {reg.label} Services We Offer in {loc.displayName}
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.8, marginBottom: "18px" }}>
                {extra.serviceDetailParagraph}
              </p>
              <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {extra.popularServices.map(svc => (
                  <li key={svc.slug} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="2.5" style={{ marginTop: "3px", flexShrink: 0 }}><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}>
                      <strong>{svc.name}</strong> — {svc.description}
                    </span>
                  </li>
                ))}
              </ul>
              {extra.localInsightParagraph && (
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.8 }}>
                  {extra.localInsightParagraph}
                </p>
              )}
            </div>

            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.2rem,2.3vw,1.6rem)", color: "#111827", marginBottom: "12px" }}>
                Why Choose EventSaaga in {loc.displayName}
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.8, marginBottom: "18px" }}>
                {extra.whyChooseParagraph}
              </p>

              {extra.areas.length > 0 && (
                <>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#111827", marginBottom: "8px" }}>
                    Areas We Cover Across {loc.displayName}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
                    {extra.areas.map(area => (
                      <span key={area} style={{ padding: "5px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#4b5563" }}>{area}</span>
                    ))}
                  </div>
                </>
              )}

              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#111827", marginBottom: "10px" }}>
                How Booking Works
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {extra.bookingSteps.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${a}18`, color: a, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.68rem" }}>{i + 1}</div>
                    <div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#111827", margin: "0 0 2px" }}>{s.title}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 5% 40px" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.8, margin: 0 }}>
              {extra.closingParagraph}
            </p>
          </div>
        </div>

        {/* ── Services Grid ── */}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "40px 5%" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.5rem", color: "#111827", marginBottom: "8px" }}>
            All {reg.label} Services in {loc.name}
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#6b7280", marginBottom: "28px" }}>
            Click any service to see full details, inclusions, FAQs, and book in {loc.displayName}.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }} className="loc-svc-grid">
            {reg.items.map(svc => (
              <Link key={svc.slug} href={`/${location}/${service}/${svc.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="loc-svc-card"
                  style={{ borderRadius: "20px", overflow: "hidden", background: `linear-gradient(160deg,${svc.gradientFrom},${svc.gradientTo})`, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", transition: "transform 0.25s,box-shadow 0.25s", height: "100%" }}
                >
                  <div style={{ height: "160px", position: "relative", overflow: "hidden" }}>
                    <img src={cardImage(svc.slug)} alt={`${svc.name} in ${loc.name}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)" }}/>
                    <span style={{ position: "absolute", top: "12px", left: "12px", background: svc.badgeColor, color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "50px", boxShadow: `0 2px 8px ${svc.badgeColor}60` }}>{svc.badge}</span>
                  </div>
                  <div style={{ padding: "14px 16px 18px", background: "rgba(0,0,0,0.22)" }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "0.92rem", color: "white", marginBottom: "6px", lineHeight: 1.3 }}>
                      {svc.name} in {loc.name}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.73rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5, marginBottom: "10px" }}>{svc.description}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: "50px" }}>
                        {loc.name}
                      </span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: "4px" }}>
                        Book Now <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Location FAQs ── */}
        {allFaqs.length > 0 && (
          <div style={{ background: "#fff", borderTop: "1px solid #f0f0f0" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 5%" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.5rem", color: "#111827", marginBottom: "24px", textAlign: "center" }}>
                Frequently Asked Questions — {reg.label} in {loc.displayName}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {allFaqs.map((faq, i) => (
                  <details key={i} style={{ border: "1px solid #f0f0f0", borderRadius: "12px", overflow: "hidden" }}>
                    <summary style={{ padding: "16px 18px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#111827", cursor: "pointer", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {faq.q}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                    </summary>
                    <div style={{ padding: "0 18px 16px", background: `${a}06` }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#6b7280", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ background: `linear-gradient(135deg,${reg.gradFrom},${reg.gradTo})`, padding: "60px 5%", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", color: "white", marginBottom: "12px" }}>
            Ready to Book {reg.label} in {loc.displayName}?
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", marginBottom: "28px" }}>
            {content?.cta ?? `Book your ${reg.label} in ${loc.displayName} today — our team will confirm within 30 minutes.`}
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I want to book ${reg.label} in ${loc.displayName}.`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: "#25d366", color: "white", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.92rem", textDecoration: "none", boxShadow: "0 6px 20px rgba(37,211,102,0.4)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
            <a href={`tel:${PHONE}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: "rgba(255,255,255,0.15)", color: "white", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.92rem", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Call Now
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .loc-svc-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,0.25);}
        @media(max-width:900px){.loc-svc-about{grid-template-columns:1fr!important;} .loc-svc-extra{grid-template-columns:1fr!important;}}
        @media(max-width:1024px){.loc-svc-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){.loc-svc-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:480px){.loc-svc-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  );
}
