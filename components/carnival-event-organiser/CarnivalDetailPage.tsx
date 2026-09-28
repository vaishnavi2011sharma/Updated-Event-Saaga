"use client";
import { useState } from "react";
import Link from "next/link";
import BookingForm from "@/components/shared/BookingForm";
import RelatedServicesSection from "@/components/birthday-decoration/RelatedServicesSection";
import { heroImage, galleryImages } from "@/lib/images";
import HostPartySection from "@/components/event-artists/Hostpartysection";
import { CarnivalService } from "@/lib/carnivalData";

const WHATSAPP = "919876543210";
const PHONE = "9876543210";

interface Props {
  carnival: CarnivalService;
  relatedServices?: CarnivalService[];
}

export default function CarnivalDetailPage({ carnival, relatedServices = [] }: Props) {
  const [activeTab, setActiveTab] = useState<"features" | "includes" | "faq">("features");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const gallery = [heroImage(carnival.slug, 900, 675), ...galleryImages(carnival.slug, 3, 300, 300)];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const a = carnival.accentColor;

  const tab = (id: typeof activeTab, label: string) => (
    <button onClick={() => setActiveTab(id)}
      style={{ padding: "10px 22px", border: "none", background: "none", borderBottom: `2.5px solid ${activeTab === id ? a : "transparent"}`, fontFamily: "'DM Sans',sans-serif", fontWeight: activeTab === id ? 700 : 500, fontSize: "0.9rem", color: activeTab === id ? a : "#6b7280", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
      {label}
    </button>
  );

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: "#f9fafb", borderBottom: "1px solid #f0f0f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {[{ label: "Home", href: "/" }, { label: "Carnival Events", href: "/carnival-event-organiser" }, { label: carnival.name, href: "#" }].map((c, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {i > 0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>}
              {i < arr.length - 1
                ? <Link href={c.href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#6b7280", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = a)} onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}>{c.label}</Link>
                : <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: a, fontWeight: 600 }}>{c.label}</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: "48px 5% 40px", background: "#fff" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "flex-start" }} className="cn-hero">

          {/* Left */}
          <div>
            <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "4/3", background: `linear-gradient(160deg,${carnival.gradientFrom},${carnival.gradientTo})`, position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
              <img src={activeImage} alt={carnival.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="eager"/>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 50%,${carnival.gradientTo}55 100%)` }}/>
              <div style={{ position: "absolute", top: "16px", left: "16px", background: carnival.badgeColor, color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "50px", boxShadow: `0 3px 12px ${carnival.badgeColor}60` }}>{carnival.badge}</div>
              <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.9)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600, padding: "5px 12px", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)" }}>{carnival.category}</div>
            </div>

            {/* Gallery Thumbnails */}
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              {gallery.map((src, n) => (
                <button key={src} onClick={() => setActiveImage(src)}
                  style={{ flex: 1, aspectRatio: "1", borderRadius: "12px", overflow: "hidden", padding: 0, border: `2px solid ${activeImage === src ? a : "transparent"}`, cursor: "pointer", background: "none" }}>
                  <img src={src} alt={`carnival-image-${n + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: activeImage === src ? 1 : 0.75, transition: "opacity 0.2s" }} loading="lazy"/>
                </button>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I want to enquire about ${carnival.name}.`)}`} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", background: "#25d366", color: "white", borderRadius: "12px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.3)", transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
              <a href={`tel:${PHONE}`}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", background: `linear-gradient(135deg,${a},${a}bb)`, color: "white", borderRadius: "12px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", boxShadow: `0 4px 16px ${a}40`, transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                Call Now
              </a>
            </div>
          </div>

          {/* Right */}
          <div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: a }}>{carnival.category}</span>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#111827", margin: "8px 0 8px", lineHeight: 1.2 }}>{carnival.name}</h1>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.15rem", color: a, margin: "0 0 14px" }}>{carnival.tagline}</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.8, marginBottom: "20px" }}>{carnival.longDescription}</p>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
              {[{ d: "M9 12l2 2 4-4", l: "Verified" }, { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", l: "Safe" }, { d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", l: "Pan India" }, { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", l: "On-Time" }].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", background: `${a}0f`, border: `1px solid ${a}22`, borderRadius: "50px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="2"><path d={b.d}/></svg>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 600, color: a }}>{b.l}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: "1.5px solid #f0f0f0", display: "flex", marginBottom: "18px", overflowX: "auto" }}>
              {tab("features", "Features")}
              {tab("includes", "What's Included")}
              {tab("faq", "FAQ")}
            </div>

            {activeTab === "features" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {carnival.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", padding: "12px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #f0f0f0", alignItems: "flex-start" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: `${a}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="2"><path d={f.icon}/></svg>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#111827", margin: "0 0 2px" }}>{f.title}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#9ca3af", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "includes" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {carnival.includes.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 13px", background: "#f9fafb", borderRadius: "10px", border: "1px solid #f0f0f0" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: `${a}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.86rem", color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "faq" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {carnival.faqs.map((faq, i) => (
                  <div key={i} style={{ border: `1px solid ${openFaq === i ? a + "44" : "#f0f0f0"}`, borderRadius: "12px", overflow: "hidden" }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "13px 15px", background: openFaq === i ? `${a}08` : "#fff", border: "none", cursor: "pointer", textAlign: "left" }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.86rem", color: "#111827" }}>{faq.q}</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="2.5" style={{ flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "0 15px 13px", background: `${a}08` }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "#6b7280", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section style={{ padding: "48px 5%", background: "#f9fafb", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "48px", alignItems: "flex-start" }} className="cn-booking">
            <div>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: a }}>Book Now</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "#111827", margin: "8px 0 14px", lineHeight: 1.3 }}>
                Ready to Book?<br/>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: a }}>{carnival.name}</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.8, marginBottom: "28px" }}>
                Fill in your details — we call within <strong>30 minutes</strong>.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[{ n: "01", t: "Fill the Form", d: "Share your event details" }, { n: "02", t: "We Call You", d: "Confirmation within 30 mins" }, { n: "03", t: "Pay & Confirm", d: "50% advance secures booking" }, { n: "04", t: "We Show Up", d: "On time to your event" }].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `linear-gradient(135deg,${a},${a}bb)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${a}35` }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.72rem", color: "white" }}>{s.n}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.86rem", color: "#111827", margin: "0 0 2px" }}>{s.t}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#9ca3af", margin: 0 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px", paddingBottom: "16px", borderBottom: "1px solid #f9f9f9" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `linear-gradient(135deg,${a},${a}bb)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.93rem", color: "#111827", margin: 0 }}>Book {carnival.name}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#9ca3af", margin: 0 }}>Free consultation • No hidden charges</p>
                </div>
              </div>
              <BookingForm serviceName={carnival.name} serviceCategory={carnival.category} serviceSlug={carnival.slug} accentColor={a} />
            </div>
          </div>
        </div>
      </section>


      {/* Gallery */}
      <section style={{ padding: "56px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ marginBottom: "26px" }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: a }}>Gallery</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#111827", margin: "8px 0 0" }}>See It In Action</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }} className="cn-gallery">
            {[heroImage(carnival.slug + "-g1", 500, 500), heroImage(carnival.slug + "-g2", 500, 500), heroImage(carnival.slug + "-g3", 500, 500), heroImage(carnival.slug + "-g4", 500, 500)].map((src, i) => (
              <div key={i} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} className="cn-gallery-item">
                <img src={src} alt={`carnival gallery ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: "56px 5%", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ marginBottom: "26px" }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: a }}>Reviews</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#111827", margin: "8px 0 0" }}>What Customers Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }} className="cn-reviews">
            {[
              { name: "Ananya S.", text: `Booked ${carnival.name} and the team exceeded expectations — every detail was exactly as promised.`, rating: 5 },
              { name: "Vikram R.", text: "Punctual, professional, and the setup looked even better in person than the photos.", rating: 5 },
              { name: "Meera T.", text: "Great value for the price. Would book again for our next celebration without hesitation.", rating: 5 },
            ].map((r, i) => (
              <div key={i} style={{ padding: "22px", background: "#fff", borderRadius: "16px", border: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
                  {Array.from({ length: r.rating }).map((_, si) => (
                    <svg key={si} width="13" height="13" viewBox="0 0 24 24" fill="#facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>&ldquo;{r.text}&rdquo;</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#111827", margin: 0 }}>{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServicesSection items={relatedServices} accentColor={a} basePath="/carnival-event-organiser" viewAllLabel="View All Carnival Events" />
      <HostPartySection />


      {/* Sticky mobile CTA */}
      <div className="cn-sticky-cta" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, display: "none", padding: "10px 14px", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)", borderTop: "1px solid #f0f0f0", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I want to book ${carnival.name}.`)}`} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px", background: "#25d366", color: "white", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>
            WhatsApp
          </a>
          <a href="#book" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px", background: a, color: "white", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>
            Book Now
          </a>
        </div>
      </div>
      <style>{`
        .cn-gallery-item:hover img{transform:scale(1.08);}
        @media(max-width:900px){.cn-hero,.cn-booking{grid-template-columns:1fr!important;}}
        @media(max-width:768px){.cn-gallery,.cn-reviews{grid-template-columns:repeat(2,1fr)!important;} .cn-sticky-cta{display:block!important;}}
        @media(max-width:480px){.cn-gallery{grid-template-columns:repeat(2,1fr)!important;} .cn-reviews{grid-template-columns:1fr!important;}}
      `}</style>
    </>
  );
}
