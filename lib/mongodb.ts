import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "eventsaaga";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Reuse the connection across hot reloads / serverless invocations
declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
if (!global._mongooseCache) global._mongooseCache = cached;

/**
 * Connect to MongoDB. Returns null (instead of throwing) when MONGODB_URI
 * isn't configured yet, so the app keeps working in a "no-op" mode during
 * development before real credentials are supplied.
 *
 * On a genuine connection failure (bad auth, network/IP-allowlist issue,
 * wrong cluster host, etc.) this throws a clean, generic Error whose message
 * NEVER includes the connection string, username, or password — Mongoose's
 * own error objects can otherwise embed the URI, so we deliberately do not
 * forward `err.message` anywhere (not to the client, not to the console).
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI || MONGODB_URI === "your_mongodb_connection_string_here") {
    console.warn(
      "[mongodb] MONGODB_URI is not configured. Skipping database connection — " +
        "booking data will not be persisted until a real connection string is set in .env"
    );
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    // Log only a safe, credential-free classification of the failure.
    const code = (err as { code?: number | string })?.code;
    const codeName = (err as { codeName?: string })?.codeName;
    if (codeName === "AtlasError" || code === 8000) {
      console.error(
        "[mongodb] Atlas authentication failed (bad auth). This means the " +
          "username/password in MONGODB_URI (in .env.local) is incorrect, " +
          "expired, or contains characters that need URL-encoding. " +
          "No credentials are logged here — check .env.local directly."
      );
    } else {
      console.error(`[mongodb] Connection failed (${codeName ?? "unknown error"}, code=${code ?? "n/a"}).`);
    }
    throw new Error("DATABASE_CONNECTION_FAILED");
  }

  return cached.conn;
}
