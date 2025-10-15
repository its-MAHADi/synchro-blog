import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const emailsParam = searchParams.get("emails");

    if (!emailsParam) {
      return new Response(
        JSON.stringify({ success: false, message: "No emails provided" }),
        { status: 400 }
      );
    }

    // 🔹 Split all comma-separated emails and clean spaces
    const emails = emailsParam.split(",").map((e) => e.trim());

    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    // 🔹 Find all users whose email exists in this array
    const users = await usersCollection
      .find({ email: { $in: emails } })
      .project({ name: 1, email: 1, image: 1, role: 1, _id: 0 })
      .toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error("API Error (/api/messageUser):", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
