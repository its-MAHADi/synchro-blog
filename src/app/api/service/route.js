import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import client from "@/lib/dbConnect";


// to get logged in user's all blogs 
export const GET = async(req) => {
    try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await client;
    const db = client.db("synchro-blog");
    const blogs = await db
      .collection("blogs")
      .find({ author_email })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
} 


// to create a new blogs
export const POST = async (req) => {
    const body = await req.json();
    // console.log(body);
    const blogCollection = dbConnect(collectionNameObj.blogCollection);
    const result = await blogCollection.insertOne(body);
    console.log(result)
    return NextResponse.json(result);
}