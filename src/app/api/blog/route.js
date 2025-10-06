import dbConnect from "@/lib/dbConnect";


export async function GET() {
  const db = await dbConnect();
  const blogs = await db.collection("blogs").find().toArray();
  return Response.json(blogs);
}
