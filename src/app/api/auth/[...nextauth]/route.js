import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginUser } from "@/app/actions/auth/loginUser";
import  dbConnect, {collectionNameObj } from "@/lib/dbConnect";


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
        // শুধু Google বা GitHub লগইনের জন্য
        if (account?.provider === "google" || account?.provider === "github") {
          const usersCollection = dbConnect(collectionNameObj.usersCollection);
          const existingUser = await usersCollection.findOne({ email: user.email });

          if (!existingUser) {
            // নতুন ইউজার হলে তৈরি করো
            const userId = Math.random().toString(36).substring(2, 10).toUpperCase();

            await usersCollection.insertOne({
              userRole: "user",
              userId: userId,
              email: user.email ?? null,
              userName: user.name ?? null,
              image: user.image ?? null,
              cover_image: null,
              password: null,
              createdAt: new Date(),
              last_log_in: new Date(),
              memberStatus: false,
              failedLoginAttempts: 0,
              lockUntil: null,
              bio: "",
              work: "",
              education: "",
              location: "",
              skills: [],
              contact_email: "",
              contact_number: null,
              website: "",
              language: [],
              followers: [],
            });
          } else {
            // আগের ইউজার হলে শুধু last_log_in update করো
            await usersCollection.updateOne(
              { email: user.email },
              { $set: { last_log_in: new Date() } }
            );
          }
        }

        return true;
      } catch (error) {
        console.error("Error saving user:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
