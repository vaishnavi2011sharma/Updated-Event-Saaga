"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok || !data.success) {
      setError(data.errors?.[0] || "Something went wrong.");
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
  };

  if (!token) {
    return <p style={{ fontFamily: "'DM Sans',sans-serif", textAlign: "center", color: "#dc2626" }}>Missing or invalid reset link. Please request a new one.</p>;
  }

  if (done) {
    return <p style={{ fontFamily: "'DM Sans',sans-serif", textAlign: "center", color: "#4a3d30" }}>Password updated! Redirecting you to login…</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "18px" }}>
      {error && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#dc2626" }}>{error}</p>}
      <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password"
        style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
      <input required type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm new password"
        style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
      <button type="submit" disabled={loading}
        style={{ padding: "13px", background: loading ? "#d1d5db" : "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loading ? "default" : "pointer" }}>
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fdf0e4 0%,#fbe4ee 45%,#eaeafc 100%)", padding: "60px 5%" }}>
      <div style={{ width: "min(420px,100%)", background: "#fff", borderRadius: "24px", padding: "40px 36px", boxShadow: "0 24px 70px rgba(0,0,0,0.12)" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.5rem", color: "#2a1d12", marginBottom: "10px", textAlign: "center" }}>Reset Password</h1>
        <Suspense fallback={<p style={{ textAlign: "center", fontFamily: "'DM Sans',sans-serif" }}>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/login" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#d4145a", textDecoration: "none" }}>← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
