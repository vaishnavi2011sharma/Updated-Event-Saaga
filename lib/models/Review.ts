import { Schema, models, model, Types } from "mongoose";

export interface IReview {
  _id: Types.ObjectId;
  bookingId: string;
  customerId: Types.ObjectId;
  serviceName: string;
  serviceCategory: string;
  rating: number; // 1-5
  reviewText: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    bookingId: { type: String, required: true, unique: true, index: true }, // one review per booking
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    serviceName: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

export const Review = models.Review || model<IReview>("Review", ReviewSchema);
export default Review;
