import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const collection = await dbConnect("applyCommunity");
    const applied = await collection.find({ email }).toArray();

    const professions = applied.map((a) => a.profession);

    return NextResponse.json({ success: true, professions });
  } catch (err) {
    console.error("❌ Error fetching applied professions:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
