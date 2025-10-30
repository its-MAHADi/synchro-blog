import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // 1️⃣ If user not logged in → redirect to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 2️⃣ Protect admin-only routes
  const adminRoutes = ["/admin-dashboard", "/manage-posts", "/manage-users","/announcements",
    "/application","/notice",];

  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  // 3️⃣ (Optional) Restrict admins from visiting user-only dashboard
  if (pathname.startsWith("/user-dashboard") && token.role === "admin") {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // 4️⃣ Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-profile",
    "/view-profile/:path*",
    "/admin-dashboard",
    "/add-profession",
    "/announcements",
    "/application",
    "/apply-to-community",
    "/events",
    "/followers",
    "/following",
    "/manage-posts",
    "/manage-users",
    "/my-posts",
    "/notice",
    "/profile",
    "/questions-per-profession",
    "/user-dashboard",
    "/users-announcements",
    "/users-notice",
    "/add-post",
    "/ProfessionalsTest",
  ],
};
