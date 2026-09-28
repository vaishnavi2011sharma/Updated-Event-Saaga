import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getLocationConfig, getAllLocationSlugs } from "@/lib/locations/config";
import { cardImage } from "@/lib/images";

interface Props {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const loc = await getLocationConfig(location);
  if (!loc) return { title: "Not Found" };
  return {
    title: loc.seo.title,
    description: loc.seo.description,
    alternates: { canonical: `https://eventsaaga.com/${loc.slug}` },
    openGraph: {
      title: loc.seo.title,
      description: loc.seo.description,
      url: `https://eventsaaga.com/${loc.slug}`,
    },
  };
}

const SERVICES = [
  { key: "birthday-decoration",        label: "Birthday Decoration", color: "#e11d48", grad: "linear-gradient(135deg,#2d0a14,#9f1239)" },
  { key: "baby-shower",                label: "Baby Shower", color: "#ec4899", grad: "linear-gradient(135deg,#1a0814,#9d174d)" },
  { key: "wedding-services",           label: "Wedding Services", color: "#d97706", grad: "linear-gradient(135deg,#1a1000,#b45309)" },
  { key: "anniversary-decoration",     label: "Anniversary Decoration", color: "#e11d48", grad: "linear-gradient(135deg,#2d0a14,#9f1239)" },
  { key: "pre-wedding-functions",      label: "Pre-Wedding Functions", color: "#d97706", grad: "linear-gradient(135deg,#1a1000,#b45309)" },
  { key: "mascots",                    label: "Mascots & Characters", color: "#7c3aed", grad: "linear-gradient(135deg,#0a001a,#4c1d95)" },
  { key: "special-occasion-decorations", label: "Special Occasions", color: "#3b82f6", grad: "linear-gradient(135deg,#080e1a,#1e3a6e)" },
  { key: "carnival-event-organiser",   label: "Carnival Events", color: "#f97316", grad: "linear-gradient(135deg,#1a0800,#c2410c)" },
  { key: "party-equipment-rentals",    label: "Party Equipment Rentals", color: "#7c3aed", grad: "linear-gradient(135deg,#0a001a,#4c1d95)" },
  { key: "water-activities",           label: "Water Activities", color: "#06b6d4", grad: "linear-gradient(135deg,#020c1a,#0e7490)" },
  { key: "event-artists",              label: "Event Artists & Performers", color: "#7c3aed", grad: "linear-gradient(135deg,#0a001a,#4c1d95)" },
] as const;

export default async function LocationHomePage({ params }: Props) {
  const { location } = await params;
  const loc = await getLocationConfig(location);
  if (!loc) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: loc.schema.name,
    url: loc.schema.url,
    telephone: loc.schema.telephone,
    address: {
      "@type": "PostalAddress",
      ...loc.schema.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.schema.geo.latitude,
      longitude: loc.schema.geo.longitude,
    },
    areaServed: loc.schema.areaServed,
    priceRange: loc.schema.priceRange,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg,#0a001a 0%,#4c1d95 50%,#7c3aed 100%)",
          padding: "60px 5% 50px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%,rgba(124,58,237,0.25) 0%,transparent 60%)", pointerEvents: "none" }}/>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 80%,rgba(196,181,253,0.12) 0%,transparent 50%)", pointerEvents: "none" }}/>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(216,180,254,0.85)", marginBottom: "12px" }}>
            EventSaaga — {loc.displayName}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "white", marginBottom: "16px", lineHeight: 1.2 }}>
            {loc.seo.h1}
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.78)", maxWidth: "600px", margin: "0 auto 28px", lineHeight: 1.7 }}>
            {loc.seo.intro}
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {["5000+ Events", "100+ Verified Artists", "5★ Rated", "On-Time Delivery"].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", background: "rgba(255,255,255,0.12)", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Breadcrumb */}
        <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "12px 5%" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#6b7280", textDecoration: "none" }}>Home</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#7c3aed", fontWeight: 600 }}>{loc.displayName}</span>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "40px 5% 80px" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#111827", marginBottom: "8px" }}>
            Our Services in {loc.displayName}
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#6b7280", marginBottom: "32px" }}>
            Choose a service to see {loc.displayName}-specific details, pricing, and booking options.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }} className="loc-grid">
            {SERVICES.map(svc => {
              const content = loc.services[svc.key];
              return (
                <Link key={svc.key} href={`/${loc.slug}/${svc.key}`} style={{ textDecoration: "none" }}>
                  <div
                    className="loc-card"
                    style={{ borderRadius: "20px", overflow: "hidden", background: svc.grad, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", transition: "transform 0.25s,box-shadow 0.25s", height: "100%" }}
                  >
                    <div style={{ height: "140px", position: "relative", overflow: "hidden" }}>
                      <img src={cardImage(svc.key)} alt={`${svc.label} in ${loc.name}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)" }}/>
                    </div>
                    <div style={{ padding: "14px 16px 18px", background: "rgba(0,0,0,0.22)" }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: "6px", lineHeight: 1.3 }}>
                        {svc.label} in {loc.name}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.73rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5, marginBottom: "12px" }}>
                        {content?.intro?.slice(0, 80)}...
                      </p>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: "4px" }}>
                        Explore <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .loc-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,0.25);}
        @media(max-width:1024px){.loc-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){.loc-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:480px){.loc-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  );
}
