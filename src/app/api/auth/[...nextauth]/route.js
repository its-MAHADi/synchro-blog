import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "@/app/actions/auth/loginUser";

// 🔑 Main NextAuth configuration
export const authOptions = {
  providers: [
    // ✅ Custom Credentials (email + password login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1️⃣ Call your backend login function
        const result = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        // 2️⃣ If backend sends error → stop login
        if (result?.error) throw new Error(result.error);

        // 3️⃣ Extract actual user object (depends on backend response format)
        const userFromResult = result?.user ? result.user : result;
        if (!userFromResult) return null;

        // 4️⃣ Return normalized user object → NextAuth expects this shape
        return {
          id:
            (userFromResult._id && typeof userFromResult._id.toString === "function")
              ? userFromResult._id.toString()
              : userFromResult.id?.toString?.() ?? String(userFromResult.email),
          name: userFromResult.name ?? userFromResult.userName ?? userFromResult.email,
          email: userFromResult.email,
          role: userFromResult.userRole ?? "user", // ✅ include role from MongoDB
        };
      },
    }),

    // ✅ Google OAuth login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ✅ GitHub OAuth login
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  // ✅ Custom login page instead of NextAuth default
  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    // 🔑 Runs when JWT (token) is created/updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // ✅ store role inside JWT
      }
      return token;
    },

    // 🔑 Runs when session is checked (frontend `useSession`)
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role; // ✅ expose role in session
      }
      return session;
    },
  },
};

// ✅ Export NextAuth handler for GET and POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
