// src/app/api/user/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    if (email) {
      const user = await usersCollection.findOne({ email });
      return new Response(JSON.stringify(user || {}), { status: 200 });
    }

    const users = await usersCollection.find({}).toArray();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
