import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// ================================
// PATCH (update user's profession)
// ================================
export async function PATCH(req) {
  try {
    const { email, profession } = await req.json();

    if (!email || !profession) {
      return NextResponse.json(
        { success: false, message: "Email and profession are required" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect("users");

    // Update user's profession
    const result = await usersCollection.updateOne(
      { email },
      { $set: { profession: profession.trim() } },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profession updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating profession:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}