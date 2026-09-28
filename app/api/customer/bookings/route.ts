import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { requireRole, UnauthorizedError } from "@/lib/rbac";

export async function GET() {
  try {
    const session = await requireRole(["CUSTOMER"]);
    await connectToDatabase();

    // Ownership is enforced by the query itself — a customer can only ever
    // receive bookings where customerId === their own session id.
    const bookings = await Booking.find({ customerId: session.user.id }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, bookings });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/customer/bookings] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
