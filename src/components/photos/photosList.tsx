import { Prisma } from '@prisma/client'
import Photo from './photo'
import styles from '@/styles/Photos.module.scss'

interface Props {
  photos: Prisma.PhotosSelect[]
}

const PhotosList = ({ photos }: Props) => {
  return (
    <div className={styles.photolist}>
      {photos.length &&
        photos.map((photo, idx) => (
          <div key={idx}>
            <Photo photo={photo} />
          </div>
        ))}
    </div>
  )
}

export default PhotosList
