"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalCustomers: number; totalVendors: number; pendingVendors: number; totalBookings: number;
  newBookings: number; pendingBookings: number; confirmedBookings: number; assignedBookings: number;
  inProgressBookings: number; completedBookings: number; cancelledBookings: number;
}
interface RecentBooking { bookingId: string; name: string; serviceName: string; location?: string; status: string; createdAt: string; }
interface RecentVendor { _id: string; name: string; businessName?: string; vendorStatus: string; createdAt: string; }

const STATUS_COLORS: Record<string, string> = {
  NEW: "#3b82f6", PENDING: "#f59e0b", CONFIRMED: "#10b981", ASSIGNED: "#7c3aed",
  IN_PROGRESS: "#0891b2", COMPLETED: "#16a34a", CANCELLED: "#dc2626",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [recentVendors, setRecentVendors] = useState<RecentVendor[]>([]);
  const [locationBreakdown, setLocationBreakdown] = useState<{ location: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(d => {
        if (!d.success) { setError(d.message || "Failed to load dashboard."); return; }
        setStats(d.stats);
        setRecentBookings(d.recentBookings || []);
        setRecentVendors(d.recentVendors || []);
        setLocationBreakdown(d.locationBreakdown || []);
      })
      .catch(() => setError("Network error loading dashboard."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading dashboard...</p>;
  if (error) return <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#dc2626" }}>{error}</p>;
  if (!stats) return null;

  const cards = [
    { label: "Total Bookings", value: stats.totalBookings, color: "#7c3aed", href: "/admin/bookings" },
    { label: "New", value: stats.newBookings, color: "#3b82f6", href: "/admin/bookings?status=NEW" },
    { label: "Pending", value: stats.pendingBookings, color: "#f59e0b", href: "/admin/bookings?status=PENDING" },
    { label: "Assigned", value: stats.assignedBookings, color: "#7c3aed", href: "/admin/bookings?status=ASSIGNED" },
    { label: "In Progress", value: stats.inProgressBookings, color: "#0891b2", href: "/admin/bookings?status=IN_PROGRESS" },
    { label: "Completed", value: stats.completedBookings, color: "#16a34a", href: "/admin/bookings?status=COMPLETED" },
    { label: "Cancelled", value: stats.cancelledBookings, color: "#dc2626", href: "/admin/bookings?status=CANCELLED" },
    { label: "Total Customers", value: stats.totalCustomers, color: "#d4145a", href: "/admin/customers" },
    { label: "Total Vendors", value: stats.totalVendors, color: "#e8a33d", href: "/admin/vendors" },
    { label: "Pending Vendors", value: stats.pendingVendors, color: "#f59e0b", href: "/admin/vendors?status=PENDING_APPROVAL" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", marginBottom: "24px" }}>Dashboard Overview</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "14px", marginBottom: "36px" }} className="ad-stats-grid">
        {cards.map(c => (
          <Link key={c.label} href={c.href} style={{ textDecoration: "none", background: "#fff", borderRadius: "14px", padding: "18px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", display: "block" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.5rem", color: c.color, margin: "0 0 4px" }}>{c.value}</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", margin: 0 }}>{c.label}</p>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }} className="ad-two-col">
        <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", color: "#2a1d12", margin: 0 }}>Recent Bookings</h2>
            <Link href="/admin/bookings" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#d4145a", textDecoration: "none" }}>View All →</Link>
          </div>
          {recentBookings.length === 0 ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68", fontSize: "0.85rem" }}>No bookings yet.</p> : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentBookings.map(b => (
                <div key={b.bookingId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f9f3ea" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#2a1d12", margin: "0 0 2px" }}>{b.serviceName}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", margin: 0 }}>{b.bookingId} · {b.name} · {b.location || "—"}</p>
                  </div>
                  <span style={{ padding: "4px 10px", borderRadius: "50px", background: `${STATUS_COLORS[b.status] || "#6b7280"}18`, color: STATUS_COLORS[b.status] || "#6b7280", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.65rem" }}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", color: "#2a1d12", margin: 0 }}>Recent Vendors</h2>
            <Link href="/admin/vendors" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#d4145a", textDecoration: "none" }}>View All →</Link>
          </div>
          {recentVendors.length === 0 ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68", fontSize: "0.85rem" }}>No vendors yet.</p> : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentVendors.map(v => (
                <div key={v._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f9f3ea" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#2a1d12", margin: 0 }}>{v.businessName || v.name}</p>
                  <span style={{ padding: "4px 10px", borderRadius: "50px", background: v.vendorStatus === "APPROVED" ? "#16a34a18" : "#f59e0b18", color: v.vendorStatus === "APPROVED" ? "#16a34a" : "#f59e0b", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.62rem" }}>{v.vendorStatus}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {locationBreakdown.length > 0 && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", marginTop: "20px" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", color: "#2a1d12", marginBottom: "14px" }}>Location-wise Bookings</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {locationBreakdown.map(l => (
              <div key={l.location} style={{ padding: "8px 16px", background: "#fdf0e4", borderRadius: "50px" }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#2a1d12", textTransform: "capitalize" }}>{l.location}</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", marginLeft: "6px" }}>({l.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:1100px){.ad-stats-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:900px){.ad-two-col{grid-template-columns:1fr!important;}}
        @media(max-width:600px){.ad-stats-grid{grid-template-columns:1fr 1fr!important;}}
      `}</style>
    </div>
  );
}
