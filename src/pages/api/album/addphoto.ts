// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma.util'
import { cloudinary } from '@/lib/cloudinary.util'

type ReqData = {
  albumId: string
  title: string
  image: string
}

type ResData = {
  message: string
  newPhoto?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  if (req.method === 'POST') {
    const { albumId, title, image }: ReqData = req.body
    const { secure_url: imageUrl } = await cloudinary.v2.uploader.upload(
      image,
      {
        upload_preset: 'savanah',
      }
    )

    const newPhoto = await prisma.photos.create({
      data: {
        albumId: parseInt(albumId),
        photoTitle: title,
        imageUrl,
      },
    })

    res.status(200).json({ message: 'Success', newPhoto })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
