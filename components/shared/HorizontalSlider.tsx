"use client";
import { useRef } from "react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  itemWidth?: string;
  gap?: string;
  className?: string;
}

export default function HorizontalSlider({ children, itemWidth = "260px", gap = "18px", className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }} className={className}>
      <button
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-1)}
        className="hs-arrow hs-arrow-left"
        style={{ position: "absolute", left: "-6px", top: "50%", transform: "translateY(-50%)", zIndex: 5, width: "42px", height: "42px", borderRadius: "50%", background: "#fff", border: "1px solid #f0dfc8", boxShadow: "0 6px 18px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div
        ref={trackRef}
        className="hs-track"
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: "8px",
          scrollbarWidth: "none",
        }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} style={{ flex: `0 0 ${itemWidth}`, scrollSnapAlign: "start" }}>
                {child}
              </div>
            ))
          : children}
      </div>

      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className="hs-arrow hs-arrow-right"
        style={{ position: "absolute", right: "-6px", top: "50%", transform: "translateY(-50%)", zIndex: 5, width: "42px", height: "42px", borderRadius: "50%", background: "#fff", border: "1px solid #f0dfc8", boxShadow: "0 6px 18px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <style>{`
        .hs-track::-webkit-scrollbar{display:none;}
        .hs-arrow:hover{background:#fdf0e4;}
        @media(max-width:640px){ .hs-arrow{display:none!important;} }
      `}</style>
    </div>
  );
}
