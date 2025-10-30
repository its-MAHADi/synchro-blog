// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginUser } from "@/app/actions/auth/loginUser";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// Helper to fetch user from DB by email
const fetchUserFromDB = async (email) => {
  try {
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);
    const user = await usersCollection.findOne({ email });
    if (!user) return null;

    return {
      id: user.userId,
      _id: user._id.toString(),
      email: user.email,
      name: user.userName || user.email,
      role: user.userRole || "user",
    };
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    return null;
  }
};

export const authOptions = {
  providers: [
    // Credentials login
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
        const user = result?.user || result;

        if (!user) return null;

        return {
          id: user.userId,
          name: user.userName || user.email,
          email: user.email,
          role: user.userRole || "user",
        };
      },
    }),

    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // GitHub login (add user:email scope)
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    // Social login: create user if doesn't exist
    async signIn({ user, account }) {
      try {
        if (!user.email) {
          console.error("Social login provider did not return email");
          return false;
        }

        const usersCollection = await dbConnect(
          collectionNameObj.usersCollection
        );
        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          // New user
          const userId = Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();
          await usersCollection.insertOne({
            userRole: "user",
            userId,
            email: user.email,
            userName: user.name ?? null,
            image: user.image ?? null,
            cover_image: null,
            password: null,
            createdAt: new Date(),
            last_log_in: new Date(),
            memberStatus: false,
          });
        } else {
          // Existing user: update last login
          await usersCollection.updateOne(
            { email: user.email },
            { $set: { last_log_in: new Date() } }
          );
        }

        return true;
      } catch (err) {
        console.error("Error during signIn callback:", err);
        return false;
      }
    },

    // JWT callback: include role and id
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }

      // Ensure role is present for social login users
      if (!token.role && token.email) {
        const dbUser = await fetchUserFromDB(token.email);
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id;
        }
      }

      token.role = token.role || "user";
      return token;
    },

    // Session callback: attach custom properties
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
