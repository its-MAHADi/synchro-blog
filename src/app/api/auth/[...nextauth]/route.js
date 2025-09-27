import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "@/app/actions/auth/loginUser";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call backend login
        const result = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        const userFromResult = result?.user ? result.user : result;
        if (!userFromResult) return null;

        // Normalize for NextAuth
        return {
          id:
            (userFromResult._id && typeof userFromResult._id.toString === "function")
              ? userFromResult._id.toString()
              : userFromResult.id?.toString?.() ?? String(userFromResult.email),
          name: userFromResult.name ?? userFromResult.userName ?? userFromResult.email, // ✅ support userName
          email: userFromResult.email,
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // ✅ keep real name
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name; // ✅ use stored name
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
