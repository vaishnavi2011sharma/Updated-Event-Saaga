"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import ProfilePanel from "./ProfilePanel";
import ReviewsPanel from "./ReviewsPanel";
import NotificationsPanel from "./NotificationsPanel";

type Tab = "dashboard" | "bookings" | "notifications" | "reviews" | "profile";

interface Booking {
  bookingId: string;
  serviceName: string;
  serviceCategory: string;
  location?: string;
  eventDate?: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "#3b82f6", PENDING: "#f59e0b", CONFIRMED: "#10b981", ASSIGNED: "#7c3aed",
  IN_PROGRESS: "#0891b2", COMPLETED: "#16a34a", CANCELLED: "#dc2626",
};

export default function CustomerDashboardClient({ userName }: { userName: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("dashboard");

  useEffect(() => {
    fetch("/api/customer/bookings")
      .then(r => r.json())
      .then(d => setBookings(d.bookings || []))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter(b => !["COMPLETED", "CANCELLED"].includes(b.status));
  const completed = bookings.filter(b => b.status === "COMPLETED");

  return (
    <div style={{ minHeight: "70vh", background: "#fffaf3", padding: "40px 5% 70px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4145a", marginBottom: "6px" }}>My Dashboard</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.8rem", color: "#2a1d12", margin: 0 }}>Welcome, {userName}</h1>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={{ padding: "10px 20px", background: "#fff", border: "1.5px solid #f0dfc8", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#3a2a1a", cursor: "pointer" }}>Logout</button>
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "28px", flexWrap: "wrap" }}>
          {([["dashboard", "Dashboard"], ["bookings", "My Bookings"], ["notifications", "Notifications"], ["reviews", "Reviews"], ["profile", "Profile"]] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: "9px 18px", borderRadius: "50px", border: `1.5px solid ${tab === key ? "#d4145a" : "#f0dfc8"}`, background: tab === key ? "#fdf0e4" : "#fff", color: tab === key ? "#d4145a" : "#4a3d30", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "profile" ? <ProfilePanel accentColor="#d4145a" /> : tab === "reviews" ? <ReviewsPanel accentColor="#d4145a" /> : tab === "notifications" ? <NotificationsPanel accentColor="#d4145a" /> : (
        <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "36px" }} className="cd-stats">
          {[
            { label: "Total Bookings", value: bookings.length, color: "#7c3aed" },
            { label: "Upcoming", value: upcoming.length, color: "#e8a33d" },
            { label: "Completed", value: completed.length, color: "#16a34a" },
            { label: "Cancelled", value: bookings.filter(b => b.status === "CANCELLED").length, color: "#dc2626" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.7rem", color: s.color, margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#8a7a68", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.2rem", color: "#2a1d12", marginBottom: "16px" }}>My Bookings</h2>

        {loading ? (
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68", marginBottom: "16px" }}>You haven&apos;t made any bookings yet.</p>
            <Link href="/#categories" style={{ padding: "10px 24px", background: "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>Browse Services</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {bookings.map(b => (
              <div key={b.bookingId} style={{ background: "#fff", borderRadius: "14px", padding: "18px 20px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#2a1d12", margin: "0 0 4px" }}>{b.serviceName}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#8a7a68", margin: 0 }}>
                    {b.bookingId} · {b.location || "—"} · {b.eventDate || "Date TBD"}
                  </p>
                </div>
                <span style={{ padding: "5px 14px", borderRadius: "50px", background: `${STATUS_COLORS[b.status] || "#6b7280"}18`, color: STATUS_COLORS[b.status] || "#6b7280", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.04em" }}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
        </>
        )}
      </div>

      <style>{`@media(max-width:700px){.cd-stats{grid-template-columns:1fr 1fr!important;}}`}</style>
    </div>
  );
}
