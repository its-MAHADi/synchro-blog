
import { loginUser } from "@/app/actions/auth/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import { useCallback } from "react";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your Email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                // loginUser কল করার সময় অবশ্যই await দিতে হবে
                const user = await loginUser(credentials);
                console.log("User found:", user);
                console.log("Credentials received:", credentials)
                if (user) {
                    return user; // সফল হলে ইউজার অবজেক্ট রিটার্ন
                } else {
                    return null; // ব্যর্থ হলে null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

         GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
    ],
    pages: {
        signin: '/sign-in'
    },
     callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl; // ✅ always redirect to home after login
    }
  }

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
