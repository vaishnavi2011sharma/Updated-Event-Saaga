"use client";
import { useEffect, useState } from "react";

interface UserProfile {
  name: string; email: string; phone?: string;
  businessName?: string; experience?: string; availability?: string; businessInfo?: string;
}

export default function ProfilePanel({ isVendor = false, accentColor = "#d4145a" }: { isVendor?: boolean; accentColor?: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then(r => r.json())
      .then(d => { if (d.success) setProfile(d.user); })
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setSaveMsg(null);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    setSaving(false);
    setSaveMsg(data.success ? "Profile updated." : data.errors?.[0] || "Something went wrong.");
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (pwForm.newPassword !== pwForm.confirm) {
      setPwMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    setPwSaving(true);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
    });
    const data = await res.json();
    setPwSaving(false);
    if (data.success) {
      setPwMsg({ type: "success", text: "Password updated successfully." });
      setPwForm({ currentPassword: "", newPassword: "", confirm: "" });
    } else {
      setPwMsg({ type: "error", text: data.errors?.[0] || "Something went wrong." });
    }
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 13px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "#4b5563", marginBottom: "6px" };

  if (loading) return <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading profile...</p>;
  if (!profile) return <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#dc2626" }}>Could not load your profile.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "560px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#2a1d12", marginBottom: "16px" }}>Profile</h2>
        <form onSubmit={saveProfile} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email (cannot be changed)</label>
            <input value={profile.email} disabled style={{ ...inputStyle, background: "#f9fafb", color: "#9ca3af" }} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input value={profile.phone || ""} onChange={e => setProfile({ ...profile, phone: e.target.value })} style={inputStyle} />
          </div>

          {isVendor && (
            <>
              <div>
                <label style={labelStyle}>Business Name</label>
                <input value={profile.businessName || ""} onChange={e => setProfile({ ...profile, businessName: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Experience</label>
                <input value={profile.experience || ""} onChange={e => setProfile({ ...profile, experience: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Availability</label>
                <input value={profile.availability || ""} onChange={e => setProfile({ ...profile, availability: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>About Your Business</label>
                <textarea rows={3} value={profile.businessInfo || ""} onChange={e => setProfile({ ...profile, businessInfo: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </>
          )}

          {saveMsg && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: saveMsg.includes("updated") ? "#16a34a" : "#dc2626" }}>{saveMsg}</p>}

          <button type="submit" disabled={saving}
            style={{ padding: "11px", background: saving ? "#d1d5db" : `linear-gradient(135deg,${accentColor},${accentColor}cc)`, color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: saving ? "default" : "pointer" }}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#2a1d12", marginBottom: "16px" }}>Change Password</h2>
        <form onSubmit={changePassword} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Current Password</label>
            <input type="password" required value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>New Password</label>
            <input type="password" required value={pwForm.newPassword} onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Confirm New Password</label>
            <input type="password" required value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} style={inputStyle} />
          </div>
          {pwMsg && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: pwMsg.type === "success" ? "#16a34a" : "#dc2626" }}>{pwMsg.text}</p>}
          <button type="submit" disabled={pwSaving}
            style={{ padding: "11px", background: pwSaving ? "#d1d5db" : "#3a2a1a", color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: pwSaving ? "default" : "pointer" }}>
            {pwSaving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
