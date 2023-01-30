import { useRouter } from 'next/router'
import { Prisma } from '@prisma/client'
import Photo from './photo'
import styles from '@/styles/Photos.module.scss'

interface Props {
  photos: Prisma.PhotosSelect[]
}

const PhotosList = ({ photos }: Props) => {
  const router = useRouter()

  const selectPhoto = (id: any) => {
    router.push(`/photos/${id}`)
  }

  return (
    <div className={styles.photolist}>
      {photos.length &&
        photos.map((photo, idx) => (
          <div key={idx} onClick={() => selectPhoto(photo.id)}>
            <Photo photo={photo} />
          </div>
        ))}
    </div>
  )
}

export default PhotosList
