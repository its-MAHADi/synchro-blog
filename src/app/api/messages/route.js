import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const messageCollection = dbConnect(collectionNameObj.messageCollection);

// 📨 Get messages between two users
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // target user email
    const currentUser = searchParams.get("currentUser"); // logged in user email

    const messages = await messageCollection
      .find({
        $or: [
          { from: currentUser, to: email },
          { from: email, to: currentUser },
        ],
      })
      .sort({ time: 1 }) // sort by oldest → newest
      .toArray();

    return NextResponse.json(messages);
  } catch (err) {
    console.error("Fetch messages error:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// 💬 Send message
export async function POST(req) {
  try {
    const body = await req.json();

    const message = {
      from: body.from, // sender email
      to: body.to, // receiver email
      message: body.message,
      time: new Date(),
    };

    const result = await messageCollection.insertOne(message);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Send message error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
