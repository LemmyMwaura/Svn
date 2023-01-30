import { Prisma } from '@prisma/client'
import styles from '@/styles/Album.module.scss'

interface Props {
  album: Prisma.AlbumSelect
  user?: Prisma.UserSelect
}

const Album = ({ album, user }: Props) => {
  return (
    <div className={styles.album}>
      <div>id: {album.id}</div>
      <div>title: {album.albumTitle}</div>
      {user && <div>By {user.name}</div>}
      <div>{user && <button>UploadImage</button>}</div>
    </div>
  )
}

export default Album
