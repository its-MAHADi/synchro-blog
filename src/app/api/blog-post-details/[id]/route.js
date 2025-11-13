import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // 🧩 Validate the ID
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    // 🗄️ Connect to the 'blogs' collection
    const blogCollection = dbConnect(collectionNameObj.blogCollection);

    // 🔍 Find the blog by ObjectId
    const blog = await blogCollection.findOne({ _id: new ObjectId(id) });

    // ❌ If not found
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // ✅ Return the blog
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
