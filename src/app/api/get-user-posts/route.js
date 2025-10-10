import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(
      JSON.stringify({ success: false, message: "Email required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
 
  try {
    const blogsCollection = await dbConnect(collectionNameObj.blogCollection);
    const posts = await blogsCollection
      .find({ author_email: email })
      .sort({ created_at: -1 })
      .toArray();

    return new Response(
      JSON.stringify({ success: true, posts }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
