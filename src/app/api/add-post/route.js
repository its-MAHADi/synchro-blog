import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Auth check
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized! Please login first." },
        { status: 401 }
      );
    }

    // 2. Request body
    const body = await req.json();

    const newPost = {
      blog_title: body.blog_title,
      description: body.description,
      category: body.category,
      featured_image: body.featured_image,
      author_name: session.user?.name || "Anonymous",
      author_email: session.user?.email,
      created_at: new Date(),
      modified_at: null,
      likes: 0,
      comment: 0,
    };

    // 3. Insert into MongoDB
    const blogCol = dbConnect(collectionNameObj.blogCollection);
    const result = await blogCol.insertOne(newPost);

    return NextResponse.json({
      success: true,
      message: "Blog post added successfully!",
      insertedId: result.insertedId,
    });
  } catch (err) {
    console.error("Add Post Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
