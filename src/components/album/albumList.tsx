import { useRouter } from 'next/router'
import { Prisma } from '@prisma/client'
import Album from '@/components/album/album'
import styles from '@/styles/Album.module.scss'

interface Props {
  albums: Prisma.AlbumSelect[]
}

const AlbumList = ({ albums }: Props) => {
  const router = useRouter()

  const selectAlbum = (id: any) => {
    router.push(`/album/${id}`)
  }

  return (
    <div>
      <div className={styles.albumlist}>
        {albums.length &&
          albums.map((album, idx) => (
            <div key={idx} onClick={() => selectAlbum(album.id)}>
              <Album album={album} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AlbumList
