/**
 * One-time Super Admin seed script.
 *
 * There is intentionally NO public admin signup route. This script is the only
 * way a SUPER_ADMIN account is created, and it refuses to run if one already
 * exists — enforcing "there must be only one Super Admin" at the data layer too.
 *
 * Usage:
 *   ADMIN_EMAIL=you@eventsaaga.com ADMIN_PASSWORD=change-me-immediately ADMIN_NAME="Admin" \
 *     npm run seed:admin
 *
 * Requires MONGODB_URI to already be set in your environment / .env file.
 */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Super Admin";

  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to your environment or .env file first.");
    process.exit(1);
  }
  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before running this script.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const UserSchema = new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true, lowercase: true },
      phone: String,
      passwordHash: String,
      role: { type: String, enum: ["SUPER_ADMIN", "CUSTOMER", "VENDOR"] },
    },
    { timestamps: true }
  );
  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existingAdmin = await User.findOne({ role: "SUPER_ADMIN" });
  if (existingAdmin) {
    console.error(`A Super Admin already exists (${existingAdmin.email}). Refusing to create a second one.`);
    console.error("If you need to reset admin credentials, update that user's passwordHash directly, don't create a new admin.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: "SUPER_ADMIN",
  });

  console.log(`Super Admin created: ${admin.email}`);
  console.log("You can now log in at /login using the Admin option.");
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
