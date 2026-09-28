import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/#categories" },
  { name: "Gallery", href: "/#gallery" },
  { name: "About Us", href: "/#why" },
  { name: "Contact", href: "/contact" },
];

const SERVICES = [
  { name: "Wedding Services", href: "/wedding-services" },
  { name: "Birthday Decoration", href: "/birthday-decoration" },
  { name: "Baby Shower", href: "/baby-shower" },
  { name: "Anniversary Decoration", href: "/anniversary-decoration" },
  { name: "Corporate Events", href: "/corporate-events" },
  { name: "Games on Rent", href: "/games-on-rent" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "linear-gradient(180deg,#fff8f0,#fdf0e4)", padding: "64px 5% 24px", borderTop: "1px solid #f3e4d0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "36px" }} className="ft-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "14px" }}>
              <Image src="/images/eventsaaga-logo.png" alt="EventSaaga — Crafting Moments, Creating Memories" width={260} height={260} style={{ height: "64px", width: "auto", display: "block" }} />
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68", lineHeight: 1.75, maxWidth: "300px", marginBottom: "18px" }}>
              Crafting moments, creating memories. India&apos;s premium event booking platform across 20+ cities.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#fff", border: "1px solid #f0dfc8", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#d4145a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="tel:9876543210" style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#fff", border: "1px solid #f0dfc8", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#e8a33d"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </a>
              <a href="mailto:eventsaaga1985@gmail.com" style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#fff", border: "1px solid #f0dfc8", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
              </a>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#3a2a1a", marginBottom: "18px" }}>Quick Links</p>
            {QUICK_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68", textDecoration: "none", marginBottom: "12px" }}>{l.name}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#3a2a1a", marginBottom: "18px" }}>Our Services</p>
            {SERVICES.map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68", textDecoration: "none", marginBottom: "12px" }}>{l.name}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#3a2a1a", marginBottom: "18px" }}>Get In Touch</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68", marginBottom: "12px" }}>📍 Pan India Services — 100+ Cities</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68", marginBottom: "12px" }}>📞 +91-9876543210</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68", marginBottom: "12px" }}>✉️ bookings@eventsaaga.com</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68" }}>🕐 24/7 Support Available</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #f0dfc8", marginTop: "44px", paddingTop: "22px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#a89685", margin: 0 }}>© {year} EventSaaga. All Rights Reserved. Made with 🧡 for unforgettable memories.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#a89685" }}>Privacy Policy</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#a89685" }}>Terms of Service</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#a89685" }}>Sitemap</span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.ft-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:560px){.ft-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </footer>
  );
}
