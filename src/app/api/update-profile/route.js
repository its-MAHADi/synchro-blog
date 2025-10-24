// app/api/update-profile/route.js (App Router)
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function PATCH(req, res) {
  try {
    // Step 1: Read request body
    const body = await req.json();
    console.log("Request body:", body);

    const { email, image } = body;

    // Step 2: Validate input
    if (!email || !image) {
      console.warn("Missing email or image in request");
      return new Response(
        JSON.stringify({ success: false, message: "Email and image are required" }),
        { status: 400 }
      );
    }

    // Step 3: Connect to MongoDB
    const collection = await dbConnect(collectionNameObj.usersCollection);
    if (!collection) {
      console.error("MongoDB collection not found");
      return new Response(
        JSON.stringify({ success: false, message: "Database error" }),
        { status: 500 }
      );
    }

    // Step 4: Update user profile image
    const result = await collection.updateOne(
      { email },
      { $set: { image } }
    );

    console.log("MongoDB update result:", result);

    if (result.matchedCount === 0) {
      console.warn("User not found:", email);
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    // Step 5: Success response
    return new Response(JSON.stringify({ success: true, message: "Profile updated!" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}
