import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { User } from "@/lib/models/User";
import { requireRole, UnauthorizedError } from "@/lib/rbac";

export async function GET() {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();

    const [
      totalCustomers,
      totalVendors,
      pendingVendors,
      totalBookings,
      newBookings,
      pendingBookings,
      confirmedBookings,
      assignedBookings,
      inProgressBookings,
      completedBookings,
      cancelledBookings,
      recentBookings,
      recentVendors,
    ] = await Promise.all([
      User.countDocuments({ role: "CUSTOMER" }),
      User.countDocuments({ role: "VENDOR" }),
      User.countDocuments({ role: "VENDOR", vendorStatus: "PENDING_APPROVAL" }),
      Booking.countDocuments({}),
      Booking.countDocuments({ status: "NEW" }),
      Booking.countDocuments({ status: "PENDING" }),
      Booking.countDocuments({ status: "CONFIRMED" }),
      Booking.countDocuments({ status: "ASSIGNED" }),
      Booking.countDocuments({ status: "IN_PROGRESS" }),
      Booking.countDocuments({ status: "COMPLETED" }),
      Booking.countDocuments({ status: "CANCELLED" }),
      Booking.find({}).sort({ createdAt: -1 }).limit(6).lean(),
      User.find({ role: "VENDOR" }).sort({ createdAt: -1 }).limit(6).select("name businessName vendorStatus createdAt").lean(),
    ]);

    // Location-wise booking breakdown (top 8)
    const locationAgg = await Booking.aggregate([
      { $match: { location: { $exists: true, $ne: null } } },
      { $group: { _id: "$location", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    // Top services by booking count
    const serviceAgg = await Booking.aggregate([
      { $group: { _id: "$serviceCategory", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalCustomers, totalVendors, pendingVendors, totalBookings,
        newBookings, pendingBookings, confirmedBookings, assignedBookings,
        inProgressBookings, completedBookings, cancelledBookings,
      },
      recentBookings,
      recentVendors,
      locationBreakdown: locationAgg.map(l => ({ location: l._id, count: l.count })),
      topServices: serviceAgg.map(s => ({ category: s._id, count: s.count })),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/stats] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
