"use client";
import Link from "next/link";
import { cardImage } from "@/lib/images";
import { ALL_WEDDING_SERVICES } from "@/lib/weddingData";

export default function WeddingServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #1a1000 0%, #b45309 50%, #d97706 100%)",
        padding: "60px 5% 50px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%, #d9770640 0%, transparent 60%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 80%, #fcd34d20 0%, transparent 50%)", pointerEvents: "none" }}/>

        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(216,180,254,0.85)", marginBottom: "12px" }}>
          Your Forever Begins Here
        </p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "white", marginBottom: "16px", lineHeight: 1.2 }}>
          Wedding {" "}
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#fcd34d" }}>Services</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.78)", maxWidth: "600px", margin: "0 auto 28px", lineHeight: 1.7 }}>
          Stage decor, mandap setup, catering, photography, DJ & full planning — everything for your dream wedding.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {["8 Services","20+ Cities","5★ Rated","Verified Vendors"].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", background: "rgba(255,255,255,0.12)", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#6b7280", textDecoration: "none" }}>Home</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#d97706", fontWeight: 600 }}>Wedding Services</span>
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "40px 5% 80px" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#111827", marginBottom: "32px" }}>
          All Wedding Services{" "}
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", fontWeight: 400, color: "#9ca3af" }}>
            ({ALL_WEDDING_SERVICES.length} items)
          </span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }} className="we-grid">
          {ALL_WEDDING_SERVICES.map(svc => (
            <Link key={svc.slug} href={`/wedding-services/${svc.slug}`} style={{ textDecoration: "none" }}>
              <div
                style={{ borderRadius: "20px", overflow: "hidden", background: `linear-gradient(160deg,${svc.gradientFrom},${svc.gradientTo})`, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", transition: "transform 0.25s,box-shadow 0.25s", height: "100%" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.15)"; }}
              >
                <div style={{ height: "180px", position: "relative", overflow: "hidden" }}>
                  <img src={cardImage(svc.slug)} alt={svc.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)" }}/>
                  <span style={{ position: "absolute", top: "12px", left: "12px", background: svc.badgeColor, color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "50px", boxShadow: `0 2px 8px ${svc.badgeColor}60` }}>{svc.badge}</span>
                </div>
                <div style={{ padding: "14px 16px 18px", background: "rgba(0,0,0,0.22)" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: "6px", lineHeight: 1.3 }}>{svc.name}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5, marginBottom: "12px" }}>{svc.description}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: "50px" }}>{svc.category}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: "4px" }}>
                      Book Now <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.we-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){.we-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:480px){.we-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </div>
  );
}
