// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma.util'
import { Prisma } from '@prisma/client'

type ReqData = {
  id: number
  title: string
}

type ResData = {
  message: string
  updatedPhoto?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  if (req.method === 'POST') {
    const { id, title }: ReqData = req.body
    const updatedPhoto = await prisma.photos.update({
      where: { id },
      data: {
        photoTitle: title,
      },
    })

    res.status(200).json({ message: 'Success', updatedPhoto })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
