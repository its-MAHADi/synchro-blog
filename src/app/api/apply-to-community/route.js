import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { email, profession, reason, hasRetaken } = await req.json();

    if (!email || !profession || !reason) {
      return NextResponse.json(
        { success: false, message: "Email, profession, and reason are required" },
        { status: 400 }
      );
    }

    const applyCollection = await dbConnect("applyCommunity");

    const newApplication = {
      email,
      profession,
      reason,
      hasRetaken,
      status: "pending",
      createdAt: new Date(),
    };

    await applyCollection.insertOne(newApplication);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("❌ Error submitting application:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
