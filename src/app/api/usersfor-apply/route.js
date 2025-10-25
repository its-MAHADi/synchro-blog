
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return new Response(JSON.stringify({ error: "Email missing" }), { status: 400 });

  try {
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);
    const applyCollection = await dbConnect(collectionNameObj.applyCommunity);

    const user = await usersCollection.findOne({ email });
    if (!user) return new Response(JSON.stringify(null), { status: 404 });

    // Check if user has applied for profession change
    const applied = await applyCollection.findOne({ userId: user._id.toString() });
    user.hasAppliedProfessionChange = !!applied;

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
