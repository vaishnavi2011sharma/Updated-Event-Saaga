"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Booking {
  bookingId: string; name: string; phone: string; email?: string;
  serviceName: string; serviceCategory: string; location?: string;
  eventDate?: string; eventTime?: string; guestCount?: string; budget?: string;
  message?: string; status: string; assignedVendorId?: string; adminNotes?: string;
  vendorInstructions?: string; createdAt: string;
}
interface Vendor { _id: string; name: string; businessName?: string; }

const STATUSES = ["NEW", "PENDING", "CONFIRMED", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
const STATUS_COLORS: Record<string, string> = {
  NEW: "#3b82f6", PENDING: "#f59e0b", CONFIRMED: "#10b981", ASSIGNED: "#7c3aed",
  IN_PROGRESS: "#0891b2", COMPLETED: "#16a34a", CANCELLED: "#dc2626",
};

function AdminBookingsInner() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [exporting, setExporting] = useState(false);

  const load = useCallback(() => {
    Promise.resolve().then(() => setLoading(true));
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    fetch(`/api/admin/bookings?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        if (!d.success) { setError(d.message); return; }
        setBookings(d.bookings || []);
      })
      .catch(() => setError("Network error loading bookings."))
      .finally(() => setLoading(false));
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const openDetail = async (b: Booking) => {
    setSelected(b);
    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceCategory: b.serviceCategory, location: b.location }),
    });
    const data = await res.json();
    setVendors(data.vendors || []);
  };

  const updateBooking = async (updates: Partial<Omit<Booking, "assignedVendorId">> & { bookingId: string; assignedVendorId?: string | null }) => {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (data.success) {
      setSelected(data.booking);
      load();
    }
  };

  const handleExport = async () => {
    setExporting(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/export?${params.toString()}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eventsaaga-bookings-${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", margin: 0 }}>Bookings</h1>
        <button onClick={handleExport} disabled={exporting} style={{ padding: "10px 20px", background: "linear-gradient(135deg,#16a34a,#15803d)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
          {exporting ? "Exporting..." : "Export Excel"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, email or booking ID"
          style={{ flex: 1, minWidth: "220px", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", outline: "none" }} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem" }}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading bookings...</p>
        : error ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#dc2626" }}>{error}</p>
        : bookings.length === 0 ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>No bookings match your filters.</p>
        : (
          <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "820px" }}>
                <thead>
                  <tr style={{ background: "#fdf0e4" }}>
                    {["Booking ID", "Customer", "Service", "Location", "Date", "Status", ""].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#8a7a68", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.bookingId} style={{ borderBottom: "1px solid #f9f3ea" }}>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#2a1d12" }}>{b.bookingId}</td>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30" }}>{b.name}<br/><span style={{ color: "#a89685", fontSize: "0.72rem" }}>{b.phone}</span></td>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30" }}>{b.serviceName}</td>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30", textTransform: "capitalize" }}>{b.location || "—"}</td>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30" }}>{b.eventDate || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "50px", background: `${STATUS_COLORS[b.status] || "#6b7280"}18`, color: STATUS_COLORS[b.status] || "#6b7280", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.65rem" }}>{b.status}</span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <button onClick={() => openDetail(b)} style={{ padding: "6px 14px", background: "#fff", border: "1.5px solid #f0dfc8", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#3a2a1a", cursor: "pointer" }}>Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px", padding: "28px", width: "min(560px,100%)", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.2rem", color: "#2a1d12", margin: 0 }}>{selected.bookingId}</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#8a7a68" }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "#4a3d30" }}>
              <p><strong>Customer:</strong> {selected.name} · {selected.phone} {selected.email && `· ${selected.email}`}</p>
              <p><strong>Service:</strong> {selected.serviceName} ({selected.serviceCategory})</p>
              <p><strong>Location:</strong> {selected.location || "—"} · <strong>Date:</strong> {selected.eventDate || "—"} {selected.eventTime && `· ${selected.eventTime}`}</p>
              {selected.guestCount && <p><strong>Guests:</strong> {selected.guestCount}</p>}
              {selected.budget && <p><strong>Budget:</strong> {selected.budget}</p>}
              {selected.message && <p><strong>Requirements:</strong> {selected.message}</p>}
            </div>

            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#4b5563", marginBottom: "6px" }}>Status</label>
            <select value={selected.status} onChange={e => updateBooking({ bookingId: selected.bookingId, status: e.target.value as Booking["status"] })}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", marginBottom: "14px" }}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#4b5563", marginBottom: "6px" }}>Assign Vendor</label>
            <select value={selected.assignedVendorId || ""} onChange={e => updateBooking({ bookingId: selected.bookingId, assignedVendorId: e.target.value || null })}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", marginBottom: "14px" }}>
              <option value="">— Unassigned —</option>
              {vendors.map(v => <option key={v._id} value={v._id}>{v.businessName || v.name}</option>)}
            </select>
            {vendors.length === 0 && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#9ca3af", marginTop: "-8px", marginBottom: "14px" }}>No approved vendors match this service/location yet.</p>}

            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#4b5563", marginBottom: "6px" }}>Vendor Instructions</label>
            <textarea defaultValue={selected.vendorInstructions} rows={2}
              onBlur={e => updateBooking({ bookingId: selected.bookingId, vendorInstructions: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", marginBottom: "14px", resize: "vertical", boxSizing: "border-box" }} />

            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#4b5563", marginBottom: "6px" }}>Internal Admin Notes</label>
            <textarea defaultValue={selected.adminNotes} rows={2}
              onBlur={e => updateBooking({ bookingId: selected.bookingId, adminNotes: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", resize: "vertical", boxSizing: "border-box" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={<p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading...</p>}>
      <AdminBookingsInner />
    </Suspense>
  );
}
