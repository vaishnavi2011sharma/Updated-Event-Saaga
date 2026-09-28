import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { Review } from "@/lib/models/Review";
import { requireRole, UnauthorizedError } from "@/lib/rbac";
import { apiErrorResponse } from "@/lib/apiError";

export async function GET(request: NextRequest) {
  try {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const serviceSlug = searchParams.get("serviceSlug");
  const all = searchParams.get("all");

  if (all === "true") {
    // Admin-only: full moderation list, most recent first.
    try {
      await requireRole(["SUPER_ADMIN"]);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return NextResponse.json({ success: false, message: err.message }, { status: err.status });
      }
      throw err;
    }
    const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(300).lean();
    return NextResponse.json({ success: true, reviews });
  }

  const query = serviceSlug ? { serviceCategory: serviceSlug } : {};
  const reviews = await Review.find(query).sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ success: true, reviews });
  } catch (err) {
    return apiErrorResponse(err);
  }
}

const ReviewSchema = z.object({
  bookingId: z.string(),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().trim().min(5, "Please write a short review.").max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const session = await requireRole(["CUSTOMER"]);
    await connectToDatabase();

    const body = await request.json();
    const parsed = ReviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.issues.map(i => i.message) }, { status: 400 });
    }

    const booking = await Booking.findOne({ bookingId: parsed.data.bookingId });
    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found." }, { status: 404 });
    }
    // Ownership + business rule: only the booking's own customer, and only once completed.
    if (!booking.customerId || booking.customerId.toString() !== session.user.id) {
      return NextResponse.json({ success: false, message: "You can only review your own bookings." }, { status: 403 });
    }
    if (booking.status !== "COMPLETED") {
      return NextResponse.json({ success: false, message: "You can only review completed bookings." }, { status: 400 });
    }

    const existing = await Review.findOne({ bookingId: booking.bookingId });
    if (existing) {
      return NextResponse.json({ success: false, message: "You've already reviewed this booking." }, { status: 409 });
    }

    const review = await Review.create({
      bookingId: booking.bookingId,
      customerId: session.user.id,
      serviceName: booking.serviceName,
      serviceCategory: booking.serviceCategory,
      rating: parsed.data.rating,
      reviewText: parsed.data.reviewText,
    });

    return NextResponse.json({ success: true, review });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/reviews POST] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    await connectToDatabase();

    const { reviewId } = await request.json();
    if (!reviewId) {
      return NextResponse.json({ success: false, message: "Missing reviewId." }, { status: 400 });
    }

    const deleted = await Review.findByIdAndDelete(reviewId);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Review not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/reviews DELETE] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
