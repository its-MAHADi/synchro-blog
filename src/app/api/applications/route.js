import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const collection = await dbConnect(collectionNameObj.applyCommunity);
    const applications = await collection.find({}).sort({ createdAt: -1 }).toArray();

    // Filter applications
    const professionChangeApps = applications.filter(app => app.currentProfession);
    const blockRetakeApps = applications.filter(app => app.hasRetaken === "yes");

    return new Response(
      JSON.stringify({ professionChangeApps, blockRetakeApps }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch applications" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
