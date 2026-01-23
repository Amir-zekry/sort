import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "@/features/authentications/server/data"
import { compareSync } from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phoneNumber: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        user = await getUserFromDb(credentials.phoneNumber)

        if (!user) {
          throw new Error("بيانات الدخول غير صحيحه")
        }

        const valid = compareSync(credentials.password, user?.password)
        if (!valid) {
          throw new Error("بيانات الدخول غير صحيحه")
        }

        return {
          id: user.id,
          phoneNumber: user.phoneNumber,
          name: user.name,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.phoneNumber = user.phoneNumber
        token.name = user.name

      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.phoneNumber = token.phoneNumber
        session.user.name = token.name
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})