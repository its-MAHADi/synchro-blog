import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1️⃣ Authentication check
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // 2️⃣ Parse request body
    const body = await req.json();
    const {
      id,
      post_id,
      post_author_email,
      text,
      comment_author_name,
      comment_author_email,
      comment_author_image,
      created_at,
    } = body;

    // 3️⃣ Validate data
    if (!post_id || !text || !comment_author_name || !comment_author_email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 4️⃣ Get DB collections
    const commentCollection = dbConnect(collectionNameObj.commentCollection);
    const blogCollection = dbConnect(collectionNameObj.blogCollection);

    // 5️⃣ Construct full comment object (same as frontend)
    const newComment = {
      id,
      post_id: new ObjectId(post_id), // keep reference as ObjectId
      post_author_email,
      text,
      comment_author_name,
      comment_author_email,
      comment_author_image,
      created_at,
    };

    // 6️⃣ Insert into database
    await commentCollection.insertOne(newComment);

    // 7️⃣ Increment comment count in the blog document
    await blogCollection.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { comment: 1 } }
    );

    // 8️⃣ Response
    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
      data: newComment, // Optional: return saved comment
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
