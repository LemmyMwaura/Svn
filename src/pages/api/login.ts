// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma.util'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

type ReqData = {
  email: string
  password: string
}

type ResData = {
  message: string
  result?: any
  authToken?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  if (req.method === 'POST') {
    const { email, password: userPass }: ReqData = req.body
    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user) {
      return res.status(400).json({ message: "Account doesn't exist" })
    }

    compare(userPass, user.password, async (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong, Try again' })
      }

      if (!result) {
        return res.status(403).json({ message: 'Password is incorrect' })
      }

      const details = { sub: user.id, email: user.email }
      const secret = process.env.JWT_SECRET ?? 'secretKey'
      const jwt = sign(details, secret, { expiresIn: '15d' })
      res.status(200).json({ message: 'Success', authToken: jwt })
    })
  } else {
    res.status(401).json({ message: 'Method Not Allowed' })
  }
}
