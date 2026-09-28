"use client";
import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  "birthday-decoration", "baby-shower", "wedding-services", "anniversary-decoration",
  "pre-wedding-functions", "event-artists", "mascots", "carnival-event-organiser",
  "games-on-rent", "corporate-events", "special-occasion-decorations",
  "party-equipment-rentals", "water-activities",
];

const LOCATIONS = [
  "delhi", "noida", "gurgaon", "faridabad", "ghaziabad", "lucknow", "chandigarh", "jaipur",
  "mumbai", "pune", "ahmedabad", "surat", "indore", "bhopal", "nagpur",
  "bangalore", "hyderabad", "chennai", "kochi", "kolkata",
];

export default function VendorRegisterPage() {
  const [form, setForm] = useState({
    name: "", businessName: "", email: "", phone: "", password: "",
    experience: "", availability: "", businessInfo: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (list: string[], setList: (v: string[]) => void, val: string) =>
    setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const res = await fetch("/api/vendor/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, serviceCategories: categories, vendorLocations: locations }),
    });

    let data: { success?: boolean; errors?: string[] } = {};
    try {
      data = await res.json();
    } catch {
      setErrors(["We couldn't reach the server. Please check your connection and try again."]);
      setLoading(false);
      return;
    }

    setLoading(false);
    if (!res.ok || !data.success) {
      setErrors(data.errors || ["Something went wrong. Please try again."]);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 5%", textAlign: "center" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", color: "#2a1d12", marginBottom: "14px" }}>Registration Received!</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#6b5c4d", maxWidth: "440px", margin: "0 auto 24px" }}>Your vendor account is pending Super Admin approval. We&apos;ll notify you once it&apos;s reviewed — you can try logging in any time to check your status.</p>
          <Link href="/login" style={{ padding: "12px 26px", background: "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "60px 5%", background: "linear-gradient(180deg,#fdf0e4,#fffaf3)" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", background: "#fff", borderRadius: "24px", padding: "40px 36px", boxShadow: "0 24px 70px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4145a", marginBottom: "8px" }}>Partner With Us</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", margin: 0 }}>Register as a Vendor</h1>
        </div>

        {errors.length > 0 && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", marginBottom: "18px" }}>
            {errors.map((err, i) => <p key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#dc2626", margin: i === 0 ? 0 : "4px 0 0" }}>{err}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { key: "name", label: "Your Name", type: "text" },
              { key: "businessName", label: "Business Name", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Mobile Number", type: "tel" },
              { key: "password", label: "Password", type: "password" },
              { key: "experience", label: "Years of Experience", type: "text" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "#4b5563", marginBottom: "5px" }}>{f.label}</label>
                <input required={f.key !== "experience"} type={f.type} value={form[f.key as keyof typeof form]} onChange={e => update(f.key, e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "#4b5563", marginBottom: "8px" }}>Service Categories</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {CATEGORIES.map(c => (
                <button type="button" key={c} onClick={() => toggle(categories, setCategories, c)}
                  style={{ padding: "6px 12px", borderRadius: "50px", border: `1.5px solid ${categories.includes(c) ? "#d4145a" : "#e5e7eb"}`, background: categories.includes(c) ? "#fdf0e4" : "#fff", color: categories.includes(c) ? "#d4145a" : "#6b7280", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>
                  {c.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "#4b5563", marginBottom: "8px" }}>Locations You Operate In</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {LOCATIONS.map(l => (
                <button type="button" key={l} onClick={() => toggle(locations, setLocations, l)}
                  style={{ padding: "6px 12px", borderRadius: "50px", border: `1.5px solid ${locations.includes(l) ? "#7c3aed" : "#e5e7eb"}`, background: locations.includes(l) ? "#f3ecff" : "#fff", color: locations.includes(l) ? "#7c3aed" : "#6b7280", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "#4b5563", marginBottom: "5px" }}>Availability</label>
            <input value={form.availability} onChange={e => update("availability", e.target.value)} placeholder="e.g. Weekdays & weekends"
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "#4b5563", marginBottom: "5px" }}>About Your Business</label>
            <textarea rows={3} value={form.businessInfo} onChange={e => update("businessInfo", e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", boxSizing: "border-box", resize: "vertical" }} />
          </div>

          <button type="submit" disabled={loading}
            style={{ padding: "13px", background: loading ? "#d1d5db" : "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loading ? "default" : "pointer", boxShadow: loading ? "none" : "0 8px 22px rgba(212,20,90,0.28)" }}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
          <p style={{ textAlign: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#9ca3af", margin: 0 }}>Your account will be reviewed by our team before activation.</p>
        </form>
      </div>
    </div>
  );
}
