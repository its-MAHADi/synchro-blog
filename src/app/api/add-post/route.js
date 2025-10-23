import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized! Please login first." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const newPost = {
      blog_title: body.blog_title,
      description: body.description,
      category: body.category,
      featured_image: body.featured_image || "",
      author_name: session.user?.name || "Anonymous",
      author_email: session.user?.email,
      author_image: body.author_image || session.user?.image || "",
      author_profession: body.author_profession || "", // save profession
      extraFields: body.extraFields || {}, // save extra profession-wise data
      created_at: new Date(),
      modified_at: null,
      likes: 0,
      comment: 0,
    };

    const blogCol = await dbConnect(collectionNameObj.blogCollection);
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
