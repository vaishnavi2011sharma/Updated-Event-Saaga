import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Notification } from "@/lib/models/Notification";
import { getSession, assertOwnership, UnauthorizedError } from "@/lib/rbac";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    }
    await connectToDatabase();

    const notifications = await Notification.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(50).lean();
    const unreadCount = await Notification.countDocuments({ userId: session.user.id, read: false });

    return NextResponse.json({ success: true, notifications, unreadCount });
  } catch (err) {
    console.error("[api/notifications GET] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    }
    await connectToDatabase();

    const { notificationId, markAllRead } = await request.json();

    if (markAllRead) {
      await Notification.updateMany({ userId: session.user.id, read: false }, { read: true });
      return NextResponse.json({ success: true });
    }

    const notif = await Notification.findById(notificationId);
    if (!notif) {
      return NextResponse.json({ success: false, message: "Notification not found." }, { status: 404 });
    }
    assertOwnership(session, notif.userId.toString());

    notif.read = true;
    await notif.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    console.error("[api/notifications PATCH] error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
