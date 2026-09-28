"use client";
import { useState } from "react";
import { useLocation } from "./LocationProvider";
import { LOCATION_GROUPS, LOCATION_DISPLAY, LocationSlug } from "@/lib/locations/config";

export default function LocationPopup() {
  const { showPopup, setLocation, setShowPopup } = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  if (!showPopup) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)", zIndex: 9998,
        }}
        onClick={() => setShowPopup(false)}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        background: "#fff",
        borderRadius: "24px",
        padding: "36px 40px",
        width: "min(580px, 94vw)",
        maxHeight: "85vh",
        overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem", fontWeight: 700,
            color: "#111827", margin: "0 0 8px",
          }}>
            Choose Your City
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem", color: "#6b7280", margin: 0,
          }}>
            We&apos;ll show you services and pricing specific to your location.
          </p>
        </div>

        {/* City Groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {LOCATION_GROUPS.map(group => (
            <div key={group.label}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#9ca3af", marginBottom: "10px",
              }}>
                {group.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.cities.map(slug => (
                  <button
                    key={slug}
                    onClick={() => setLocation(slug as LocationSlug)}
                    onMouseEnter={() => setHovered(slug)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "50px",
                      border: `1.5px solid ${hovered === slug ? "#7c3aed" : "#e5e7eb"}`,
                      background: hovered === slug ? "#7c3aed" : "#fff",
                      color: hovered === slug ? "#fff" : "#374151",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem", fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.18s",
                      boxShadow: hovered === slug ? "0 4px 14px rgba(124,58,237,0.3)" : "none",
                    }}
                  >
                    {LOCATION_DISPLAY[slug as LocationSlug]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={() => setShowPopup(false)}
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "32px", height: "32px", borderRadius: "50%",
            background: "#f3f4f6", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6b7280",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </>
  );
}
