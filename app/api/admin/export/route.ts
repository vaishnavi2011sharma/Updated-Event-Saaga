import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { User } from "@/lib/models/User";
import { requireRole, UnauthorizedError } from "@/lib/rbac";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const location = searchParams.get("location");
    const format = searchParams.get("format") === "csv" ? "csv" : "xlsx";

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (location) query.location = location;

    const bookings = await Booking.find(query).sort({ createdAt: -1 }).lean();
    const vendorIds = [...new Set(bookings.map(b => b.assignedVendorId?.toString()).filter(Boolean))];
    const vendors = await User.find({ _id: { $in: vendorIds } }).select("name businessName").lean();
    const vendorMap = new Map(vendors.map(v => [String(v._id), v.businessName || v.name]));

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "EventSaaga";
    const sheet = workbook.addWorksheet("Bookings");

    sheet.columns = [
      { header: "Booking ID", key: "bookingId", width: 14 },
      { header: "Customer Name", key: "name", width: 22 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Email", key: "email", width: 26 },
      { header: "Service", key: "serviceName", width: 28 },
      { header: "Category", key: "serviceCategory", width: 22 },
      { header: "Location", key: "location", width: 16 },
      { header: "Event Date", key: "eventDate", width: 14 },
      { header: "Event Time", key: "eventTime", width: 12 },
      { header: "Guest Count", key: "guestCount", width: 12 },
      { header: "Budget", key: "budget", width: 14 },
      { header: "Requirements", key: "message", width: 34 },
      { header: "Assigned Vendor", key: "vendor", width: 22 },
      { header: "Status", key: "status", width: 14 },
      { header: "Created Date", key: "createdAt", width: 18 },
    ];
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8A33D" } };

    bookings.forEach(b => {
      sheet.addRow({
        bookingId: b.bookingId,
        name: b.name,
        phone: b.phone,
        email: b.email || "",
        serviceName: b.serviceName,
        serviceCategory: b.serviceCategory,
        location: b.location || "",
        eventDate: b.eventDate || "",
        eventTime: b.eventTime || "",
        guestCount: b.guestCount || "",
        budget: b.budget || "",
        message: b.message || "",
        vendor: b.assignedVendorId ? vendorMap.get(b.assignedVendorId.toString()) || "Assigned" : "",
        status: b.status,
        createdAt: new Date(b.createdAt).toLocaleString("en-IN"),
      });
    });

    if (format === "csv") {
      const buffer = await workbook.csv.writeBuffer();
      return new NextResponse(buffer as unknown as BodyInit, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="eventsaaga-bookings-${Date.now()}.csv"`,
        },
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="eventsaaga-bookings-${Date.now()}.xlsx"`,
      },
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/admin/export] error:", err);
    return NextResponse.json({ success: false, message: "Export failed." }, { status: 500 });
  }
}
