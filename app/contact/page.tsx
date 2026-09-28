"use client";
import { useState } from "react";
import Reveal from "@/components/shared/Reveal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Reuses the existing booking API as a general enquiry intake so every
    // message still lands in MongoDB and triggers the same admin notification
    // path, without introducing a second, separate contact-form backend.
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone || "9999999999",
        email: form.email,
        serviceCategory: "General Enquiry",
        serviceName: "Contact Form Enquiry",
        message: form.message,
      }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#fffaf3" }}>
      <section style={{ padding: "64px 5% 40px", background: "linear-gradient(135deg,#fdf0e4 0%,#fbe4ee 45%,#eaeafc 100%)", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4145a", marginBottom: "12px" }}>Get In Touch</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,2.8rem)", color: "#2a1d12", marginBottom: "16px" }}>
            Let&apos;s Talk About Your <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#e8a33d" }}>Celebration</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#6b5c4d", maxWidth: "560px", margin: "0 auto" }}>
            Whether you have a question about a service, need help choosing a package, or want to discuss a custom event, our team is here to help across every city EventSaaga serves.
          </p>
        </Reveal>
      </section>

      <section style={{ padding: "56px 5% 80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "40px" }} className="contact-grid">
          <Reveal type="slide-right">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z", title: "Call Us", value: "+91 98765 43210", href: "tel:9876543210" },
                { icon: "M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0l8 7 8-7", title: "Email Us", value: "bookings@eventsaaga.com", href: "mailto:bookings@eventsaaga.com" },
                { icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967", title: "WhatsApp", value: "Chat with our team", href: "https://wa.me/919876543210" },
                { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z", title: "Coverage", value: "20+ cities across India", href: undefined },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "#fff", borderRadius: "16px", padding: "18px 20px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fdf0e4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4145a" strokeWidth="2"><path d={c.icon}/></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1d12", margin: "0 0 3px" }}>{c.title}</p>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#6b5c4d", textDecoration: "none" }}>{c.value}</a>
                    ) : (
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#6b5c4d", margin: 0 }}>{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal type="slide-left">
            <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "30px 0" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg,#e8a33d,#d4145a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#2a1d12", marginBottom: "8px" }}>Message Sent</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68" }}>Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.2rem", color: "#2a1d12", marginBottom: "4px" }}>Send Us a Message</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <input required value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your name"
                      style={{ padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
                    <input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="Phone number"
                      style={{ padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <input required type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="Email address"
                    style={{ padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
                  <textarea required rows={4} value={form.message} onChange={e => update("message", e.target.value)} placeholder="How can we help?"
                    style={{ padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                  <button type="submit" disabled={loading}
                    style={{ padding: "13px", background: loading ? "#d1d5db" : "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loading ? "default" : "pointer" }}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`@media(max-width:800px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
