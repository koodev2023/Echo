import { NextResponse } from "next/server";

export function authorizeWithSecret(req: Request): NextResponse | null {
  const API_SECRET_KEY = process.env.API_SECRET_KEY;

  if (!API_SECRET_KEY) {
    console.error("API_SECRET_KEY environment variable is not set.");
    throw new Error("API_SECRET_KEY environment variable is not set.");
  }

  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== API_SECRET_KEY) {
    // Now correctly handles null !== null
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return null; // Indicate successful authentication
}
