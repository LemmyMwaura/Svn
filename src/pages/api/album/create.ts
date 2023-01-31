// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma.util'

type ReqData = {
  userId: number
  title: string
}

type ResData = {
  message: string
  newAlbum?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  if (req.method === 'POST') {
    const { title: albumTitle, userId }: ReqData = req.body
    const newAlbum = await prisma.album.create({
      data: {
        albumTitle,
        userId,
      },
    })

    res.status(200).json({ message: 'Success', newAlbum })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
