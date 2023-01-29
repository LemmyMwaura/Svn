// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma.util'

type ReqData = {
  email: string
}

type ResData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  if (req.method === 'POST') {
    const { email }: ReqData = req.body

    // Check if account exists
    const isUser = await prisma.user.findFirst({
      where: { email },
    })

    if (isUser) {
      return res.status(409).json({ message: 'Account already exists' })
    }
    res.status(200).json({ message: 'Proceed' })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
