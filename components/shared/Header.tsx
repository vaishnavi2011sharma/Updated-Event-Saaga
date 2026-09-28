"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLocation } from "@/components/location/LocationProvider";
import { cardImage } from "@/lib/images";
import NotificationBell from "@/components/dashboard/NotificationBell";
import { ALL_WEDDING_SERVICES } from "@/lib/weddingData";
import { ALL_BIRTHDAY_SERVICES } from "@/lib/birthdayData";
import { ALL_BABYSHOWER_SERVICES } from "@/lib/babyShowerData";
import { ALL_ANNIVERSARY_SERVICES } from "@/lib/anniversaryData";
import { ALL_PREWEDDING_SERVICES } from "@/lib/preWeddingData";
import { ALL_CORPORATE_SERVICES } from "@/lib/corporateData";
import { ALL_GAMES_SERVICES } from "@/lib/gamesData";

interface MegaColumn {
  title: string;
  items: { name: string; href: string }[];
}

interface NavItem {
  label: string;
  key: string;
  columns: MegaColumn[];
  bestSeller: { name: string; seed: string; href: string };
  topSellers: { name: string; seed: string; href: string }[];
}

function toColumn(title: string, base: string, services: { slug: string; name: string }[], count = 6): MegaColumn {
  return { title, items: services.slice(0, count).map(s => ({ name: s.name, href: `${base}/${s.slug}` })) };
}

const NAV: NavItem[] = [
  {
    label: "Weddings", key: "wedding-services",
    columns: [toColumn("Wedding Services", "/wedding-services", ALL_WEDDING_SERVICES), toColumn("Pre-Wedding", "/pre-wedding-functions", ALL_PREWEDDING_SERVICES)],
    bestSeller: { name: ALL_WEDDING_SERVICES[0].name, seed: ALL_WEDDING_SERVICES[0].slug, href: `/wedding-services/${ALL_WEDDING_SERVICES[0].slug}` },
    topSellers: ALL_WEDDING_SERVICES.slice(1, 5).map(s => ({ name: s.name, seed: s.slug, href: `/wedding-services/${s.slug}` })),
  },
  {
    label: "Birthdays", key: "birthday-decoration",
    columns: [toColumn("Birthday Decoration", "/birthday-decoration", ALL_BIRTHDAY_SERVICES, 8), toColumn("Popular Add-Ons", "/birthday-decoration", ALL_BIRTHDAY_SERVICES.slice(8), 6)],
    bestSeller: { name: ALL_BIRTHDAY_SERVICES[0].name, seed: ALL_BIRTHDAY_SERVICES[0].slug, href: `/birthday-decoration/${ALL_BIRTHDAY_SERVICES[0].slug}` },
    topSellers: ALL_BIRTHDAY_SERVICES.slice(1, 5).map(s => ({ name: s.name, seed: s.slug, href: `/birthday-decoration/${s.slug}` })),
  },
  {
    label: "Baby & Kids", key: "baby-shower",
    columns: [toColumn("Baby Shower", "/baby-shower", ALL_BABYSHOWER_SERVICES), toColumn("Anniversary", "/anniversary-decoration", ALL_ANNIVERSARY_SERVICES)],
    bestSeller: { name: ALL_BABYSHOWER_SERVICES[0].name, seed: ALL_BABYSHOWER_SERVICES[0].slug, href: `/baby-shower/${ALL_BABYSHOWER_SERVICES[0].slug}` },
    topSellers: ALL_BABYSHOWER_SERVICES.slice(1, 5).map(s => ({ name: s.name, seed: s.slug, href: `/baby-shower/${s.slug}` })),
  },
  {
    label: "Decorations", key: "special-occasion-decorations",
    columns: [toColumn("Special Occasions", "/special-occasion-decorations", []), toColumn("Party Equipment", "/party-equipment-rentals", [])],
    bestSeller: { name: "Proposal Decoration", seed: "proposal-decoration", href: "/special-occasion-decorations/proposal-decoration" },
    topSellers: [
      { name: "Surprise Party Decoration", seed: "surprise-party-decoration", href: "/special-occasion-decorations/surprise-party-decoration" },
      { name: "Romantic Room Decoration", seed: "romantic-room-decoration", href: "/special-occasion-decorations/romantic-room-decoration" },
      { name: "Tent / Shamiana on Rent", seed: "tent-shamiana-rental", href: "/party-equipment-rentals/tent-shamiana-rental" },
      { name: "Sound System on Rent", seed: "sound-system-rental", href: "/party-equipment-rentals/sound-system-rental" },
    ],
  },
  {
    label: "Games on Rent", key: "games-on-rent",
    columns: [toColumn("Games on Rent", "/games-on-rent", ALL_GAMES_SERVICES), toColumn("Entertainment", "/event-artists", [])],
    bestSeller: { name: ALL_GAMES_SERVICES[0].name, seed: ALL_GAMES_SERVICES[0].slug, href: `/games-on-rent/${ALL_GAMES_SERVICES[0].slug}` },
    topSellers: ALL_GAMES_SERVICES.slice(1, 5).map(s => ({ name: s.name, seed: s.slug, href: `/games-on-rent/${s.slug}` })),
  },
  { label: "Corporate Events", key: "corporate-events", columns: [toColumn("Corporate Events", "/corporate-events", ALL_CORPORATE_SERVICES, 6)], bestSeller: { name: ALL_CORPORATE_SERVICES[0].name, seed: ALL_CORPORATE_SERVICES[0].slug, href: `/corporate-events/${ALL_CORPORATE_SERVICES[0].slug}` }, topSellers: ALL_CORPORATE_SERVICES.slice(1, 5).map(s => ({ name: s.name, seed: s.slug, href: `/corporate-events/${s.slug}` })) },
];

