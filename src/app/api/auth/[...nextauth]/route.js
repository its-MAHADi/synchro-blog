import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { ObjectId } from "mongodb"; // Import ObjectId for finding users by _id if needed later

import { loginUser } from "@/app/actions/auth/loginUser";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// Helper function to fetch user data including role from the database
const fetchUserFromDB = async (email) => {
  try {
    const db = await dbConnect();
    const usersCollection = db.collection(collectionNameObj.usersCollection);

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (user) {
      return {
        id: user.userId, // Using your custom userId
        _id: user._id.toString(), // MongoDB _id
        email: user.email,
        name: user.userName || user.email,
        role: user.userRole || "user",
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    return null;
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (result?.error) throw new Error(result.error);
        const user = result?.user ? result.user : result;
        if (!user) return null;

        // Credentials provider already provides the role
        return {
          id: user.userId,
          name: user.userName || user.email,
          email: user.email,
          role: user.userRole || "user",
        };
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
      try {
        if (account?.provider === "google" || account?.provider === "github") {
          const db = await dbConnect();
          const usersCollection = db.collection(
            collectionNameObj.usersCollection
          );
          const existingUser = await usersCollection.findOne({
            email: user.email,
          });

          if (!existingUser) {
            // New user, create them in the database
            const userId = Math.random()
              .toString(36)
              .substring(2, 10)
              .toUpperCase();

            await usersCollection.insertOne({
              userRole: "user",
              userId: userId,
              email: user.email ?? null,
              userName: user.name ?? null,
              image: user.image ?? null,
              cover_image: null,
              password: null, // Should be null for social logins
              createdAt: new Date(),
              last_log_in: new Date(),
              memberStatus: false,
              failedLoginAttempts: 0,
              lockUntil: null,
              bio: "",
              profession: "",
              education: "",
              location: "",
              skills: [],
              contact_email: "",
              contact_number: null,
              website: "",
              language: [],
              followers: [],
              following: [],
              retake: 0,
              applyForProfessionChange: false
            });
          } else {
            // Existing user, update last_log_in
            await usersCollection.updateOne(
              { email: user.email },
              { $set: { last_log_in: new Date() } }
            );
          }
        }
        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // 1. If 'user' exists (i.e., immediately after sign-in),
      //    add the new user data (including role from Credentials or basic from Social)
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // The role might be missing for social providers, so we'll fetch it next if needed
        token.role = user.role;
      }

      // 2. FOR ALL PROVIDERS: Ensure the role is present by fetching it from DB if it's missing.
      //    This is crucial for social logins where 'user.role' is initially undefined.
      //    This runs on subsequent requests as well (not just sign-in).
      if (!token.role && token.email) {
        const dbUser = await fetchUserFromDB(token.email);
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id; // Also ensure custom id is present
        }
      }

      // Fallback in case of any issues
      token.role = token.role || "user";

      return token;
    },

    async session({ session, token }) {
      // Transfer custom properties from the JWT token to the session
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role; // <-- THIS IS THE KEY PROPERTY
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
