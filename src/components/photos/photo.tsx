import Image from 'next/image'
import { Prisma } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { imagePlaceholder } from '@/helpers/photo.util'
import styles from '@/styles/Photos.module.scss'

interface Props {
  photo: Prisma.PhotosSelect
}

const Photo = ({ photo }: Props) => {
  const { data: session } = useSession()

  const image = photo?.imageUrl ?? (imagePlaceholder as any)

  return (
    <div>
      <div className={styles.photo_wrapper}>
        <div>Title: {photo.photoTitle}</div>
        <Image
          className={styles.photo}
          width="100"
          height="100"
          src={image}
          alt="Photo"
        />
      </div>
    </div>
  )
}

export default Photo
