import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  try {
    const { blog_id, blog_title, description, featured_image } = await req.json();

    if (!blog_id) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const blogsCollection = await dbConnect(collectionNameObj.blogCollection);

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(blog_id) },
      { $set: { blog_title, description, featured_image, updated_at: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "No post updated" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Post updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("PATCH error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
