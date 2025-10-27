import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    // ✅ এখানে সরাসরি collection পেয়ে যাচ্ছো
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    const users = await usersCollection.find().sort({ createdAt: -1 }).toArray();

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
