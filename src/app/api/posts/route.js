import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    // ✅ এখানে সরাসরি collection পেয়ে যাচ্ছো
    const blogCollection = await dbConnect(collectionNameObj.blogCollection);

    const posts = await blogCollection.find().sort({ createdAt: -1 }).toArray();

    return Response.json(posts, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
