import "server-only"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})