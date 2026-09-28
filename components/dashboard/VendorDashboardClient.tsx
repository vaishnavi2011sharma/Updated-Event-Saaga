"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import ProfilePanel from "./ProfilePanel";
import NotificationsPanel from "./NotificationsPanel";

type Tab = "dashboard" | "assignments" | "notifications" | "profile";

interface Assignment {
  bookingId: string;
  name: string;
  phone: string;
  serviceName: string;
  serviceCategory: string;
  location?: string;
  eventDate?: string;
  eventTime?: string;
  guestCount?: string;
  message?: string;
  status: string;
  vendorInstructions?: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  ASSIGNED: "#7c3aed", IN_PROGRESS: "#0891b2", COMPLETED: "#16a34a", CONFIRMED: "#10b981",
};

export default function VendorDashboardClient({ userName, businessName }: { userName: string; businessName?: string }) {
  const [jobs, setJobs] = useState<Assignment[]>([]);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = () => {
    fetch("/api/vendor/assignments")
      .then(r => r.json())
      .then(d => setJobs(d.bookings || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (bookingId: string, status: "IN_PROGRESS" | "COMPLETED") => {
    setUpdating(bookingId);
    await fetch("/api/vendor/assignments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, status }),
    });
    setUpdating(null);
    load();
  };

  const today = jobs.filter(j => j.status !== "COMPLETED");
  const completed = jobs.filter(j => j.status === "COMPLETED");

  return (
    <div style={{ minHeight: "70vh", background: "#fffaf3", padding: "40px 5% 70px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", marginBottom: "6px" }}>Vendor Dashboard</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.8rem", color: "#2a1d12", margin: 0 }}>{businessName || userName}</h1>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={{ padding: "10px 20px", background: "#fff", border: "1.5px solid #f0dfc8", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#3a2a1a", cursor: "pointer" }}>Logout</button>
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "28px", flexWrap: "wrap" }}>
          {([["dashboard", "Dashboard"], ["assignments", "My Assignments"], ["notifications", "Notifications"], ["profile", "Profile"]] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: "9px 18px", borderRadius: "50px", border: `1.5px solid ${tab === key ? "#7c3aed" : "#f0dfc8"}`, background: tab === key ? "#f3ecff" : "#fff", color: tab === key ? "#7c3aed" : "#4a3d30", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "profile" ? <ProfilePanel isVendor accentColor="#7c3aed" /> : tab === "notifications" ? <NotificationsPanel accentColor="#7c3aed" /> : (
        <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "36px" }} className="vd-stats">
          {[
            { label: "Active Jobs", value: today.length, color: "#7c3aed" },
            { label: "Completed Jobs", value: completed.length, color: "#16a34a" },
            { label: "Total Assignments", value: jobs.length, color: "#e8a33d" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.7rem", color: s.color, margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#8a7a68", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.2rem", color: "#2a1d12", marginBottom: "16px" }}>Assigned Jobs</h2>

        {loading ? (
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading your assignments...</p>
        ) : jobs.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>No jobs assigned yet. New assignments from the admin team will appear here.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {jobs.map(j => (
              <div key={j.bookingId} style={{ background: "#fff", borderRadius: "14px", padding: "18px 20px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#2a1d12", margin: "0 0 4px" }}>{j.serviceName}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#8a7a68", margin: 0 }}>
                      {j.bookingId} · {j.location || "—"} · {j.eventDate || "Date TBD"} {j.eventTime ? `· ${j.eventTime}` : ""}
                    </p>
                  </div>
                  <span style={{ padding: "5px 14px", borderRadius: "50px", background: `${STATUS_COLORS[j.status] || "#6b7280"}18`, color: STATUS_COLORS[j.status] || "#6b7280", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.7rem" }}>{j.status}</span>
                </div>
                {j.message && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30", margin: "0 0 6px" }}><strong>Requirements:</strong> {j.message}</p>}
                {j.vendorInstructions && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#7c3aed", margin: "0 0 10px" }}><strong>Admin Instructions:</strong> {j.vendorInstructions}</p>}
                {j.status !== "COMPLETED" && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    {j.status !== "IN_PROGRESS" && (
                      <button disabled={updating === j.bookingId} onClick={() => updateStatus(j.bookingId, "IN_PROGRESS")}
                        style={{ padding: "7px 16px", background: "#0891b2", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>Mark In Progress</button>
                    )}
                    <button disabled={updating === j.bookingId} onClick={() => updateStatus(j.bookingId, "COMPLETED")}
                      style={{ padding: "7px 16px", background: "#16a34a", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>Mark Completed</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        </>
        )}
      </div>

      <style>{`@media(max-width:700px){.vd-stats{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
