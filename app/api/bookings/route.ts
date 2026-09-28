import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/lib/models/Booking";
import { generateBookingId } from "@/lib/models/Counter";
import { Notification } from "@/lib/models/Notification";
import { User } from "@/lib/models/User";
import { sendBookingEmails } from "@/lib/email";
import { getSession } from "@/lib/rbac";
import { apiErrorResponse } from "@/lib/apiError";

interface BookingPayload {
  name?: string;
  phone?: string;
  email?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  serviceCategory?: string;
  serviceName?: string;
  serviceSlug?: string;
  guestCount?: string;
  budget?: string;
  message?: string;
}

const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian 10-digit mobile numbers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: BookingPayload): string[] {
  const errors: string[] = [];

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push("Please enter a valid name.");
  }
  if (!payload.phone || !PHONE_REGEX.test(payload.phone.trim())) {
    errors.push("Please enter a valid 10-digit Indian mobile number.");
  }
  if (payload.email && !EMAIL_REGEX.test(payload.email.trim())) {
    errors.push("Please enter a valid email address.");
  }
  if (!payload.serviceName || !payload.serviceCategory) {
    errors.push("Missing service information.");
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: ["Invalid request body."] }, { status: 400 });
  }

  const errors = validate(payload);
  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json({
      success: true,
      persisted: false,
      emailSent: false,
      bookingId: undefined,
      message: "Thank you! We've received your enquiry and will contact you within 30 minutes.",
    });
  }

  // Attach the logged-in customer, if any — booking still works for guests.
  const session = await getSession();
  const customerId = session?.user?.role === "CUSTOMER" ? session.user.id : undefined;

  const bookingId = await generateBookingId();

  const bookingData = {
    bookingId,
    customerId,
    name: payload.name!.trim(),
    phone: payload.phone!.trim(),
    email: payload.email?.trim(),
    eventDate: payload.eventDate?.trim(),
    eventTime: payload.eventTime?.trim(),
    location: payload.location?.trim(),
    serviceCategory: payload.serviceCategory!.trim(),
    serviceName: payload.serviceName!.trim(),
    serviceSlug: payload.serviceSlug?.trim(),
    guestCount: payload.guestCount?.trim(),
    budget: payload.budget?.trim(),
    message: payload.message?.trim(),
    status: "NEW" as const,
    source: "website",
  };

  let persisted = false;

  try {
    await Booking.create(bookingData);
    persisted = true;

    // Notify the customer (if logged in) and the Super Admin.
    const notifs: Promise<unknown>[] = [];
    if (customerId) {
      notifs.push(
        Notification.create({
          userId: customerId,
          audience: "CUSTOMER",
          title: "Booking Submitted",
          message: `Your booking ${bookingId} for ${bookingData.serviceName} has been received.`,
          link: `/customer/bookings/${bookingId}`,
          bookingId,
        })
      );
    }
    const admin = await User.findOne({ role: "SUPER_ADMIN" });
    if (admin) {
      notifs.push(
        Notification.create({
          userId: admin._id,
          audience: "SUPER_ADMIN",
          title: "New Booking",
          message: `New booking ${bookingId}: ${bookingData.serviceName} in ${bookingData.location || "unspecified location"}.`,
          link: `/admin/bookings?search=${bookingId}`,
          bookingId,
        })
      );
    }
    await Promise.allSettled(notifs);
  } catch (err) {
    console.error("[api/bookings] Failed to persist booking:", err);
  }

  let emailResult = { sent: false };
  try {
    emailResult = await sendBookingEmails(bookingData);
  } catch (err) {
    console.error("[api/bookings] Failed to send booking emails:", err);
  }

  return NextResponse.json({
    success: true,
    persisted,
    emailSent: emailResult.sent,
    bookingId,
    message: `Thank you! Your booking reference is ${bookingId}. We'll contact you within 30 minutes.`,
  });
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function GET() {
  try {
  return NextResponse.json(
    { success: false, message: "Method not allowed. Use POST to submit a booking." },
    { status: 405 }
  );
  } catch (err) {
    return apiErrorResponse(err);
  }
}
