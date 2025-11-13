import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import  dbConnect  from "@/lib/dbConnect";



export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return new Response(JSON.stringify({ success: false, message: "You must be logged in." }), { status: 401 });
        }

        const { targetEmail } = await req.json();
        const userEmail = session.user.email;

        if (!targetEmail) return new Response(JSON.stringify({ success: false, message: "Target email required" }), { status: 400 });
        if (targetEmail.toLowerCase() === userEmail.toLowerCase()) return new Response(JSON.stringify({ success: false, message: "Cannot follow yourself" }), { status: 400 });

        const usersCollection = await dbConnect("users");

        const targetUser = await usersCollection.findOne({ email: { $regex: `^${targetEmail}$`, $options: "i" } });
        const user = await usersCollection.findOne({ email: { $regex: `^${userEmail}$`, $options: "i" } });

        if (!targetUser) return new Response(JSON.stringify({ success: false, message: "Target user not found" }), { status: 404 });

        const isFollowing = (user.following || []).some(e => e.toLowerCase() === targetUser.email.toLowerCase());

        if (isFollowing) {
            // Unfollow
            await usersCollection.updateOne({ email: user.email }, { $pull: { following: targetUser.email } });
            await usersCollection.updateOne({ email: targetUser.email }, { $pull: { followers: user.email } });
        } else {
            // Follow
            await usersCollection.updateOne({ email: user.email }, { $addToSet: { following: targetUser.email } });
            await usersCollection.updateOne({ email: targetUser.email }, { $addToSet: { followers: user.email } });
        }

        return new Response(JSON.stringify({ success: true, following: !isFollowing }), { status: 200 });

    } catch (err) {
        console.error("Follow error:", err);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
    }
}
