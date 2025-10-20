import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"; // adjust import path if different

export async function GET(request, context) {
  try {
    // ✅ Await params first
    const { email } = await context.params;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const usersCollection = dbConnect(collectionNameObj.usersCollection);

    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
