import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// 🟢 GET — get user by email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const usersCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("GET /api/user-details error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// 🟢 PATCH — update user details
export async function PATCH(req) {
  try {
    const data = await req.json();
    const {
      email,
      work,
      education,
      location,
      skills,
      website,
      languages,
      contact_email,
      contact_number,
    } = data;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const usersCollection = dbConnect(collectionNameObj.usersCollection);

    const updateDoc = {
      $set: {
        work: work || "",
        education: education || "",
        location: location || "",
        skills: skills || [],
        website: website || "",
        languages: languages || [],
        contact_email: contact_email || "",
        contact_number: contact_number || "",
      },
    };

    const result = await usersCollection.updateOne({ email }, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("PATCH /api/user-details error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
