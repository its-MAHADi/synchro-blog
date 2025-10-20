// src/app/api/typing/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET → check if a user is typing
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const typingCollection = await dbConnect(collectionNameObj.typingCollection);

    const status = await typingCollection.findOne({ from, to });

    // If updatedAt is older than 5s, reset typing
    const now = new Date();
    let typing = false;
    if (status && now - new Date(status.updatedAt) < 5000) {
      typing = status.typing;
    }

    return NextResponse.json({ typing });
  } catch (err) {
    console.error("Fetch typing status error:", err);
    return NextResponse.json({ typing: false }, { status: 500 });
  }
}

// POST → update typing status
export async function POST(req) {
  try {
    const body = await req.json();
    const { from, to } = body;

    const typingCollection = await dbConnect(collectionNameObj.typingCollection);

    // Upsert typing status
    await typingCollection.updateOne(
      { from, to },
      { $set: { typing: true, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update typing status error:", err);
    return NextResponse.json({ error: "Failed to update typing" }, { status: 500 });
  }
}
