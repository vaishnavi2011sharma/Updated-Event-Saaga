import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { PasswordResetToken } from "@/lib/models/PasswordResetToken";
import { apiErrorResponse } from "@/lib/apiError";

export async function POST(request: NextRequest) {
  try {
  const { token, password } = await request.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json({ success: false, errors: ["Invalid or missing reset token."] }, { status: 400 });
  }
  if (!password || typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ success: false, errors: ["Password must be at least 8 characters."] }, { status: 400 });
  }

  await connectToDatabase();

  const resetToken = await PasswordResetToken.findOne({ token });
  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    return NextResponse.json(
      { success: false, errors: ["This reset link is invalid or has expired. Please request a new one."] },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(resetToken.userId, { passwordHash });

  resetToken.used = true;
  await resetToken.save();

  return NextResponse.json({ success: true, message: "Password updated. You can now log in." });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
