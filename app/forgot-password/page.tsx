"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setDone(true);
  };

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fdf0e4 0%,#fbe4ee 45%,#eaeafc 100%)", padding: "60px 5%" }}>
      <div style={{ width: "min(420px,100%)", background: "#fff", borderRadius: "24px", padding: "40px 36px", boxShadow: "0 24px 70px rgba(0,0,0,0.12)" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.5rem", color: "#2a1d12", marginBottom: "10px", textAlign: "center" }}>Forgot Password</h1>
        {done ? (
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#4a3d30", textAlign: "center", lineHeight: 1.7 }}>
            If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link. Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "18px" }}>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your account email"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
            <button type="submit" disabled={loading}
              style={{ padding: "13px", background: loading ? "#d1d5db" : "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loading ? "default" : "pointer" }}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/login" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#d4145a", textDecoration: "none" }}>← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
