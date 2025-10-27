// app/api/announcement/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// POST: Create new announcement with FormData
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const tags = formData.get("tags") || "";
    const imageFile = formData.get("image");

    let image = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
    }

    const collection = await dbConnect(collectionNameObj.announcementsCommunity);
    const result = await collection.insertOne({
      title,
      description,
      tags,
      image,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to create announcement" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// GET: Fetch all announcements
export async function GET(req) {
  try {
    const collection = await dbConnect(collectionNameObj.announcementsCommunity);
    const announcements = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return new Response(JSON.stringify(announcements), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch announcements" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
