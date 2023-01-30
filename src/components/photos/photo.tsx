import Image from 'next/image'
import { Prisma } from '@prisma/client'
import { imagePlaceholder } from '@/helpers/photo.util'
import styles from '@/styles/Photos.module.scss'

interface Props {
  photo: Prisma.PhotosSelect
  album?: Prisma.AlbumSelect
}

const Photo = ({ photo, album }: Props) => {
  const image = photo?.imageUrl ?? (imagePlaceholder as any)

  return (
    <div>
      <div className={styles.photo_wrapper}>
        <div>Title: {photo.photoTitle}</div>
        {album && <div>From: {album.albumTitle}</div>}
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
