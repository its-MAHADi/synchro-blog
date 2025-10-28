import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json({ error: "Missing post ID" }, { status: 400 });
    }

    // ✅ Connect to DB and get collection
    const postsCollection = await dbConnect(collectionNameObj.blogCollection);

    // ✅ Delete post by ID
    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    return Response.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