const SIMPLE_LINKS = [
  { label: "Mascots", href: "/mascots" },
  { label: "Carnival Events", href: "/carnival-event-organiser" },
  { label: "Water Activities", href: "/water-activities" },
];

export default function Header() {
  const { locationName, setShowPopup } = useLocation();
  const { data: session } = useSession();
  const dashboardHref =
    session?.user?.role === "SUPER_ADMIN" ? "/admin/dashboard" :
    session?.user?.role === "VENDOR" ? "/vendor/dashboard" :
    "/customer/dashboard";
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const active = NAV.find(n => n.key === openMenu);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const allServices = NAV.flatMap(n => n.columns.flatMap(c => c.items));
    const match = allServices.find(s => s.name.toLowerCase().includes(q));
    if (match) router.push(match.href);
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,250,243,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #f3e4d0" }}>
      {/* Row 1 — utility bar */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "10px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", borderBottom: "1px solid #f9f0e2" }} className="hd-row1">
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <Image src="/images/eventsaaga-logo.png" alt="EventSaaga — Crafting Moments, Creating Memories" width={220} height={220} priority style={{ height: "50px", width: "auto", display: "block" }} />
        </Link>

        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: "440px" }} className="hd-search">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 16px", borderRadius: "50px", border: "1.5px solid #f0dfc8", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a89685" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for &apos;Birthday Decoration&apos;"
              style={{ flex: 1, border: "none", outline: "none", background: "none", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#3a2a1a" }}
            />
          </div>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexShrink: 0 }} className="hd-utility">
          <Link href="/contact" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", textDecoration: "none" }} className="hd-support">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.04em", color: "#3a2a1a" }}>SUPPORT HUB</span>
          </Link>
          {session?.user ? (
            <>
              <NotificationBell />
              <Link href={dashboardHref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", textDecoration: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.04em", color: "#3a2a1a" }}>
                  {session.user.role === "SUPER_ADMIN" ? "ADMIN" : session.user.role === "VENDOR" ? "VENDOR" : "MY ACCOUNT"}
                </span>
              </Link>
              <button aria-label="Logout" onClick={() => signOut({ callbackUrl: "/" })} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", background: "none", border: "none", cursor: "pointer" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.04em", color: "#3a2a1a" }}>LOGOUT</span>
              </button>
            </>
          ) : (
            <Link href="/login" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", textDecoration: "none" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.04em", color: "#3a2a1a" }}>LOGIN</span>
            </Link>
          )}
          <button onClick={() => setShowPopup(true)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "50px", border: "1.5px solid #f0dfc8", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#3a2a1a" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d4145a" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {locationName || "Select City"}
          </button>
          <button aria-label="Menu" onClick={() => setMobileOpen(o => !o)} style={{ width: "38px", height: "38px", display: "none", alignItems: "center", justifyContent: "center", border: "1.5px solid #f0dfc8", borderRadius: "10px", background: "#fff", cursor: "pointer" }} className="hd-mobile-toggle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>

      {/* Row 2 — category nav */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }} className="hd-row2">
        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hd-nav" onMouseLeave={closeSoon}>
          {NAV.map(item => (
            <div key={item.key} onMouseEnter={() => openNow(item.key)} style={{ position: "relative" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "4px", padding: "12px 12px", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.84rem", color: openMenu === item.key ? "#d4145a" : "#3a2a1a" }}>
                {item.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: openMenu === item.key ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          ))}
          {SIMPLE_LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{ padding: "12px 12px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.84rem", color: "#3a2a1a", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </nav>

        <button onClick={() => setShowPopup(true)} style={{ padding: "9px 22px", background: "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", boxShadow: "0 6px 16px rgba(212,20,90,0.25)", flexShrink: 0 }} className="hd-book-btn">
          Book Now
        </button>
      </div>

      {/* Mega menu panel */}
      {active && (
        <div onMouseEnter={() => openNow(active.key)} onMouseLeave={closeSoon}
          style={{ position: "absolute", left: 0, right: 0, top: "100%", background: "rgba(255,255,255,0.98)", backdropFilter: "blur(16px)", borderTop: "1px solid #f3e4d0", borderBottom: "1px solid #f3e4d0", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", animation: "mm-open 0.22s ease" }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "32px 5%", display: "grid", gridTemplateColumns: `repeat(${active.columns.length},1fr) 1.2fr 1.4fr`, gap: "32px" }} className="mm-grid">
            {active.columns.map(col => (
              <div key={col.title}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#a89685", marginBottom: "16px" }}>{col.title}</p>
                {col.items.length === 0
                  ? <Link href={`/${active.key}`} style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#3a2a1a", textDecoration: "none", padding: "6px 0" }}>Browse All →</Link>
                  : col.items.map(it => (
                    <Link key={it.href} href={it.href} className="mm-link" style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "#4a3d30", textDecoration: "none", padding: "6px 0" }}>{it.name}</Link>
                  ))}
              </div>
            ))}

            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#a89685", marginBottom: "16px" }}>Bestseller</p>
              <Link href={active.bestSeller.href} style={{ display: "block", textDecoration: "none", borderRadius: "14px", overflow: "hidden", boxShadow: "0 8px 22px rgba(0,0,0,0.1)" }}>
                <img src={cardImage(active.bestSeller.seed, 320, 220)} alt={active.bestSeller.name} style={{ width: "100%", aspectRatio: "16/11", objectFit: "cover", display: "block" }} loading="lazy"/>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#3a2a1a", padding: "10px 4px 0" }}>{active.bestSeller.name}</p>
              </Link>
            </div>

            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#a89685", marginBottom: "16px" }}>Top Sellers</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {active.topSellers.map(t => (
                  <Link key={t.href} href={t.href} style={{ textDecoration: "none", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
                    <img src={cardImage(t.seed, 160, 120)} alt={t.name} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} loading="lazy"/>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.68rem", color: "#3a2a1a", padding: "6px 4px", lineHeight: 1.3 }}>{t.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid #f3e4d0", padding: "16px 5%", display: "none" }} className="hd-mobile-panel">
          {[...NAV.map(n => ({ label: n.label, href: `/${n.key}` })), ...SIMPLE_LINKS].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 0", borderBottom: "1px solid #f9f3ea", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#3a2a1a", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @keyframes mm-open { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }
        .mm-link:hover{color:#d4145a!important;}
        @media(max-width:1320px){ .mm-grid{grid-template-columns:repeat(2,1fr)!important;max-height:70vh;overflow-y:auto;} }
        @media(max-width:1100px){
          .hd-nav{display:none!important;}
          .hd-mobile-toggle{display:flex!important;}
          .hd-mobile-panel{display:block!important;}
          .hd-row2{justify-content:flex-end!important;padding:8px 5%!important;}
          .hd-book-btn{padding:8px 14px!important;font-size:0.75rem!important;}
        }
        @media(max-width:880px){ .hd-search{display:none!important;} }
        @media(max-width:640px){ .hd-support{display:none!important;} }
      `}</style>
    </header>
  );
}
