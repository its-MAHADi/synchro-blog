import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// ================================
// PATCH (update user's bio) - Corrected Method
// ================================
export async function PATCH(req) { // Changed from PUT to PATCH
  try {
    const { email, bio } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect("users");

    // update user bio
    const result = await usersCollection.updateOne(
      { email },
      { $set: { bio: bio.trim() } },
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
      message: "Bio updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating bio:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ================================
// GET (fetch user bio)
// ================================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect("users");
    // Only fetching the 'bio' field for efficiency
    const user = await usersCollection.findOne({ email }, { projection: { bio: 1 } }); 

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Returning data as expected by the frontend
    return NextResponse.json({
      success: true,
      user: { bio: user.bio || "" } // Wrapped bio in a user object to match frontend expectation
    });
  } catch (error) {
    console.error("❌ Error fetching bio:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}