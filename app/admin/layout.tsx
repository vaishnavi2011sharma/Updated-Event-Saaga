import { redirect } from "next/navigation";
import { getSession } from "@/lib/rbac";
import AdminShell from "@/components/dashboard/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/login");
  }
  return <AdminShell adminName={session.user.name || "Admin"}>{children}</AdminShell>;
}
