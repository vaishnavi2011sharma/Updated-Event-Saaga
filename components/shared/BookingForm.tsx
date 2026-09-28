"use client";
import { useState } from "react";

interface Props {
  serviceName: string;
  serviceCategory: string;
  serviceSlug?: string;
  accentColor?: string;
}

const CITIES = ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Chandigarh", "Ahmedabad", "Lucknow", "Noida", "Gurgaon", "Surat", "Indore", "Kochi", "Bhopal", "Nagpur", "Faridabad", "Ghaziabad"];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export default function BookingForm({ serviceName, serviceCategory, serviceSlug, accentColor = "#7c3aed" }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", date: "", time: "", guests: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          eventDate: form.date || undefined,
          eventTime: form.time || undefined,
          location: form.city || form.address || undefined,
          serviceCategory,
          serviceName,
          serviceSlug,
          guestCount: form.guests || undefined,
          budget: form.budget || undefined,
          message: [form.address && `Venue: ${form.address}`, form.message].filter(Boolean).join(" | ") || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrors(data.errors || ["Something went wrong. Please try again or contact us on WhatsApp."]);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmitted(true);
    } catch {
      setErrors(["Network error — please check your connection and try again."]);
      setLoading(false);
    }
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    border: `1.5px solid ${focused === name ? accentColor : "#e5e7eb"}`,
    borderRadius: "10px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.88rem",
    color: "#1a1009",
    outline: "none",
    backgroundColor: focused === name ? "#fdfbff" : "#fff",
    boxShadow: focused === name ? `0 0 0 3px ${accentColor}18` : "none",
    transition: "all 0.2s",
    boxSizing: "border-box" as const,
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#4b5563",
    marginBottom: "6px",
    display: "block",
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: `0 8px 24px ${accentColor}40` }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1009", marginBottom: "10px" }}>Booking Request Sent!</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "24px" }}>
          Thank you <strong>{form.name}</strong>! Our team will call you on <strong>{form.phone}</strong> within 30 minutes to confirm your booking for <strong>{serviceName}</strong>.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I just submitted a booking request for ${serviceName} on ${form.date}.`)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#25d366", color: "white", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
          <button onClick={() => setSubmitted(false)} style={{ padding: "10px 20px", background: "transparent", border: `1.5px solid ${accentColor}`, color: accentColor, borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
            Edit Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="ebf-form">
      {errors.length > 0 && (
        <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px" }}>
          {errors.map((err, i) => (
            <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#dc2626", margin: i === 0 ? 0 : "4px 0 0" }}>{err}</p>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="ebf-row">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input required value={form.name} onChange={e => update("name", e.target.value)}
            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
            placeholder="Your full name" style={fieldStyle("name")} />
        </div>
        <div>
          <label style={labelStyle}>Mobile Number *</label>
          <input required type="tel" value={form.phone} onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
            onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
            placeholder="98765 43210" maxLength={10} style={fieldStyle("phone")} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>
        <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
          placeholder="you@example.com" style={fieldStyle("email")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="ebf-row">
        <div>
          <label style={labelStyle}>City *</label>
          <select required value={form.city} onChange={e => update("city", e.target.value)}
            onFocus={() => setFocused("city")} onBlur={() => setFocused(null)}
            style={{ ...fieldStyle("city"), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "36px", cursor: "pointer" }}>
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Event Date *</label>
          <input required type="date" value={form.date} onChange={e => update("date", e.target.value)}
            onFocus={() => setFocused("date")} onBlur={() => setFocused(null)}
            min={new Date().toISOString().split("T")[0]}
            style={fieldStyle("date")} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="ebf-row">
        <div>
          <label style={labelStyle}>Event Time</label>
          <input type="time" value={form.time} onChange={e => update("time", e.target.value)}
            onFocus={() => setFocused("time")} onBlur={() => setFocused(null)}
            style={fieldStyle("time")} />
        </div>
        <div>
          <label style={labelStyle}>Expected Guests</label>
          <select value={form.guests} onChange={e => update("guests", e.target.value)}
            onFocus={() => setFocused("guests")} onBlur={() => setFocused(null)}
            style={{ ...fieldStyle("guests"), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "36px", cursor: "pointer" }}>
            <option value="">Select range</option>
            {["Under 50", "50–100", "100–200", "200–500", "500+"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Approximate Budget</label>
        <select value={form.budget} onChange={e => update("budget", e.target.value)}
          onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)}
          style={{ ...fieldStyle("budget"), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "36px", cursor: "pointer" }}>
          <option value="">Select range</option>
          {["Under ₹10,000", "₹10,000–₹25,000", "₹25,000–₹50,000", "₹50,000–₹1,00,000", "₹1,00,000+"].map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Venue Address</label>
        <input value={form.address} onChange={e => update("address", e.target.value)}
          onFocus={() => setFocused("address")} onBlur={() => setFocused(null)}
          placeholder="Full venue address" style={fieldStyle("address")} />
      </div>

      <div>
        <label style={labelStyle}>Special Requirements</label>
        <textarea value={form.message} onChange={e => update("message", e.target.value)}
          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
          rows={3}
          placeholder="Any special requests or additional details..."
          style={{ ...fieldStyle("message"), resize: "vertical", lineHeight: 1.6 }} />
      </div>

      <button type="submit" disabled={loading}
        style={{
          padding: "14px 24px",
          background: loading ? "#d1d5db" : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
          color: "white", border: "none", borderRadius: "12px",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem",
          cursor: loading ? "default" : "pointer",
          boxShadow: loading ? "none" : `0 6px 20px ${accentColor}40`,
          transition: "all 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
        }}
        onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
      >
        {loading ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
              <path d="M12 2a10 10 0 0110 10" strokeOpacity="0.9"/>
            </svg>
            Sending Request...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Confirm Booking Request
          </>
        )}
      </button>

      <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#9ca3af", margin: 0 }}>
        🔒 Your details are safe with us. We&apos;ll call you within 30 minutes to confirm.
      </p>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media(max-width:520px){
          .ebf-row{grid-template-columns:1fr!important;}
          .ebf-form input,.ebf-form select,.ebf-form textarea{font-size:16px!important;}
        }
        @media(max-width:360px){
          .ebf-form{gap:12px!important;}
        }
      `}</style>
    </form>
  );
}
