"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type LoginAs = "CUSTOMER" | "VENDOR" | "SUPER_ADMIN";

const ROLE_OPTIONS: { value: LoginAs; label: string }[] = [
  { value: "CUSTOMER", label: "User / Customer" },
  { value: "VENDOR", label: "Vendor" },
  { value: "SUPER_ADMIN", label: "Admin" },
];

const ROLE_REDIRECT: Record<LoginAs, string> = {
  CUSTOMER: "/customer/dashboard",
  VENDOR: "/vendor/dashboard",
  SUPER_ADMIN: "/admin/dashboard",
};

export default function LoginPage() {
  const router = useRouter();
  const [loginAs, setLoginAs] = useState<LoginAs>("CUSTOMER");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      setLoading(false);
      setError("Invalid email/phone or password.");
      return;
    }

    // Fetch the freshly-issued session so we route based on the REAL, DB-sourced
    // role — not the "Login As" dropdown the person happened to have selected.
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const actualRole: LoginAs | undefined = session?.user?.role;

    setLoading(false);

    if (!actualRole) {
      setError("Could not verify your account role. Please try again.");
      return;
    }

    if (actualRole !== loginAs) {
      setError(
        `This account is registered as ${ROLE_OPTIONS.find(r => r.value === actualRole)?.label ?? actualRole.toLowerCase()}, not ${ROLE_OPTIONS.find(r => r.value === loginAs)?.label}. Redirecting you to the correct area…`
      );
      setTimeout(() => router.push(ROLE_REDIRECT[actualRole]), 1600);
      return;
    }

    if (actualRole === "VENDOR" && session.user.vendorStatus !== "APPROVED") {
      router.push("/vendor/pending");
      return;
    }

    router.push(ROLE_REDIRECT[actualRole]);
  };

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fdf0e4 0%,#fbe4ee 45%,#eaeafc 100%)", padding: "60px 5%" }}>
      <div style={{ width: "min(440px,100%)", background: "#fff", borderRadius: "24px", padding: "40px 36px", boxShadow: "0 24px 70px rgba(0,0,0,0.12)" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4145a", marginBottom: "8px" }}>Welcome Back</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", margin: 0 }}>Sign In To EventSaaga</h1>
        </div>

        <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#4b5563", marginBottom: "8px" }}>Login As</label>
        <div style={{ display: "flex", gap: "8px", marginBottom: "22px" }}>
          {ROLE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setLoginAs(opt.value)}
              style={{
                flex: 1, padding: "10px 8px", borderRadius: "10px",
                border: `1.5px solid ${loginAs === opt.value ? "#d4145a" : "#e5e7eb"}`,
                background: loginAs === opt.value ? "#fdf0e4" : "#fff",
                color: loginAs === opt.value ? "#d4145a" : "#6b7280",
                fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.76rem", cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", marginBottom: "18px" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#dc2626", margin: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#4b5563", marginBottom: "6px" }}>Email / Phone</label>
            <input required value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="you@example.com"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#4b5563", marginBottom: "6px" }}>Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ textAlign: "right" }}>
            <Link href="/forgot-password" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#d4145a", textDecoration: "none" }}>Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading}
            style={{ padding: "13px", background: loading ? "#d1d5db" : "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loading ? "default" : "pointer", boxShadow: loading ? "none" : "0 8px 22px rgba(212,20,90,0.28)" }}>
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        {googleButtonNote()}

        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "22px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#6b7280" }}>New to EventSaaga?</span>
          <Link href="/signup" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#d4145a", textDecoration: "none" }}>Create an Account</Link>
        </div>
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Link href="/vendor/register" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#8a7a68", textDecoration: "none" }}>Register as a Vendor →</Link>
        </div>
      </div>
    </div>
  );
}

function googleButtonNote() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/customer/dashboard" })}
      style={{ width: "100%", marginTop: "14px", padding: "12px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#3a2a1a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Continue with Google
    </button>
  );
}
