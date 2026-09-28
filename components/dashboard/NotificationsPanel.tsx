"use client";
import { useEffect, useState } from "react";

interface Notif { _id: string; title: string; message: string; read: boolean; createdAt: string; }

export default function NotificationsPanel({ accentColor = "#d4145a" }: { accentColor?: string }) {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/notifications")
      .then(r => r.json())
      .then(d => { if (d.success) setNotifs(d.notifications || []); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markAllRead = async () => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAllRead: true }),
    });
    load();
  };

  const markOneRead = async (id: string) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId: id }),
    });
    load();
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  if (loading) return <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading notifications...</p>;

  return (
    <div style={{ maxWidth: "620px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#2a1d12", margin: 0 }}>Notifications</h2>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: accentColor, fontWeight: 600 }}>Mark all read ({unreadCount})</button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "36px", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68", margin: 0 }}>You&apos;re all caught up — no notifications yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {notifs.map(n => (
            <button key={n._id} onClick={() => !n.read && markOneRead(n._id)}
              style={{ textAlign: "left", padding: "14px 16px", background: n.read ? "#fff" : "#fdf0e4", border: "none", borderRadius: "12px", cursor: n.read ? "default" : "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: n.read ? 500 : 700, fontSize: "0.85rem", color: "#2a1d12", margin: "0 0 4px" }}>{n.title}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#8a7a68", margin: 0, lineHeight: 1.5 }}>{n.message}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
