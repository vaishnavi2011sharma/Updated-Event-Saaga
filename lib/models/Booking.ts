import { Schema, models, model, Types } from "mongoose";

export type BookingStatus = "NEW" | "PENDING" | "CONFIRMED" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface IBooking {
  _id: Types.ObjectId;
  bookingId: string; // e.g. BK1250
  customerId?: Types.ObjectId; // set when the booker is a logged-in customer

  name: string;
  phone: string;
  email?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  serviceCategory: string;
  serviceName: string;
  serviceSlug?: string;
  guestCount?: string;
  budget?: string;
  message?: string;

  status: BookingStatus;
  assignedVendorId?: Types.ObjectId;
  adminNotes?: string;
  vendorInstructions?: string;

  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: "User", index: true },

    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    eventDate: { type: String },
    eventTime: { type: String },
    location: { type: String, trim: true, index: true },
    serviceCategory: { type: String, required: true },
    serviceName: { type: String, required: true },
    serviceSlug: { type: String },
    guestCount: { type: String },
    budget: { type: String },
    message: { type: String, trim: true },

    status: {
      type: String,
      enum: ["NEW", "PENDING", "CONFIRMED", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "NEW",
      index: true,
    },
    assignedVendorId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    adminNotes: { type: String, trim: true },
    vendorInstructions: { type: String, trim: true },

    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ eventDate: 1 });

// Reuse the compiled model across hot reloads (avoids OverwriteModelError)
export const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
