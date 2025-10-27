// app/api/notice/[id]/route.js
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// DELETE notice by id
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const collection = await dbConnect("notice");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Notice not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Failed to delete notice" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
