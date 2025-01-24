import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { authorizeWithSecret } from "./lib/utils/authorizeWithSecret";

const API_SECRET_KEY = process.env.API_SECRET_KEY;
if (!API_SECRET_KEY) {
  throw new Error("API_SECRET_KEY environment variable is not set.");
}
const API_ROUTES = /^\/api\/.*$/; // Regular expression to match API routes

const protectedExactRoutes = [
  "/write",
  "/me",
  "/me/library",
  "/me/stories",
  "/me/stories/drafts",
  "/me/stories/published",
  "/api/createPost",
  "/api/upload-image",
  "/api/sign-cloudinary-params",
];

// only need authentication, no need authorization
const protectedDynamicRoutes = [
  "/api/savePost", // Will match /api/savePost/*
  "/api/publishPost",
  "/api/deletePost",
  "/edit",
  "/posts",
];

function checkIfIsProtectedRoute(path: string) {
  if (protectedExactRoutes.includes(path)) {
    return true;
  }

  return protectedDynamicRoutes.some(
    (route) => path.startsWith(route) && path[route.length] === "/"
  );
}

const publicFileExtensions = [".png"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log("middleware:", path);

  if (publicFileExtensions.some((ext) => path.endsWith(ext))) {
    console.log("static file path ignored and released:", path);
    return NextResponse.next();
  }

  if (checkIfIsProtectedRoute(path)) {
    const session = await auth();
    const isAuthenticated = !!session?.user;

    if (!isAuthenticated) {
      if (API_ROUTES.test(path)) {
        return new NextResponse(JSON.stringify({ error: "Unauthenticated" }), {
          status: 401,
        });
      } else {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    console.log("path authenticated and released:", path);
    return NextResponse.next();
  }

  if (path.startsWith("/api/")) {
    const authorizationError = authorizeWithSecret(req);
    if (authorizationError) return authorizationError;

    console.log("path authorized and released:", path);
    return NextResponse.next();
  }

  if (path === "/login") {
    const session = await auth();
    if (session?.user) {
      const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
      return NextResponse.redirect(new URL(callbackUrl || "/", req.url));
    }
  }

  console.log("path released:", path);
  return NextResponse.next();
}

// negation matcher
export const config = {
  matcher:
    "/((?!api/auth|api/comments|public|_next/static|_next/image|static|favicon.ico|manifest.json).*)",
};
