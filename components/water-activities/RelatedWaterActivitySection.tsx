import Link from "next/link";
import { cardImage } from "@/lib/images";
import { WaterActivityService } from "@/lib/waterActivitiesData";

interface Props {
  title?: string;
  waterActivities: WaterActivityService[];
  accentColor?: string;
}

const WHATSAPP = "919876543210";
const PHONE = "9876543210";

export default function RelatedWaterActivitySection({ title = "Similar Services You'll Love", waterActivities, accentColor = "#06b6d4" }: Props) {
  if (!waterActivities.length) return null;

  return (
    <section style={{ padding: "60px 5%", background: "#fff" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "4px", height: "22px", borderRadius: "2px", background: `linear-gradient(to bottom,${accentColor},${accentColor}88)` }}/>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#111827", margin: 0 }}>{title}</h2>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#9ca3af", margin: 0 }}>Explore more water fun options</p>
          </div>
          <Link href="/water-activities" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: accentColor, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
            View All Water Activities
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
          {waterActivities.map(svc => (
            <div key={svc.slug}
              style={{ borderRadius: "20px", overflow: "hidden", background: `linear-gradient(160deg,${svc.gradientFrom},${svc.gradientTo})`, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", transition: "transform 0.25s,box-shadow 0.25s", cursor: "pointer" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 18px 48px rgba(0,0,0,0.22)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)"; }}
            >
              <div style={{ padding: "14px 14px 0" }}>
                <span style={{ background: svc.badgeColor, color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "50px", boxShadow: `0 2px 8px ${svc.badgeColor}60` }}>{svc.badge}</span>
              </div>
              <div style={{ height: "140px", position: "relative", overflow: "hidden" }}>
                <img src={cardImage(svc.slug)} alt={svc.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)" }}/>
              </div>
              <div style={{ padding: "14px 16px 18px", background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: "6px", lineHeight: 1.3 }}>{svc.name}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5, marginBottom: "14px" }}>{svc.description}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href={`/water-activities/${svc.slug}`} style={{ flex: 1, padding: "8px 10px", background: "white", color: accentColor, borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", textDecoration: "none" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Book Now
                  </Link>
                  <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I want to book ${svc.name}.`)}`} target="_blank" rel="noopener noreferrer"
                    style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, textDecoration: "none" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  <a href={`tel:${PHONE}`} style={{ width: "32px", height: "32px", borderRadius: "50%", background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, textDecoration: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){section > div > div:last-child{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:540px){section > div > div:last-child{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
