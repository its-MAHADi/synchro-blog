// src/app/api/messages/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET → fetch messages
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const currentUser = searchParams.get("currentUser");

    const messageCollection = await dbConnect(collectionNameObj.messageCollection);

    const messages = await messageCollection
      .find({
        $or: [
          { from: currentUser, to: email },
          { from: email, to: currentUser },
        ],
      })
      .sort({ time: 1 })
      .toArray();

    return NextResponse.json(Array.isArray(messages) ? messages : []);
  } catch (err) {
    console.error("Fetch messages error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

// POST → send message
export async function POST(req) {
  try {
    const body = await req.json();
    const messageCollection = await dbConnect(collectionNameObj.messageCollection);

    const message = {
      from: body.from,
      to: body.to,
      message: body.message,
      time: new Date(),
      deleted: false,
    };

    const result = await messageCollection.insertOne(message);
    return NextResponse.json({ success: true, _id: result.insertedId });
  } catch (err) {
    console.error("Send message error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

// PATCH → delete message
export async function PATCH(req) {
  try {
    const body = await req.json();
    const messageCollection = await dbConnect(collectionNameObj.messageCollection);

    const result = await messageCollection.updateOne(
      { _id: new ObjectId(body.id) },
      { $set: { deleted: true } }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Delete message error:", err);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
