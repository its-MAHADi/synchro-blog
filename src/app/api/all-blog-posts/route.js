// src/app/api/all-blog-posts/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const blogCollection = await dbConnect(collectionNameObj.blogCollection);

    const now = new Date();

    // ✅ শুধু published বা সময় যেগুলোর এসেছে সেগুলোই দেখাবে
    const blogs = await blogCollection
      .find({
        $or: [
          { isScheduled: { $ne: true } }, // not scheduled
          { scheduledAt: { $lte: now } }, // scheduled time reached
        ],
      })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
