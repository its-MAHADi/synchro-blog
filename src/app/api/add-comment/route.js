import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; 
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Check if user is logged in
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // 2️. Parse request body
    const body = await req.json();
    const { id, post_id, text, author_name, author_image, created_at } = body;

    if (!post_id || !text) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    // 3️. Get DB collections
    const commentCollection = dbConnect(collectionNameObj.commentCollection);
    const blogCollection = dbConnect(collectionNameObj.blogCollection);

    // 4️. Insert new comment
    const newComment = {
      id,
      post_id: new ObjectId(post_id),
      text,
      author_name,
      author_image,
      created_at,
    };

    await commentCollection.insertOne(newComment);

    // 5️. Increment comment count in blog document
    await blogCollection.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { comment: 1 } }
    );

    return NextResponse.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
