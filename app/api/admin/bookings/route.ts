import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { Notification } from "@/lib/models/Notification";
import { User } from "@/lib/models/User";
import { requireRole, UnauthorizedError } from "@/lib/rbac";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const location = searchParams.get("location");
    const service = searchParams.get("service");
    const vendor = searchParams.get("vendor");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (location) query.location = location;
    if (service) query.serviceCategory = service;
    if (vendor) query.assignedVendorId = vendor;
    if (search) {
      query.$or = [
        { bookingId: new RegExp(search, "i") },
        { name: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 }).limit(500).lean();

    return NextResponse.json({ success: true, bookings });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/bookings GET] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}

const UpdateSchema = z.object({
  bookingId: z.string(),
  status: z.enum(["NEW", "PENDING", "CONFIRMED", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  assignedVendorId: z.string().nullable().optional(),
  adminNotes: z.string().optional(),
  vendorInstructions: z.string().optional(),
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

    const { bookingId, ...updates } = parsed.data;
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found." }, { status: 404 });
    }

    const vendorChanged = "assignedVendorId" in updates && updates.assignedVendorId !== String(booking.assignedVendorId ?? "");

    Object.assign(booking, updates);
    // Assigning a vendor auto-advances status unless the admin explicitly set one.
    if (vendorChanged && updates.assignedVendorId && !updates.status) {
      booking.status = "ASSIGNED";
    }
    await booking.save();

    // Notify customer of status change, and vendor of new/changed assignment.
    const notifs: Promise<unknown>[] = [];
    if (booking.customerId && updates.status) {
      notifs.push(
        Notification.create({
          userId: booking.customerId,
          audience: "CUSTOMER",
          title: "Booking Status Updated",
          message: `Your booking ${booking.bookingId} is now ${updates.status}.`,
          link: `/customer/bookings/${booking.bookingId}`,
          bookingId: booking.bookingId,
        })
      );
    }
    if (vendorChanged && updates.assignedVendorId) {
      notifs.push(
        Notification.create({
          userId: updates.assignedVendorId,
          audience: "VENDOR",
          title: "New Assignment",
          message: `You've been assigned booking ${booking.bookingId}: ${booking.serviceName}.`,
          link: `/vendor/dashboard`,
          bookingId: booking.bookingId,
        })
      );
    }
    await Promise.allSettled(notifs);

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/bookings PATCH] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}

// Exposed for the vendor-assignment picker UI (admin-only): list approved vendors.
export async function POST(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();
    const { serviceCategory, location } = await request.json();

    const query: Record<string, unknown> = { role: "VENDOR", vendorStatus: "APPROVED" };
    if (serviceCategory) query.serviceCategories = serviceCategory;
    if (location) query.vendorLocations = location;

    const vendors = await User.find(query).select("name businessName phone email serviceCategories vendorLocations").lean();
    return NextResponse.json({ success: true, vendors });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/bookings POST/vendor-match] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
