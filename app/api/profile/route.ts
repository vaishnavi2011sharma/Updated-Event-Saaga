import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { getSession } from "@/lib/rbac";
import { apiErrorResponse } from "@/lib/apiError";

export async function GET() {
  try {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
  }
  await connectToDatabase();
  const user = await User.findById(session.user.id).select("-passwordHash").lean();
  if (!user) {
    return NextResponse.json({ success: false, message: "Account not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true, user });
  } catch (err) {
    return apiErrorResponse(err);
  }
}

// Only a safe subset of fields is editable — role, email, vendorStatus etc. are
// intentionally excluded so a user can never elevate or approve themselves.
const ProfileUpdateSchema = z.object({
  name: z.string().trim().min(2).optional(),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/).optional(),
  businessName: z.string().trim().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  businessInfo: z.string().optional(),
  serviceCategories: z.array(z.string()).optional(),
  vendorLocations: z.array(z.string()).optional(),
});

export async function PATCH(request: NextRequest) {
  try {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ProfileUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.issues.map(i => i.message) }, { status: 400 });
  }

  await connectToDatabase();

  // Vendor-only fields are silently ignored for non-vendor accounts.
  const updates = { ...parsed.data };
  if (session.user.role !== "VENDOR") {
    delete updates.businessName;
    delete updates.experience;
    delete updates.availability;
    delete updates.businessInfo;
    delete updates.serviceCategories;
    delete updates.vendorLocations;
  }

  const user = await User.findByIdAndUpdate(session.user.id, updates, { new: true }).select("-passwordHash").lean();
  return NextResponse.json({ success: true, user });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
