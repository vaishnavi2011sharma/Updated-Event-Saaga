import { Schema, models, model, Types } from "mongoose";

export type NotificationAudience = "CUSTOMER" | "VENDOR" | "SUPER_ADMIN";

export interface INotification {
  _id: Types.ObjectId;
  userId: Types.ObjectId; // recipient
  audience: NotificationAudience;
  title: string;
  message: string;
  link?: string; // e.g. /customer/bookings/BK1250
  bookingId?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    audience: { type: String, enum: ["CUSTOMER", "VENDOR", "SUPER_ADMIN"], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String },
    bookingId: { type: String },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export const Notification = models.Notification || model<INotification>("Notification", NotificationSchema);
export default Notification;
