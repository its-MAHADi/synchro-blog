// app/api/notices/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// POST: Create new notice
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, title, description, priority, category, expiryDate } = body;

    if (!email || !title || !description) {
      return new Response(
        JSON.stringify({ message: "Email, title, and description are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const collection = await dbConnect("notice"); // collection name
    const result = await collection.insertOne({
      email,
      title,
      description,
      priority: priority || "medium",
      category: category || "general",
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to create notice" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// GET: Fetch all notices
export async function GET(req) {
  try {
    const collection = await dbConnect("notice"); // collection name
    const notices = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(notices), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch notices" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
