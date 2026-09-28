import { redirect } from "next/navigation";
import { getSession } from "@/lib/rbac";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import VendorDashboardClient from "@/components/dashboard/VendorDashboardClient";

export default async function VendorDashboardPage() {
  const session = await getSession();
  if (!session?.user || session.user.role !== "VENDOR") {
    redirect("/login");
  }
  if (session.user.vendorStatus !== "APPROVED") {
    redirect("/vendor/pending");
  }

  await connectToDatabase();
  const vendor = await User.findById(session.user.id).select("businessName").lean<{ businessName?: string }>();

  return <VendorDashboardClient userName={session.user.name || "there"} businessName={vendor?.businessName} />;
}
