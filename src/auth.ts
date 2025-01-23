import prisma from "@/db/connect";
import { checkAndUpdateUsername } from "@/lib/user.actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  events: {
    async createUser(message: any) {
      console.log("authOptions createUser", message.user);
      const updatedUser = await checkAndUpdateUsername(message.user.id);
      console.log("authOptions updatedUser", updatedUser);
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "signUp" || trigger === "signIn") {
        if (user) {
          token.username = user.username;
        }
      }
      if (trigger === "update" && session) {
        token.username = session.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string;
      }
      return session;
    },
  },
});
