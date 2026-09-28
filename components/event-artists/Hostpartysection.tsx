"use client";
import { useState } from "react";
import Link from "next/link";

const CITIES_TABS = ["Delhi NCR", "Gurugram/Gurgaon", "Noida", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Ahmedabad", "Lucknow", "Chennai"];

const SERVICES_BY_CITY: Record<string, { name: string; href: string }[]> = {
  default: [
    { name: "Birthday Decorations", href: "/birthday-decoration" },
    { name: "Kids Birthday Celebration", href: "/birthday-decoration/kids-birthday-theme" },
    { name: "Party Decorations", href: "/special-occasion-decorations" },
    { name: "Candlelight Dinner", href: "/special-occasion-decorations/romantic-room-decoration" },
    { name: "Party Entertainment", href: "/event-artists" },
    { name: "Corporate Events", href: "/corporate-events" },
    { name: "Photography Services", href: "/birthday-decoration/photographer-birthday" },
    { name: "Anniversary Decorations", href: "/anniversary-decoration" },
    { name: "Baby Shower Celebration", href: "/baby-shower" },
    { name: "Baby Welcome Decorations", href: "/baby-shower/godh-bharai-setup" },
    { name: "Wedding Services", href: "/wedding-services" },
    { name: "Pre-Wedding Functions", href: "/pre-wedding-functions" },
    { name: "Haldi/Mehndi Decorations", href: "/pre-wedding-functions/haldi-ceremony-decoration" },
    { name: "Mascots & Cartoon Characters", href: "/mascots" },
    { name: "Carnival Event Organiser", href: "/carnival-event-organiser" },
    { name: "Party Equipment Rentals", href: "/party-equipment-rentals" },
    { name: "Water Activities", href: "/water-activities" },
    { name: "Games on Rent", href: "/games-on-rent" },
    { name: "Casino Game on Rent", href: "/games-on-rent/casino-game-on-rent" },
    { name: "Bouncy Castle on Rent", href: "/games-on-rent/bouncy-castle-on-rent" },
    { name: "Popcorn Machine on Rent", href: "/games-on-rent/popcorn-machine-on-rent" },
    { name: "Candy Floss Machine", href: "/games-on-rent/candy-floss-machine-on-rent" },
    { name: "Chocolate Fountain", href: "/games-on-rent/chocolate-fountain-on-rent" },
    { name: "Electronic Games on Rent", href: "/games-on-rent/electronic-games-on-rent" },
  ],
};

const SHOW_LIMIT = 18;

export default function HostPartySection() {
  const [activeCity, setActiveCity] = useState("Delhi NCR");
  const [showAll, setShowAll] = useState(false);

  const services = SERVICES_BY_CITY[activeCity] ?? SERVICES_BY_CITY["default"];
  const displayServices = showAll ? services : services.slice(0, SHOW_LIMIT);

  return (
    <section style={{ padding: "60px 5%", background: "#f9fafb", borderTop: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#111827", marginBottom: "28px" }}>
          Host Your Next Party With Ease
        </h2>

        <div style={{ display: "flex", gap: "0", borderBottom: "1.5px solid #e5e7eb", marginBottom: "28px", overflowX: "auto", paddingBottom: "0" }}>
          {CITIES_TABS.map(city => (
            <button key={city} onClick={() => { setActiveCity(city); setShowAll(false); }}
              style={{ flexShrink: 0, padding: "10px 16px", background: "none", border: "none", borderBottom: `2.5px solid ${activeCity === city ? "#7c3aed" : "transparent"}`, marginBottom: "-1.5px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", fontWeight: activeCity === city ? 700 : 400, color: activeCity === city ? "#7c3aed" : "#6b7280", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
              {city}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "6px 0" }}>
          {displayServices.map((svc, i) => (
            <Link key={i} href={svc.href} style={{ textDecoration: "none", padding: "10px 0" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#111827", margin: 0, lineHeight: 1.3, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#7c3aed")}
                onMouseLeave={e => (e.currentTarget.style.color = "#111827")}>
                {svc.name}
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#9ca3af", margin: "2px 0 0" }}>in {activeCity}</p>
            </Link>
          ))}

          {!showAll && services.length > SHOW_LIMIT && (
            <div style={{ padding: "10px 0" }}>
              <button onClick={() => setShowAll(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#7c3aed", margin: 0 }}>Show More</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#9ca3af", margin: "2px 0 0" }}>+{services.length - SHOW_LIMIT} more</p>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){section > div > div:last-child{grid-template-columns:repeat(4,1fr)!important;}}
        @media(max-width:640px){section > div > div:last-child{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  );
}
