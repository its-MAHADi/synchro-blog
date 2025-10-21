// src/app/api/all-blog-posts/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const blogCollection = await dbConnect(collectionNameObj.blogCollection);
    const blogs = await blogCollection.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
