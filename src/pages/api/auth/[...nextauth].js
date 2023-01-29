import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma.util'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials, req) {
        // check user
        const { email, password: userPass } = credentials
        const result = await prisma.user.findFirst({
          where: { email },
        })
        
        console.log({email, result})

        if (!result) {
          return res.status(400).json({ message: "Account doesn't exist" })
        }

        //validate password
        compare(userPass, user.password, async (err, result) => {
          if (err) {
            res.status(500).json({ message: 'Something went wrong, Try again' })
          }

          if (!result) {
            return res.status(403).json({ message: 'Password is incorrect' })
          }
        })
        
        return result
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
}

export default NextAuth(authOptions)
