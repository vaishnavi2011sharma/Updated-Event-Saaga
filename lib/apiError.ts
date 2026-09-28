import { NextResponse } from "next/server";

/**
 * Turns any thrown error into a safe, structured JSON response. Never forwards
 * the raw error message to the client (MongoDB connection errors can embed the
 * connection string / credentials in their message), and only logs a
 * credential-free classification server-side.
 */
export function apiErrorResponse(err: unknown): NextResponse {
  if (err instanceof Error && err.message === "DATABASE_CONNECTION_FAILED") {
    return NextResponse.json(
      {
        success: false,
        errors: [
          "We couldn't reach the database right now. Please try again in a moment, or contact support if this continues.",
        ],
      },
      { status: 503 }
    );
  }

  console.error("[api] Unhandled error in route handler:", err instanceof Error ? err.name : err);
  return NextResponse.json(
    { success: false, errors: ["Something went wrong. Please try again."] },
    { status: 500 }
  );
}

/**
 * Wraps an API route handler so that ANY thrown error (a MongoDB connection/
 * auth failure, an unexpected Mongoose error, etc.) is caught and turned into
 * a structured JSON response instead of an uncaught exception — which Next.js
 * would otherwise turn into a bare HTML/text 500 response with no JSON body,
 * breaking any frontend code that calls `res.json()` on the result.
 */
export function withApiErrorHandling<A extends unknown[]>(
  handler: (...args: A) => Promise<NextResponse>
): (...args: A) => Promise<NextResponse> {
  return async (...args: A) => {
    try {
      return await handler(...args);
    } catch (err) {
      return apiErrorResponse(err);
    }
  };
}
