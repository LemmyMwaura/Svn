// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma.util'
import { hash } from 'bcrypt'

type ReqData = {
  name: string
  email: string
  password: string
}

type ResData = {
  message: string
  result?: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  if (req.method === 'POST') {
    const { name, email, password: unhashPass }: ReqData = req.body

    hash(unhashPass, 10, async (err, password) => {
      // create new user
      if (err) {
        res.status(500).json({ message: 'Something went wrong, Try again' })
      }

      const result = await prisma.user
        .create({
          data: {
            name,
            email,
            password,
          },
        })
        .catch((err) => {
          res.status(err.status).json({ message: err.message })
        })
      res.status(200).json({ message: 'Success', result })
    })
  } else {
    res.status(401).json({ message: 'Method Not Allowed' })
  }
}
