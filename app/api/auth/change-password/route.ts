import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { getSession } from "@/lib/rbac";
import { apiErrorResponse } from "@/lib/apiError";

export async function POST(request: NextRequest) {
  try {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ success: false, errors: ["Both current and new password are required."] }, { status: 400 });
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json({ success: false, errors: ["New password must be at least 8 characters."] }, { status: 400 });
  }

  await connectToDatabase();
  const user = await User.findById(session.user.id).select("+passwordHash");
  if (!user) {
    return NextResponse.json({ success: false, message: "Account not found." }, { status: 404 });
  }

  const valid = await user.comparePassword(currentPassword);
  if (!valid) {
    return NextResponse.json({ success: false, errors: ["Current password is incorrect."] }, { status: 400 });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
