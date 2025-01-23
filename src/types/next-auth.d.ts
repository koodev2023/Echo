// types/next-auth.d.ts (or auth.d.ts, session.d.ts, etc.)
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      // id: string; // Add your custom properties here
      username?: string | null;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    username?: string | null;
  }
}
