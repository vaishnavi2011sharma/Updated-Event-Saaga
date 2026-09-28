import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { PasswordResetToken, generateResetToken } from "@/lib/models/PasswordResetToken";
import nodemailer from "nodemailer";
import { apiErrorResponse } from "@/lib/apiError";

function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.SMTP_HOST !== "smtp.your-provider.com");
}

export async function POST(request: NextRequest) {
  try {
  const { email } = await request.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ success: false, errors: ["Please enter your email address."] }, { status: 400 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email: email.trim().toLowerCase() });

  // Always return a generic success message — never reveal whether an email
  // exists in the system (prevents account enumeration).
  const genericResponse = NextResponse.json({
    success: true,
    message: "If an account exists for that email, we've sent a password reset link.",
  });

  if (!user) return genericResponse;

  const token = generateResetToken();
  await PasswordResetToken.create({
    userId: user._id,
    token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reset-password?token=${token}`;

  if (isEmailConfigured()) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "EventSaaga <no-reply@eventsaaga.com>",
        to: user.email,
        subject: "Reset your EventSaaga password",
        html: `<p>Click the link below to reset your password. This link expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      });
    } catch (err) {
      console.error("[forgot-password] Failed to send reset email:", err);
    }
  } else {
    console.warn(`[forgot-password] SMTP not configured — reset link for ${user.email}: ${resetUrl}`);
  }

  return genericResponse;
  } catch (err) {
    return apiErrorResponse(err);
  }
}
