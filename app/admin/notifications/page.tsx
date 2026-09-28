import NotificationsPanel from "@/components/dashboard/NotificationsPanel";

export default function AdminNotificationsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", marginBottom: "20px" }}>Notifications</h1>
      <NotificationsPanel accentColor="#d4145a" />
    </div>
  );
}
