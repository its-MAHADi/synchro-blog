// app/api/update-cover/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function PATCH(req) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { email, cover_image } = body;

    if (!email || !cover_image) {
      console.warn("Missing email or cover_image");
      return new Response(
        JSON.stringify({ success: false, message: "Email and cover_image are required" }),
        { status: 400 }
      );
    }

    const collection = await dbConnect(collectionNameObj.usersCollection);

    const result = await collection.updateOne(
      { email },
      { $set: { cover_image } }
    );

    console.log("MongoDB update result:", result);

    if (result.matchedCount === 0) {
      console.warn("User not found:", email);
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Cover updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Cover update error:", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}
