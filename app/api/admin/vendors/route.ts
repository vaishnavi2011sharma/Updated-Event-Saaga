import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { Notification } from "@/lib/models/Notification";
import { requireRole, UnauthorizedError } from "@/lib/rbac";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const query: Record<string, unknown> = { role: "VENDOR" };
    if (status) query.vendorStatus = status;

    const vendors = await User.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, vendors });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/vendors GET] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}

const UpdateSchema = z.object({
  vendorId: z.string(),
  vendorStatus: z.enum(["PENDING_APPROVAL", "APPROVED", "REJECTED", "SUSPENDED"]),
});

export async function PATCH(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();

    const body = await request.json();
    const parsed = UpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.issues.map(i => i.message) }, { status: 400 });
    }

    const vendor = await User.findOneAndUpdate(
      { _id: parsed.data.vendorId, role: "VENDOR" },
      { vendorStatus: parsed.data.vendorStatus },
      { new: true }
    );

    if (!vendor) {
      return NextResponse.json({ success: false, message: "Vendor not found." }, { status: 404 });
    }

    await Notification.create({
      userId: vendor._id,
      audience: "VENDOR",
      title: parsed.data.vendorStatus === "APPROVED" ? "Account Approved" : `Account ${parsed.data.vendorStatus.replace("_", " ").toLowerCase()}`,
      message:
        parsed.data.vendorStatus === "APPROVED"
          ? "Your vendor account has been approved. You can now access your dashboard."
          : `Your vendor account status is now ${parsed.data.vendorStatus}.`,
      link: "/vendor/dashboard",
    });

    return NextResponse.json({ success: true, vendor });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/vendors PATCH] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
