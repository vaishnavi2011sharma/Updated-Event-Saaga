import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/rbac";

export default async function VendorPendingPage() {
  const session = await getSession();
  if (!session?.user || session.user.role !== "VENDOR") {
    redirect("/login");
  }
  if (session.user.vendorStatus === "APPROVED") {
    redirect("/vendor/dashboard");
  }

  const statusMessages: Record<string, { title: string; body: string }> = {
    PENDING_APPROVAL: {
      title: "Your Vendor Account Is Awaiting Approval",
      body: "Our team is reviewing your registration. You'll be notified as soon as your account is approved — usually within 1-2 business days.",
    },
    REJECTED: {
      title: "Your Vendor Application Was Not Approved",
      body: "Unfortunately your vendor registration wasn't approved at this time. Contact our support team if you believe this is a mistake.",
    },
    SUSPENDED: {
      title: "Your Vendor Account Is Suspended",
      body: "Your vendor account has been temporarily suspended. Please contact our support team for details.",
    },
  };

  const info = statusMessages[session.user.vendorStatus || "PENDING_APPROVAL"];

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 5%", textAlign: "center" }}>
      <div style={{ maxWidth: "480px" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fdf0e4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4145a" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#2a1d12", marginBottom: "14px" }}>{info.title}</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#6b5c4d", lineHeight: 1.7, marginBottom: "24px" }}>{info.body}</p>
        <Link href="/" style={{ padding: "10px 24px", background: "linear-gradient(135deg,#e8a33d,#d4145a)", color: "white", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>Back to Home</Link>
      </div>
    </div>
  );
}
