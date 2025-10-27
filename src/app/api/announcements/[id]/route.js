import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// DELETE: Delete announcement by ID
export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        const collection = await dbConnect(collectionNameObj.announcementsCommunity);

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ message: "Announcement not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, message: "Announcement deleted" }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Failed to delete announcement" }), { status: 500 });
    }
}
