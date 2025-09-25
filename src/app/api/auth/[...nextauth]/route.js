import { loginUser } from "@/app/actions/auth/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// Helper function: random userId
function generateUserId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part1 = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const part2 = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${part1}-${part2}`;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (user) return user;
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    async signIn({ user, account }) {
      const userCollection = await dbConnect(collectionNameObj.usersCollection);
      const existingUser = await userCollection.findOne({ email: user.email });

      if (!existingUser) {
        // নতুন ইউজার Google/GitHub থেকে
        await userCollection.insertOne({
          userRole: "user",
          userId: generateUserId(),
          email: user.email,
          userName: user.name,
          image: user.image || null,
          password: null, // social login এ পাসওয়ার্ড থাকবে না
          createdAt: new Date(),
          last_log_in: new Date(),
          memberStatus: false,
          failedLoginAttempts: 0,
          lockUntil: null,
        });
      } else {
        // আগের ইউজার হলে last_log_in আপডেট হবে
        await userCollection.updateOne(
          { email: user.email },
          { $set: { last_log_in: new Date() } }
        );
      }

      return true;
    },

    async session({ session }) {
      const userCollection = await dbConnect(collectionNameObj.usersCollection);
      const dbUser = await userCollection.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.role = dbUser.userRole;
        session.user.userId = dbUser.userId;
        session.user.memberStatus = dbUser.memberStatus;
      }

      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
