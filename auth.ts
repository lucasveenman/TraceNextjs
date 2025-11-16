// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // AUTH_SECRET is aliased to NEXTAUTH_SECRET by v5
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // v5 can infer AUTH_GITHUB_ID / AUTH_GITHUB_SECRET automatically,
  // but we can also be explicit; both are fine.
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        // @ts-expect-error custom field from Prisma model
        token.handle = user.handle ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        // @ts-expect-error extending session user
        session.user.id = token.userId as string | undefined;
        // @ts-expect-error extending session user
        session.user.handle = (token.handle as string | null) ?? null;
      }
      return session;
    },
  },
});
