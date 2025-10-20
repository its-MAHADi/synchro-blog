import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;

  try {
    const blogCollection = await dbConnect(collectionNameObj.blogCollection); // <-- fix
    const posts = await blogCollection
      .find({ author_email: email })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}
