"use client";
import { useEffect, useState, useCallback } from "react";

interface Customer { _id: string; name: string; email: string; phone?: string; createdAt: string; bookingCount: number; }
interface Booking { bookingId: string; serviceName: string; location?: string; eventDate?: string; status: string; }

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ customer: Customer; bookings: Booking[] } | null>(null);

  const load = useCallback(() => {
    Promise.resolve().then(() => setLoading(true));
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    fetch(`/api/admin/customers?${params.toString()}`)
      .then(r => r.json())
      .then(d => setCustomers(d.customers || []))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const openCustomer = async (c: Customer) => {
    const res = await fetch(`/api/admin/customers?customerId=${c._id}`);
    const data = await res.json();
    if (data.success) setSelected({ customer: data.customer, bookings: data.bookings });
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", marginBottom: "20px" }}>Customers</h1>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or phone"
        style={{ width: "100%", maxWidth: "360px", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", outline: "none", marginBottom: "20px", boxSizing: "border-box" }} />

      {loading ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading customers...</p>
        : customers.length === 0 ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>No customers found.</p>
        : (
          <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ background: "#fdf0e4" }}>
                    {["Name", "Email", "Phone", "Bookings", ""].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#8a7a68", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map(c => (
                    <tr key={c._id} style={{ borderBottom: "1px solid #f9f3ea" }}>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#2a1d12" }}>{c.name}</td>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30" }}>{c.email}</td>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30" }}>{c.phone || "—"}</td>
                      <td style={{ padding: "12px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#4a3d30" }}>{c.bookingCount}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <button onClick={() => openCustomer(c)} style={{ padding: "6px 14px", background: "#fff", border: "1.5px solid #f0dfc8", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#3a2a1a", cursor: "pointer" }}>View</button>
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
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px", padding: "28px", width: "min(520px,100%)", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.15rem", color: "#2a1d12", margin: 0 }}>{selected.customer.name}</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#8a7a68" }}>×</button>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#4a3d30", marginBottom: "18px" }}>{selected.customer.email} {selected.customer.phone && `· ${selected.customer.phone}`}</p>
            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1d12", marginBottom: "10px" }}>Booking History</h3>
            {selected.bookings.length === 0 ? <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#8a7a68" }}>No bookings yet.</p> : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {selected.bookings.map(b => (
                  <div key={b.bookingId} style={{ padding: "10px 14px", background: "#fdf0e4", borderRadius: "10px" }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#2a1d12", margin: "0 0 2px" }}>{b.serviceName}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", margin: 0 }}>{b.bookingId} · {b.location || "—"} · {b.eventDate || "—"} · {b.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
