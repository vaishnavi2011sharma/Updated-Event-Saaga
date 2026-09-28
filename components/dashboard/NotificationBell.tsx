"use client";
import { useEffect, useState, useRef } from "react";

interface Notif { _id: string; title: string; message: string; link?: string; read: boolean; createdAt: string; }

export default function NotificationBell({ accentColor = "#d4145a" }: { accentColor?: string }) {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const load = () => {
    fetch("/api/notifications")
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setNotifs(d.notifications || []);
          setUnread(d.unreadCount || 0);
        }
      });
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000); // light polling, no external push infra
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button aria-label="Notifications" onClick={() => setOpen(o => !o)} style={{ position: "relative", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #f0dfc8", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
        {unread > 0 && (
          <span style={{ position: "absolute", top: "-2px", right: "-2px", minWidth: "16px", height: "16px", borderRadius: "50%", background: accentColor, color: "white", fontSize: "0.6rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>{unread > 9 ? "9+" : unread}</span>
        )}
      </button>

      {open && (
        <div style={{ position: "absolute", right: 0, top: "46px", width: "320px", maxHeight: "420px", overflowY: "auto", background: "#fff", borderRadius: "16px", boxShadow: "0 16px 44px rgba(0,0,0,0.14)", border: "1px solid #f3e4d0", zIndex: 200 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "1px solid #f9f3ea" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1d12", margin: 0 }}>Notifications</p>
            {unread > 0 && <button onClick={markAllRead} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: accentColor, fontWeight: 600 }}>Mark all read</button>}
          </div>
          {notifs.length === 0 ? (
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#9ca3af", textAlign: "center", padding: "30px 16px" }}>You&apos;re all caught up.</p>
          ) : (
            notifs.map(n => (
              <button key={n._id} onClick={() => !n.read && markOneRead(n._id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", border: "none", borderBottom: "1px solid #f9f3ea", background: n.read ? "#fff" : "#fdf0e408", cursor: "pointer" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: n.read ? 500 : 700, fontSize: "0.8rem", color: "#2a1d12", margin: "0 0 3px" }}>{n.title}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", color: "#8a7a68", margin: 0, lineHeight: 1.4 }}>{n.message}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
