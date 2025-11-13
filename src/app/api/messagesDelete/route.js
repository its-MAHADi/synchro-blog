import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

const messageCollection = dbConnect(collectionNameObj.messageCollection);

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: "Message id required" }, { status: 400 });

    const result = await messageCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { deleted: true } }
    );

    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error("Delete message error:", err);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
