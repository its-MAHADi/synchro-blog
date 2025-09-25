// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // ধরলাম তুমি jwt কুকিতে রাখছো
  const role = req.cookies.get("role")?.value;   // "user" বা "admin"

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // লগইন না করলে
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // role check
    if (pathname.startsWith("/dashboard/admin-dashboard") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/user-dashboard", req.url));
    }

    if (pathname.startsWith("/dashboard/user-dashboard") && role !== "user") {
      return NextResponse.redirect(new URL("/dashboard/admin-dashboard", req.url));
    }
  }
}
