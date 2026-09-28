"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Vendor {
  _id: string; name: string; businessName?: string; email: string; phone?: string;
  serviceCategories?: string[]; vendorLocations?: string[]; experience?: string;
  vendorStatus: string; createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING_APPROVAL: "#f59e0b", APPROVED: "#16a34a", REJECTED: "#dc2626", SUSPENDED: "#6b7280",
};

function AdminVendorsInner() {
  const searchParams = useSearchParams();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(() => {
    Promise.resolve().then(() => setLoading(true));
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    fetch(`/api/admin/vendors?${params.toString()}`)
      .then(r => r.json())
      .then(d => setVendors(d.vendors || []))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (vendorId: string, vendorStatus: string) => {
    setUpdating(vendorId);
    await fetch("/api/admin/vendors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendorId, vendorStatus }),
    });
    setUpdating(null);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", margin: 0 }}>Vendors</h1>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: "9px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem" }}>
          <option value="">All Statuses</option>
          <option value="PENDING_APPROVAL">Pending Approval</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      {loading ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading vendors...</p>
        : vendors.length === 0 ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>No vendors match this filter.</p>
        : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {vendors.map(v => (
              <div key={v._id} style={{ background: "#fff", borderRadius: "14px", padding: "18px 20px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#2a1d12", margin: "0 0 4px" }}>{v.businessName || v.name}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#8a7a68", margin: 0 }}>{v.name} · {v.email} {v.phone && `· ${v.phone}`}</p>
                  </div>
                  <span style={{ padding: "5px 14px", borderRadius: "50px", background: `${STATUS_COLORS[v.vendorStatus]}18`, color: STATUS_COLORS[v.vendorStatus], fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.7rem" }}>{v.vendorStatus.replace("_", " ")}</span>
                </div>
                {(v.serviceCategories?.length || v.vendorLocations?.length) ? (
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#4a3d30", margin: "0 0 12px" }}>
                    {v.serviceCategories?.length ? <><strong>Services:</strong> {v.serviceCategories.join(", ")} </> : null}
                    {v.vendorLocations?.length ? <><br/><strong>Locations:</strong> {v.vendorLocations.join(", ")}</> : null}
                  </p>
                ) : null}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {v.vendorStatus !== "APPROVED" && (
                    <button disabled={updating === v._id} onClick={() => updateStatus(v._id, "APPROVED")}
                      style={{ padding: "7px 16px", background: "#16a34a", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>Approve</button>
                  )}
                  {v.vendorStatus !== "REJECTED" && (
                    <button disabled={updating === v._id} onClick={() => updateStatus(v._id, "REJECTED")}
                      style={{ padding: "7px 16px", background: "#dc2626", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>Reject</button>
                  )}
                  {v.vendorStatus === "APPROVED" && (
                    <button disabled={updating === v._id} onClick={() => updateStatus(v._id, "SUSPENDED")}
                      style={{ padding: "7px 16px", background: "#6b7280", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>Suspend</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default function AdminVendorsPage() {
  return (
    <Suspense fallback={<p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading...</p>}>
      <AdminVendorsInner />
    </Suspense>
  );
}
