import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { Notification } from "@/lib/models/Notification";
import { withApiErrorHandling } from "@/lib/apiError";

const VendorRegisterSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  businessName: z.string().trim().min(2, "Please enter your business name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  serviceCategories: z.array(z.string()).min(1, "Select at least one service category"),
  vendorLocations: z.array(z.string()).min(1, "Select at least one location you operate in"),
  experience: z.string().optional(),
  availability: z.string().optional(),
  businessInfo: z.string().optional(),
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: ["Invalid request body."] }, { status: 400 });
  }

  const parsed = VendorRegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.issues.map(i => i.message) },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const normalizedEmail = data.email.toLowerCase();

  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json(
      { success: false, errors: ["Database is not configured yet. Set MONGODB_URI in .env to enable accounts."] },
      { status: 503 }
    );
  }

  const existing = await User.findOne({ $or: [{ email: normalizedEmail }, { phone: data.phone }] });
  if (existing) {
    return NextResponse.json(
      { success: false, errors: ["An account with this email or phone number already exists."] },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const vendor = await User.create({
    name: data.name,
    businessName: data.businessName,
    email: normalizedEmail,
    phone: data.phone,
    passwordHash,
    role: "VENDOR",
    vendorStatus: "PENDING_APPROVAL",
    serviceCategories: data.serviceCategories,
    vendorLocations: data.vendorLocations,
    experience: data.experience,
    availability: data.availability,
    businessInfo: data.businessInfo,
  });

  // Notify the Super Admin that a new vendor needs review.
  const admin = await User.findOne({ role: "SUPER_ADMIN" });
  if (admin) {
    await Notification.create({
      userId: admin._id,
      audience: "SUPER_ADMIN",
      title: "New Vendor Registration",
      message: `${data.businessName} (${data.name}) has registered and is awaiting approval.`,
      link: "/admin/vendors",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Registration received. Your account is pending Super Admin approval — we'll notify you once it's reviewed.",
    userId: vendor._id.toString(),
  });
});
