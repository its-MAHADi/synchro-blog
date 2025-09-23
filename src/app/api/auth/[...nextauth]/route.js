
import { loginUser } from "@/app/actions/auth/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { useCallback } from "react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const result = await loginUser(credentials);

        if (result?.error) {
          throw new Error(result.error); // Pass to frontend
        }

        return result.user; // Successful login
      }
    })
  ],
  pages: {
    signIn: "/sign-in"
  }
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
