"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "@/components/location/LocationProvider";
import HostPartySection from "@/components/event-artists/Hostpartysection";
import FloatingLeaves from "@/components/shared/FloatingLeaves";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import HorizontalSlider from "@/components/shared/HorizontalSlider";
import { bannerImage, cardImage } from "@/lib/images";
import { LOCATION_SLUGS, LOCATION_DISPLAY } from "@/lib/locations/config";

const PASTELS = [
  { bg: "linear-gradient(160deg,#fbcfe8,#f9a8d4)", icon: "#be185d" },
  { bg: "linear-gradient(160deg,#fed7aa,#fdba74)", icon: "#c2410c" },
  { bg: "linear-gradient(160deg,#fef08a,#fde047)", icon: "#a16207" },
  { bg: "linear-gradient(160deg,#ddd6fe,#c4b5fd)", icon: "#6d28d9" },
  { bg: "linear-gradient(160deg,#bfdbfe,#93c5fd)", icon: "#1d4ed8" },
  { bg: "linear-gradient(160deg,#a7f3d0,#6ee7b7)", icon: "#047857" },
  { bg: "linear-gradient(160deg,#fecdd3,#fda4af)", icon: "#be123c" },
];

const CATEGORIES = [
  { key: "wedding-services", name: "Weddings", icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
  { key: "special-occasion-decorations", name: "Proposal Setups", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { key: "anniversary-decoration", name: "Candlelight Dinners", icon: "M9 18h6M10 22h4M12 2a6 6 0 00-6 6c0 3 2 5 3 6.5.5.8 1 1.5 1 2.5h4c0-1 .5-1.7 1-2.5C16 13 18 11 18 8a6 6 0 00-6-6z" },
  { key: "pre-wedding-functions", name: "Haldi Ceremony", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { key: "wedding-services", name: "Sangeet Nights", icon: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" },
  { key: "birthday-decoration", name: "Birthday Decorations", icon: "M12 8v13H4a1 1 0 01-1-1v-9M12 8v13h8a1 1 0 001-1v-9M12 8H5.5A2.5 2.5 0 013 5.5 2.5 2.5 0 015.5 3C9 3 12 8 12 8zm0 0h6.5A2.5 2.5 0 0021 5.5 2.5 2.5 0 0018.5 3C15 3 12 8 12 8z" },
  { key: "baby-shower", name: "Baby Showers", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { key: "corporate-events", name: "Corporate Events", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m14-8a4 4 0 10-8 0" },
  { key: "mascots", name: "Mascots", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" },
  { key: "carnival-event-organiser", name: "Carnival Events", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { key: "games-on-rent", name: "Games on Rent", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { key: "party-equipment-rentals", name: "Party Equipment", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { key: "water-activities", name: "Water Activities", icon: "M2 12c2 2 4 2 6 0s4-2 6 0 4 2 6 0M2 18c2 2 4 2 6 0s4-2 6 0 4 2 6 0" },
];

const TRENDING = [
  { name: "Kids Birthday Theme", href: "/birthday-decoration/kids-birthday-theme", seed: "kids-birthday-theme", price: "From ₹4,999", badge: "Most Popular", grad: "linear-gradient(160deg,#1a0a2e,#4c1d95)" },
  { name: "Bouncy Castle on Rent", href: "/games-on-rent/bouncy-castle-on-rent", seed: "bouncy-castle-on-rent", price: "From ₹2,499", badge: "Fun For All", grad: "linear-gradient(160deg,#1a1000,#7c4a12)" },
  { name: "Wedding Stage Decoration", href: "/wedding-services/wedding-stage-decoration", seed: "wedding-stage-decoration", price: "From ₹24,999", badge: "Kids Favourite", grad: "linear-gradient(160deg,#052e16,#065f46)" },
  { name: "Corporate Annual Day", href: "/corporate-events/corporate-annual-day", seed: "corporate-annual-day", price: "Custom Quote", badge: "Trending", grad: "linear-gradient(160deg,#080e1a,#1a3a6e)" },
  { name: "Baby Shower Theme Decoration", href: "/baby-shower/baby-shower-theme-decoration", seed: "baby-shower-theme-decoration", price: "From ₹6,999", badge: "New", grad: "linear-gradient(160deg,#2d0a1e,#9d174d)" },
  { name: "360 Degree Selfie Booth", href: "/birthday-decoration/360-degree-selfie-booth", seed: "360-degree-selfie-booth", price: "From ₹8,999", badge: "Viral", grad: "linear-gradient(160deg,#0a001a,#4c1d95)" },
];

const WHY_US = [
  { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", title: "Premium Decor & Styling", desc: "Trendy, luxurious & customized setups" },
  { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m14-8a4 4 0 10-8 0", title: "Dedicated Event Managers", desc: "Personal support from planning to execution" },
  { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Top Quality Assurance", desc: "Premium materials & trusted vendors" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "24/7 Support", desc: "We're here whenever you need us" },
  { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", title: "Pan India Services", desc: "Celebrating across 100+ cities in India" },
  { icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z", title: "Personalized Experiences", desc: "Tailored events that reflect your story" },
];

const GALLERY = [
  { seed: "gal-haldi", label: "Haldi Ceremony" },
  { seed: "gal-sangeet", label: "Sangeet Night" },
  { seed: "gal-wedding", label: "Dream Weddings" },
  { seed: "gal-birthday", label: "Birthday Bash" },
  { seed: "gal-candle", label: "Candlelight Dinner" },
];

const TESTIMONIALS = [
  { name: "Ananya & Rohan", city: "New Delhi", text: "EventSaaga turned our dream wedding into a fairytale! Every detail was perfect.", rating: 5 },
  { name: "Priya & Vikram", city: "Mumbai", text: "The sangeet night was absolutely stunning. Our guests couldn't stop talking about it!", rating: 5 },
  { name: "Meera Sharma", city: "Jaipur", text: "The candlelight proposal setup was beyond magical. He said yes immediately!", rating: 5 },
];

const CITIES = [
  { name: "Delhi NCR", href: "/delhi" },
  { name: "Mumbai", href: "/mumbai" },
  { name: "Jaipur", href: "/jaipur" },
  { name: "Bangalore", href: "/bangalore" },
  { name: "Hyderabad", href: "/hyderabad" },
  { name: "Pune", href: "/pune" },
  { name: "Chandigarh", href: "/chandigarh" },
  { name: "More Cities", href: "/#city-slider" },
];

const MOMENTS = ["mo-wedding", "mo-mehndi", "mo-decor", "mo-night", "mo-sangeet", "mo-birthday", "mo-dinner"];

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { value, ref };
}

function StatCard({ target, suffix, label, icon, decimals = 0 }: { target: number; suffix: string; label: string; icon: string; decimals?: number }) {
  const { value, ref } = useCountUp(target * 10 ** decimals);
  const display = (value / 10 ** decimals).toFixed(decimals);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "18px 10px" }}>
      <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#fdf0e4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8a33d" strokeWidth="2"><path d={icon}/></svg>
      </div>
      <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.5rem", color: "#3a2a1a", margin: "0 0 4px" }}>{display}{suffix}</p>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#8a7a68", margin: 0 }}>{label}</p>
    </div>
  );
}

export default function HomePage() {
  const { location, setShowPopup } = useLocation();
  const categoryHref = (key: string) => (location ? `/${location}/${key}` : `/${key}`);

  return (
    <div style={{ minHeight: "100vh", background: "#fffaf3", overflowX: "hidden", position: "relative" }}>
      <FloatingLeaves />

      {/* Floating call button (WhatsApp is rendered globally via layout) */}
      <a href="tel:9876543210"
        style={{ position: "fixed", right: "18px", bottom: "24px", zIndex: 60, width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg,#a78bfa,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(124,58,237,0.4)", textDecoration: "none" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
      </a>


      {/* ── Hero ── */}
      <section style={{ position: "relative", padding: "56px 5% 70px", background: "linear-gradient(135deg,#fdf0e4 0%,#fbe4ee 45%,#eaeafc 100%)", overflow: "hidden" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative", zIndex: 3, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "40px", alignItems: "center" }} className="hero-grid">

          <Reveal type="slide-right">
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4145a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "22px", height: "1.5px", background: "#d4145a" }}/> Welcome To EventSaaga
            </p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3.2rem)", color: "#2a1d12", lineHeight: 1.18, marginBottom: "18px" }}>
              Celebrating Moments<br/>Preserving Memories on{" "}
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e8a33d" }}>Time</span> 💗
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#6b5c4d", maxWidth: "460px", marginBottom: "28px", lineHeight: 1.75 }}>
              From intimate celebrations to grand affairs, we design experiences that stay in your heart forever.
            </p>
            <div style={{ display: "flex", gap: "14px", marginBottom: "30px", flexWrap: "wrap" }}>
              <button onClick={() => setShowPopup(true)}
                style={{ padding: "14px 28px", background: "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 10px 28px rgba(212,20,90,0.3)", transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                Book Your Experience
              </button>
              <a href="#categories" style={{ padding: "14px 28px", background: "#fff", color: "#3a2a1a", border: "1.5px solid #f0dfc8", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                Explore Events
              </a>
            </div>
            <div style={{ display: "flex", gap: "22px", flexWrap: "wrap" }}>
              {[
                { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", t1: "Premium Decor", t2: "Experts" },
                { icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z", t1: "Personalized", t2: "Experiences" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", t1: "24/7", t2: "Support" },
                { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", t1: "Pan India", t2: "Services" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#fff", border: "1px solid #f0dfc8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4145a" strokeWidth="2"><path d={f.icon}/></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.76rem", color: "#3a2a1a", margin: 0, lineHeight: 1.3 }}>{f.t1}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", margin: 0 }}>{f.t2}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal type="zoom" delay={0.15}>
            <div style={{ position: "relative", aspectRatio: "1", maxWidth: "460px", margin: "0 auto" }}>
              <div style={{ position: "absolute", inset: "6%", borderRadius: "50%", overflow: "hidden", boxShadow: "0 30px 70px rgba(212,20,90,0.18)", border: "6px solid rgba(255,255,255,0.7)" }}>
                <img src={bannerImage("es-hero-main", 800, 800)} alt="EventSaaga premium celebrations" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="eager"/>
              </div>

              {[
                { pos: { top: "6%", left: "-6%" }, icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z", val: "1000+", label: "Happy Clients", color: "#d4145a" },
                { pos: { top: "10%", right: "-8%" }, icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", val: "100+", label: "Cities", color: "#3b82f6" },
                { pos: { bottom: "14%", left: "-10%" }, icon: "M9 11H5a2 2 0 00-2 2v7a2 2 0 002 2h4m0-11v11m0-11h6m-6 11h6m0-11h4a2 2 0 012 2v7a2 2 0 01-2 2h-4m0-11v11", val: "2000+", label: "Events Done", color: "#e8a33d" },
                { pos: { bottom: "4%", right: "-4%" }, icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", val: "5.0★", label: "Client Rating", color: "#facc15" },
              ].map((c, i) => (
                <div key={i} className="hero-float-card" style={{ position: "absolute", ...c.pos, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: "16px", padding: "10px 14px", boxShadow: "0 12px 30px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "10px", animation: `hero-bob ${4 + i}s ease-in-out infinite` }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2"><path d={c.icon}/></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "0.95rem", color: "#2a1d12", margin: 0 }}>{c.val}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.66rem", color: "#8a7a68", margin: 0, whiteSpace: "nowrap" }}>{c.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" style={{ padding: "76px 5%", background: "#fffaf3" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "14px" }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4145a", marginBottom: "10px" }}>◆ Our Experiences ◆</p>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", color: "#2a1d12", margin: 0 }}>Celebrations Crafted Just For You</h2>
              </div>
              <Link href="#categories" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#d4145a", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                View All Categories
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </Reveal>
          <HorizontalSlider itemWidth="230px" gap="18px">
            {CATEGORIES.map((c, i) => {
              const p = PASTELS[i % PASTELS.length];
              return (
                <Link key={c.name} href={categoryHref(c.key)} className="cat-card" style={{ textDecoration: "none", display: "block", borderRadius: "20px", overflow: "hidden", background: "#fff", border: "1px solid #f3e4d0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", transition: "transform 0.3s,box-shadow 0.3s" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3" }}>
                    <img src={cardImage(c.key, 400, 300)} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy"/>
                    <div style={{ position: "absolute", inset: 0, background: p.bg, opacity: 0.4 }}/>
                    <div style={{ position: "absolute", top: "12px", left: "12px", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={p.icon} strokeWidth="1.8"><path d={c.icon}/></svg>
                    </div>
                  </div>
                  <div style={{ padding: "14px", textAlign: "center" }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1d12", margin: 0 }}>{c.name}</p>
                  </div>
                </Link>
              );
            })}
          </HorizontalSlider>
        </div>
      </section>

      {/* ── Trending Services (dark) ── */}
      <section style={{ padding: "76px 5%", background: "linear-gradient(180deg,#150a24,#1a0e2e)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#facc15", marginBottom: "10px" }}>— Fun & Entertainment —</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", color: "white", margin: "0 0 10px" }}>
                Make Every Occasion <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#a78bfa" }}>Extra Special</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>Rent premium games & entertainment for birthdays, weddings, fairs & corporate events across India.</p>
            </div>
          </Reveal>
          <HorizontalSlider itemWidth="320px" gap="20px">
            {TRENDING.map(t => (
              <Link key={t.href} href={t.href} className="trend-card" style={{ textDecoration: "none", display: "block", borderRadius: "20px", overflow: "hidden", background: t.grad, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", transition: "transform 0.3s" }}>
                <div style={{ position: "relative", aspectRatio: "16/10" }}>
                  <img src={cardImage(t.seed, 460, 290)} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, display: "block" }} loading="lazy"/>
                  <div style={{ position: "absolute", inset: 0, background: `${t.grad}`, opacity: 0.45 }}/>
                  <span style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "50px" }}>{t.badge}</span>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "white", margin: "0 0 4px" }}>{t.name}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", margin: "0 0 14px" }}>{t.price}</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ flex: 1, padding: "9px", background: "white", color: "#1a0e2e", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", textAlign: "center" }}>Book Now</span>
                    <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </HorizontalSlider>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/games-on-rent" style={{ display: "inline-block", padding: "12px 30px", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "50px", color: "white", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
              View All Games →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose EventSaaga ── */}
      <section id="why" style={{ padding: "76px 5%", background: "linear-gradient(180deg,#fef2f4,#fdf0e4)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "50px", alignItems: "center" }} className="why-outer">
          <Reveal type="slide-right">
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4145a", marginBottom: "10px" }}>Why Choose EventSaaga</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.3rem)", color: "#2a1d12", marginBottom: "16px" }}>
              Perfection In Every <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e8a33d" }}>Detail</span> ★
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#6b5c4d", lineHeight: 1.8, marginBottom: "24px" }}>
              We don&apos;t just plan events, we create emotions. Every detail is crafted with passion to make your moments unforgettable.
            </p>
            <button onClick={() => setShowPopup(true)} style={{ padding: "13px 26px", background: "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 8px 22px rgba(212,20,90,0.28)" }}>
              Know More About Us →
            </button>
          </Reveal>
          <StaggerGroup style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="why-grid">
            {WHY_US.map((w, i) => (
              <StaggerItem key={i}>
                <div style={{ padding: "20px", background: "#fff", borderRadius: "16px", display: "flex", gap: "12px", alignItems: "flex-start", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fdf0e4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4145a" strokeWidth="2"><path d={w.icon}/></svg>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1d12", margin: "0 0 4px" }}>{w.title}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#8a7a68", margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal>
          <div style={{ maxWidth: "1100px", margin: "50px auto 0", background: "#fff", borderRadius: "20px", padding: "10px", boxShadow: "0 10px 34px rgba(0,0,0,0.06)", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }} className="stats-row">
            <StatCard target={1000} suffix="+" label="Happy Clients" icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m14-8a4 4 0 10-8 0" />
            <StatCard target={2000} suffix="+" label="Events Completed" icon="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            <StatCard target={100} suffix="+" label="Cities We Serve" icon="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <StatCard target={50} suffix="+" label="Expert Designers" icon="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <StatCard target={5} decimals={1} suffix="★" label="Client Rating" icon="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </div>
        </Reveal>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" style={{ padding: "76px 5%", background: "#fffaf3" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", color: "#2a1d12", margin: 0 }}>
                A Glimpse Of Our <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e8a33d" }}>Creations</span>
              </h2>
            </div>
          </Reveal>
          <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }} className="gal-grid">
            {GALLERY.map(g => (
              <StaggerItem key={g.seed}>
                <div className="gal-item" style={{ position: "relative", borderRadius: "18px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                  <img src={cardImage(g.seed, 320, 420)} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} loading="lazy"/>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.7) 100%)" }}/>
                  <p style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "white", margin: 0 }}>{g.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── Testimonials + Cities ── */}
      <section style={{ padding: "76px 5%", background: "linear-gradient(180deg,#fdf0e4,#fef2f4)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "44px" }} className="testi-outer">
          <div>
            <Reveal type="slide-right">
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4145a", marginBottom: "10px" }}>Client Stories</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.5rem,2.6vw,2.1rem)", color: "#2a1d12", marginBottom: "28px" }}>
                Heartfelt Words From Our <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e8a33d" }}>Happy Clients</span> 💗
              </h2>
            </Reveal>
            <StaggerGroup style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {TESTIMONIALS.map((t, i) => (
                <StaggerItem key={i}>
                  <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.05)", display: "flex", gap: "14px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg,#fbcfe8,#f9a8d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#be185d" }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#4a3d30", lineHeight: 1.7, margin: "0 0 10px" }}>&ldquo;{t.text}&rdquo;</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#2a1d12", margin: 0 }}>{t.name}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", margin: "0 0 4px" }}>{t.city}</p>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {Array.from({ length: t.rating }).map((_, si) => (
                          <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div>
            <Reveal type="slide-left">
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4145a", marginBottom: "10px" }}>Our Presence</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.4rem,2.4vw,1.9rem)", color: "#2a1d12", marginBottom: "22px" }}>We Are In Your City</h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "22px" }}>
              {[cardImage("city-1", 300, 220), cardImage("city-2", 300, 220)].map((src, i) => (
                <div key={i} style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "4/3" }}>
                  <img src={src} alt="City" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy"/>
                </div>
              ))}
            </div>
            <StaggerGroup style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {CITIES.map(c => (
                <StaggerItem key={c.name}>
                  <Link href={c.href} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", textDecoration: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4145a" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#2a1d12" }}>{c.name}</span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* ── City Slider ── */}
      <section style={{ padding: "0 5% 76px", background: "linear-gradient(180deg,#fef2f4,#fffaf3)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4145a", marginBottom: "10px" }}>Pan India Presence</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#2a1d12", margin: 0 }}>Bringing Celebrations Closer To You</h2>
            </div>
          </Reveal>
          <HorizontalSlider itemWidth="200px" gap="16px">
            {LOCATION_SLUGS.map(slug => (
              <Link key={slug} href={`/${slug}`} className="city-card" style={{ textDecoration: "none", display: "block", borderRadius: "16px", overflow: "hidden", position: "relative", aspectRatio: "3/4", boxShadow: "0 8px 22px rgba(0,0,0,0.08)" }}>
                <img src={cardImage(`city-${slug}`, 300, 400)} alt={LOCATION_DISPLAY[slug]} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} loading="lazy"/>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 45%,rgba(0,0,0,0.7) 100%)" }}/>
                <p style={{ position: "absolute", bottom: "14px", left: "0", right: "0", textAlign: "center", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "white", margin: 0 }}>{LOCATION_DISPLAY[slug]}</p>
              </Link>
            ))}
          </HorizontalSlider>
        </div>
      </section>

      {/* ── Moments / Instagram ── */}
      <section style={{ padding: "76px 5%", background: "#fffaf3" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", color: "#2a1d12", margin: 0 }}>
                Moments We <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e8a33d" }}>Crafted</span>
              </h2>
            </div>
          </Reveal>
          <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "12px" }} className="moments-grid">
            {MOMENTS.map(seed => (
              <StaggerItem key={seed}>
                <div className="gal-item" style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "1" }}>
                  <img src={cardImage(seed, 200, 200)} alt="Moment" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} loading="lazy"/>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 26px", background: "linear-gradient(135deg,#f472b6,#d4145a)", color: "white", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none", boxShadow: "0 8px 22px rgba(212,20,90,0.28)" }}>
              📷 Follow Us @eventsaaga
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <Reveal type="zoom">
        <section style={{ padding: "0 5%" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto 76px", borderRadius: "24px", overflow: "hidden", position: "relative", background: "linear-gradient(120deg,#1a0e0a,#2a1508)", padding: "56px 40px", textAlign: "center" }}>
            <img src={bannerImage("es-cta-banner", 1600, 500)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} loading="lazy"/>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a33d", marginBottom: "12px" }}>Ready To Celebrate?</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "white", marginBottom: "26px" }}>
                Let&apos;s Create Your <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e8a33d" }}>Unforgettable</span> Moment 💗
              </h2>
              <button onClick={() => setShowPopup(true)} style={{ padding: "14px 32px", background: "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 10px 28px rgba(212,20,90,0.35)" }}>
                Book Your Experience Now →
              </button>
            </div>
          </div>
        </section>
      </Reveal>

      <div id="contact"/>
      <HostPartySection />

      <style>{`
        @keyframes hero-bob { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        .cat-card:hover{transform:translateY(-6px);box-shadow:0 16px 34px rgba(0,0,0,0.1);}
        .trend-card:hover{transform:translateY(-6px);}
        .gal-item:hover img{transform:scale(1.1);}
        @media(max-width:1024px){
          .hero-grid{grid-template-columns:1fr!important;text-align:center;}
          .cat-grid{grid-template-columns:repeat(3,1fr)!important;}
          .trend-grid{grid-template-columns:repeat(2,1fr)!important;}
          .why-outer{grid-template-columns:1fr!important;}
          .why-grid{grid-template-columns:1fr 1fr!important;}
          .testi-outer{grid-template-columns:1fr!important;}
          .gal-grid{grid-template-columns:repeat(3,1fr)!important;}
          .moments-grid{grid-template-columns:repeat(4,1fr)!important;}
          .stats-row{grid-template-columns:repeat(3,1fr)!important;}
        }
        @media(max-width:768px){
          .cat-grid{grid-template-columns:repeat(2,1fr)!important;}
          .trend-grid{grid-template-columns:1fr!important;}
          .gal-grid{grid-template-columns:repeat(2,1fr)!important;}
        }
        @media(max-width:480px){
          .cat-grid{grid-template-columns:1fr 1fr!important;}
          .why-grid{grid-template-columns:1fr!important;}
          .moments-grid{grid-template-columns:repeat(3,1fr)!important;}
          .stats-row{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </div>
  );
}
