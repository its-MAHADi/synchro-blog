import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req, { params }) {
  try {
    const { post_id } = params;
    const { searchParams } = new URL(req.url);
    const post_author_email = searchParams.get("email"); // optional filter

    if (!post_id) {
      return NextResponse.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }

    // ✅ Await dbConnect
    const commentCollection = await dbConnect(
      collectionNameObj.commentCollection
    );

    // Build the query
    const query = { post_id: new ObjectId(post_id) };
    if (post_author_email) {
      query.post_author_email = post_author_email;
    }

    // Fetch all comments sorted by latest
    const comments = await commentCollection
      .find(query)
      .sort({ created_at: -1 }) // make sure this field exists
      .toArray();

    return NextResponse.json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
