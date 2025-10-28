import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, email, currentProfession, reason } = body;

    if (!userId || !reason || !email) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    // সরাসরি collection object নাও
    const collection = await dbConnect(collectionNameObj.applyCommunity);

    const result = await collection.insertOne({
      userId,
      email,
      currentProfession,
      reason,
      status: "pending", // admin can approve/reject
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500 }
    );
  }
}
