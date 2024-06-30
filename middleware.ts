import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const publicRoutes = new Set([
  "/",
  "/login",
  "/signup",
  "/sms-login",
  "/github/start",
  "/github/complete",
]);

export async function middleware(req: NextRequest) {
  const session = await getSession();

  const isPublic = publicRoutes.has(req.nextUrl.pathname);
  const isLoggedIn = Boolean(session.id);

  if (!isLoggedIn) {
    if (!isPublic) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (isLoggedIn) {
    if (isPublic) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon_naturalcoder.svg).*)",
  ],
};
