"use client";
import { useState } from "react";
import { useLocation } from "./LocationProvider";
import { LOCATION_GROUPS, LOCATION_DISPLAY, LocationSlug } from "@/lib/locations/config";

export default function LocationSwitcher() {
  const { locationName, setLocation } = useLocation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "7px 14px", borderRadius: "50px",
          border: "1.5px solid #e5e7eb",
          background: "#fff", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem", fontWeight: 600,
          color: "#374151", transition: "all 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#7c3aed"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        {locationName ?? "Select City"}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 999 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            background: "#fff", borderRadius: "16px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
            border: "1px solid #f0f0f0",
            padding: "20px", zIndex: 1000,
            width: "320px",
          }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "14px" }}>
              Change City
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {LOCATION_GROUPS.map(group => (
                <div key={group.label}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d1d5db", marginBottom: "8px" }}>
                    {group.label}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.cities.map(slug => (
                      <button
                        key={slug}
                        onClick={() => { setLocation(slug as LocationSlug); setOpen(false); }}
                        onMouseEnter={() => setHovered(slug)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          padding: "5px 12px", borderRadius: "50px",
                          border: `1.5px solid ${hovered === slug ? "#7c3aed" : "#e5e7eb"}`,
                          background: hovered === slug ? "#7c3aed" : "#fff",
                          color: hovered === slug ? "#fff" : "#374151",
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.78rem", fontWeight: 500,
                          cursor: "pointer", transition: "all 0.15s",
                        }}
                      >
                        {LOCATION_DISPLAY[slug as LocationSlug]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
