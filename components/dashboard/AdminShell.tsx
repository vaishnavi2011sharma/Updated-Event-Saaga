"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Bookings", href: "/admin/bookings", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { label: "Customers", href: "/admin/customers", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m14-8a4 4 0 10-8 0" },
  { label: "Vendors", href: "/admin/vendors", icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
  { label: "Reviews", href: "/admin/reviews", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { label: "Notifications", href: "/admin/notifications", icon: "M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" },
];

export default function AdminShell({ adminName, children }: { adminName: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: "80vh", background: "#fffaf3", display: "flex" }}>
      {/* Sidebar — desktop */}
      <aside className="admin-sidebar" style={{ width: "230px", flexShrink: 0, background: "#fff", borderRight: "1px solid #f3e4d0", padding: "24px 14px", position: "sticky", top: "0", alignSelf: "flex-start", height: "100vh" }}>
        <div style={{ padding: "0 8px 20px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a89685", margin: 0 }}>Super Admin</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1rem", color: "#2a1d12", margin: "2px 0 0" }}>{adminName}</p>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {NAV.map(item => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", textDecoration: "none", background: active ? "#fdf0e4" : "transparent", color: active ? "#d4145a" : "#4a3d30" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={item.icon}/></svg>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.83rem" }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button onClick={() => signOut({ callbackUrl: "/" })} style={{ marginTop: "24px", width: "100%", padding: "10px 12px", background: "none", border: "1.5px solid #f0dfc8", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#3a2a1a", cursor: "pointer" }}>
          Logout
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="admin-mobile-bar" style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, zIndex: 90, background: "#fff", borderBottom: "1px solid #f3e4d0", padding: "12px 16px", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1rem", color: "#2a1d12", margin: 0 }}>Admin</p>
        <button onClick={() => setMobileOpen(o => !o)} style={{ width: "36px", height: "36px", border: "1.5px solid #f0dfc8", borderRadius: "8px", background: "#fff", cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2" style={{ margin: "0 auto" }}><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="admin-mobile-drawer" style={{ display: "none", position: "fixed", top: "56px", left: 0, right: 0, zIndex: 89, background: "#fff", borderBottom: "1px solid #f3e4d0", padding: "10px 16px" }}>
          {NAV.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "10px 0", borderBottom: "1px solid #f9f3ea", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#3a2a1a", textDecoration: "none" }}>{item.label}</Link>
          ))}
        </div>
      )}

      <main style={{ flex: 1, minWidth: 0, padding: "32px 28px" }} className="admin-main">
        {children}
      </main>

      <style>{`
        @media(max-width:900px){
          .admin-sidebar{display:none!important;}
          .admin-mobile-bar{display:flex!important;}
          .admin-mobile-drawer{display:block!important;}
          .admin-main{padding-top:76px!important;}
        }
      `}</style>
    </div>
  );
}
