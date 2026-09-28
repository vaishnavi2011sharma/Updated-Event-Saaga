import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { Notification } from "@/lib/models/Notification";
import { requireApprovedVendor, assertOwnership, UnauthorizedError } from "@/lib/rbac";

export async function GET() {
  try {
    const session = await requireApprovedVendor();
    await connectToDatabase();

    // A vendor can only ever receive bookings assigned to their own id — enforced
    // by the query, not by the client. Customer PII beyond what's needed to do the
    // job (name/phone/location) is intentionally the only customer data exposed here;
    // email and full requirements remain admin-managed.
    const bookings = await Booking.find({ assignedVendorId: session.user.id })
      .select("bookingId name phone serviceName serviceCategory location eventDate eventTime guestCount message status vendorInstructions createdAt")
      .sort({ eventDate: 1 })
      .lean();

    return NextResponse.json({ success: true, bookings });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/vendor/assignments] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}

// Vendor may ONLY move a job through the permitted work states — never edit
// customer requirements, reassign themselves, or touch another vendor's job.
const VENDOR_PERMITTED_STATUSES = ["IN_PROGRESS", "COMPLETED"] as const;
const UpdateSchema = z.object({
  bookingId: z.string(),
  status: z.enum(VENDOR_PERMITTED_STATUSES),
});

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireApprovedVendor();
    await connectToDatabase();

    const body = await request.json();
    const parsed = UpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.issues.map(i => i.message) }, { status: 400 });
    }

    const booking = await Booking.findOne({ bookingId: parsed.data.bookingId });
    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found." }, { status: 404 });
    }

    // Ownership check: this booking must actually be assigned to this vendor.
    assertOwnership(session, booking.assignedVendorId?.toString());

    booking.status = parsed.data.status;
    await booking.save();

    if (booking.customerId) {
      await Notification.create({
        userId: booking.customerId,
        audience: "CUSTOMER",
        title: "Booking Status Updated",
        message: `Your booking ${booking.bookingId} is now ${parsed.data.status}.`,
        link: `/customer/bookings/${booking.bookingId}`,
        bookingId: booking.bookingId,
      });
    }

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/vendor/assignments PATCH] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
