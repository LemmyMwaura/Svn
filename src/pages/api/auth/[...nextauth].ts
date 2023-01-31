import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// utils
import { prisma } from '@/lib/prisma.util'
import { compare } from 'bcrypt'

type ReqData = {
  email: string
  password: string
}

type Provider = {
  clientId: string
  clientSecret: string
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    } as Provider),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    } as Provider),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        // check user
        const { email, password: userPass } = credentials as ReqData
        const user = await prisma.user.findFirst({
          where: { email },
        })

        if (!user) {
          throw new Error("Account doesn't exist")
        }

        //validate password
        const isValid = await compare(userPass, user.password)
        if (!isValid) {
          throw new Error("Password doesn't match")
        }

        return user as any
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
}

export default NextAuth(authOptions as any)
