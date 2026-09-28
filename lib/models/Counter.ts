import { Schema, models, model } from "mongoose";

interface ICounter {
  _id: string;
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1249 }, // first generated ID will be BK1250
});

export const Counter = models.Counter || model<ICounter>("Counter", CounterSchema);

/**
 * Atomically generates the next sequential booking ID, e.g. "BK1250", "BK1251".
 * Uses findOneAndUpdate with $inc so concurrent bookings never collide.
 */
export async function generateBookingId(): Promise<string> {
  const counter = await Counter.findOneAndUpdate(
    { _id: "bookingId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `BK${counter.seq}`;
}
