// app/api/top-articles/route.js
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = parseInt(searchParams.get("limit") || "6", 10);
    const limit = Math.min(Math.max(limitParam, 1), 12); // clamp between 1 and 12

    // connect to collection - adjust collection name if needed
    const col = await dbConnect("blogCollection");

    // prefer sorting by views if available otherwise likes
    // Projection selects minimum fields to return
    const cursor = col.find({}, {
      projection: {
        title: 1,
        author_name: 1,
        author_image: 1,
        read_time: 1,
        likes: 1,
        created_at: 1
      }
    })
    // if you have a 'views' field and want to prefer it:
    .sort({ views: -1, likes: -1, created_at: -1 })
    .limit(limit);

    const articles = await cursor.toArray();

    // Normalize fields and defaults
    const normalized = articles.map((a) => ({
      _id: a._id,
      title: a.title || "Untitled",
      author_name: a.author_name || "Unknown",
      author_image: a.author_image || "/defult_profile.jpg",
      read_time: a.read_time || null,
      likes: typeof a.likes === "number" ? a.likes : 0,
      created_at: a.created_at || null,
    }));

    return NextResponse.json({ success: true, articles: normalized });
  } catch (err) {
    console.error("GET /api/top-articles error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
