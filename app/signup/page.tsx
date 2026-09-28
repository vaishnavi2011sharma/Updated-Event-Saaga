"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let data: { success?: boolean; errors?: string[] } = {};
    try {
      data = await res.json();
    } catch {
      setErrors(["We couldn't reach the server. Please check your connection and try again."]);
      setLoading(false);
      return;
    }

    if (!res.ok || !data.success) {
      setErrors(data.errors || ["Something went wrong. Please try again."]);
      setLoading(false);
      return;
    }

    // Auto sign-in right after successful registration.
    const result = await signIn("credentials", { identifier: form.email, password: form.password, redirect: false });
    setLoading(false);
    if (result && !result.error) {
      router.push("/customer/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fdf0e4 0%,#fbe4ee 45%,#eaeafc 100%)", padding: "60px 5%" }}>
      <div style={{ width: "min(440px,100%)", background: "#fff", borderRadius: "24px", padding: "40px 36px", boxShadow: "0 24px 70px rgba(0,0,0,0.12)" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4145a", marginBottom: "8px" }}>Join EventSaaga</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", margin: 0 }}>Create Your Account</h1>
        </div>

        {errors.length > 0 && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", marginBottom: "18px" }}>
            {errors.map((err, i) => <p key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#dc2626", margin: i === 0 ? 0 : "4px 0 0" }}>{err}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
            { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { key: "phone", label: "Mobile Number", type: "tel", placeholder: "98765 43210" },
            { key: "password", label: "Password", type: "password", placeholder: "At least 8 characters" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#4b5563", marginBottom: "6px" }}>{f.label}</label>
              <input required type={f.type} value={form[f.key as keyof typeof form]} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder}
                style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}

          <button type="submit" disabled={loading}
            style={{ padding: "13px", background: loading ? "#d1d5db" : "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loading ? "default" : "pointer", boxShadow: loading ? "none" : "0 8px 22px rgba(212,20,90,0.28)" }}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "22px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#6b7280" }}>Already have an account?</span>
          <Link href="/login" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#d4145a", textDecoration: "none" }}>Log In</Link>
        </div>
      </div>
    </div>
  );
}
