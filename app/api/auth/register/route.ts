import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { withApiErrorHandling } from "@/lib/apiError";

const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: ["Invalid request body."] }, { status: 400 });
  }

  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.issues.map(i => i.message) },
      { status: 400 }
    );
  }

  const { name, email, phone, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json(
      { success: false, errors: ["Database is not configured yet. Set MONGODB_URI in .env to enable accounts."] },
      { status: 503 }
    );
  }

  const existing = await User.findOne({ $or: [{ email: normalizedEmail }, { phone }] });
  if (existing) {
    return NextResponse.json(
      { success: false, errors: ["An account with this email or phone number already exists."] },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail,
    phone,
    passwordHash,
    role: "CUSTOMER",
  });

  return NextResponse.json({
    success: true,
    message: "Account created. You can now log in.",
    userId: user._id.toString(),
  });
});
