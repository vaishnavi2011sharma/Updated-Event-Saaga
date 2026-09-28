import { redirect } from "next/navigation";
import { getSession } from "@/lib/rbac";
import CustomerDashboardClient from "@/components/dashboard/CustomerDashboardClient";

export default async function CustomerDashboardPage() {
  const session = await getSession();
  if (!session?.user || session.user.role !== "CUSTOMER") {
    redirect("/login");
  }
  return <CustomerDashboardClient userName={session.user.name || "there"} />;
}
