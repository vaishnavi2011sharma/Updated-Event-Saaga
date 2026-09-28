import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { Booking } from "@/lib/models/Booking";
import { requireRole, UnauthorizedError } from "@/lib/rbac";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const customerId = searchParams.get("customerId");

    if (customerId) {
      // Single customer profile + their booking history.
      const customer = await User.findOne({ _id: customerId, role: "CUSTOMER" })
        .select("name email phone createdAt")
        .lean();
      if (!customer) {
        return NextResponse.json({ success: false, message: "Customer not found." }, { status: 404 });
      }
      const bookings = await Booking.find({ customerId }).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, customer, bookings });
    }

    const query: Record<string, unknown> = { role: "CUSTOMER" };
    if (search) {
      query.$or = [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }, { phone: new RegExp(search, "i") }];
    }
    const customers = await User.find(query).select("name email phone createdAt").sort({ createdAt: -1 }).limit(300).lean();

    // Booking count per customer (single aggregation, avoids N+1 queries).
    const counts = await Booking.aggregate([
      { $match: { customerId: { $exists: true } } },
      { $group: { _id: "$customerId", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map(c => [c._id.toString(), c.count]));

    const withCounts = customers.map(c => ({ ...c, bookingCount: countMap.get(String(c._id)) || 0 }));

    return NextResponse.json({ success: true, customers: withCounts });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/customers] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
