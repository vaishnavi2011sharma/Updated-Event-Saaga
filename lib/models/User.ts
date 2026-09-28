import { Schema, models, model, Types } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "SUPER_ADMIN" | "CUSTOMER" | "VENDOR";
export type VendorStatus = "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;

  // Vendor-only fields
  businessName?: string;
  profileImage?: string;
  serviceCategories?: string[];
  vendorLocations?: string[];
  experience?: string;
  availability?: string;
  portfolioImages?: string[];
  businessInfo?: string;
  vendorStatus?: VendorStatus;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["SUPER_ADMIN", "CUSTOMER", "VENDOR"], required: true, default: "CUSTOMER", index: true },

    businessName: { type: String, trim: true },
    profileImage: { type: String },
    serviceCategories: [{ type: String }],
    vendorLocations: [{ type: String }],
    experience: { type: String },
    availability: { type: String },
    portfolioImages: [{ type: String }],
    businessInfo: { type: String, trim: true },
    vendorStatus: { type: String, enum: ["PENDING_APPROVAL", "APPROVED", "REJECTED", "SUSPENDED"], default: undefined },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.passwordHash);
};

export const User = models.User || model<IUser>("User", UserSchema);
export default User;
