import nodemailer from "nodemailer";

// Plain structural type — decoupled from the Mongoose IBooking document type so
// callers can pass either a freshly-built plain object (pre-save) or a saved
// document without fighting ObjectId-vs-string typing.
export interface BookingEmailData {
  name?: string;
  phone?: string;
  email?: string;
  serviceName?: string;
  serviceCategory?: string;
  location?: string;
  eventDate?: string;
  guestCount?: string;
  message?: string;
}

function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.SMTP_HOST !== "smtp.your-provider.com"
  );
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

function adminNotificationHtml(booking: BookingEmailData): string {
  return `
    <div style="font-family:'DM Sans',Arial,sans-serif;max-width:560px;margin:0 auto;border:1px solid #f0f0f0;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#7c3aed,#4c1d95);padding:22px 28px;">
        <h2 style="color:#fff;margin:0;font-size:1.1rem;">New EventSaaga Booking Lead</h2>
      </div>
      <div style="padding:24px 28px;">
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem;color:#374151;">
          <tr><td style="padding:6px 0;color:#9ca3af;">Name</td><td style="padding:6px 0;font-weight:600;">${booking.name || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;">Phone</td><td style="padding:6px 0;font-weight:600;">${booking.phone || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;">Email</td><td style="padding:6px 0;">${booking.email || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;">Service</td><td style="padding:6px 0;font-weight:600;">${booking.serviceName || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;">Category</td><td style="padding:6px 0;">${booking.serviceCategory || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;">Location</td><td style="padding:6px 0;">${booking.location || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;">Event Date</td><td style="padding:6px 0;">${booking.eventDate || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;">Guests</td><td style="padding:6px 0;">${booking.guestCount || "-"}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af;vertical-align:top;">Message</td><td style="padding:6px 0;">${booking.message || "-"}</td></tr>
        </table>
      </div>
    </div>
  `;
}

function customerConfirmationHtml(booking: BookingEmailData): string {
  return `
    <div style="font-family:'DM Sans',Arial,sans-serif;max-width:560px;margin:0 auto;border:1px solid #f0f0f0;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#7c3aed,#4c1d95);padding:26px 28px;">
        <h2 style="color:#fff;margin:0;font-size:1.15rem;">Thank you, ${booking.name}!</h2>
      </div>
      <div style="padding:24px 28px;">
        <p style="font-size:0.92rem;color:#374151;line-height:1.7;">
          We've received your enquiry for <strong>${booking.serviceName}</strong>${booking.location ? ` in <strong>${booking.location}</strong>` : ""}.
          Our team will call you at <strong>${booking.phone}</strong> within 30 minutes to confirm the details.
        </p>
        <p style="font-size:0.85rem;color:#9ca3af;margin-top:20px;">— Team EventSaaga</p>
      </div>
    </div>
  `;
}

/**
 * Sends the admin notification + customer confirmation emails for a new booking.
 * No-ops (with a console warning) when SMTP env vars aren't configured yet,
 * so booking submissions still succeed and persist to MongoDB during development.
 */
export async function sendBookingEmails(booking: BookingEmailData): Promise<{ sent: boolean }> {
  if (!isEmailConfigured()) {
    console.warn(
      "[email] SMTP is not configured. Skipping email send — set SMTP_HOST/SMTP_USER/SMTP_PASSWORD in .env to enable."
    );
    return { sent: false };
  }

  const transporter = getTransporter();
  const from = process.env.EMAIL_FROM || "EventSaaga <no-reply@eventsaaga.com>";
  const adminTo = process.env.ADMIN_NOTIFICATION_EMAIL;

  const sends: Promise<unknown>[] = [];

  if (adminTo) {
    sends.push(
      transporter.sendMail({
        from,
        to: adminTo,
        subject: `New Lead: ${booking.serviceName} — ${booking.name}`,
        html: adminNotificationHtml(booking),
      })
    );
  }

  if (booking.email) {
    sends.push(
      transporter.sendMail({
        from,
        to: booking.email,
        subject: `We've received your EventSaaga booking request`,
        html: customerConfirmationHtml(booking),
      })
    );
  }

  await Promise.allSettled(sends);
  return { sent: true };
}
