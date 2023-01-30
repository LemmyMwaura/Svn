import Head from 'next/head'
import { prisma } from '@/lib/prisma.util'
import { GetServerSideProps } from 'next'
import { Prisma } from '@prisma/client'
import Album from '@/components/album/album'
import PhotosList from '@/components/photos/photosList'
import styles from '@/styles/Album.module.scss'

interface Props {
  album: Prisma.AlbumSelect
  user: Prisma.UserSelect
  photos: Prisma.PhotosSelect[]
}

const AlbumDetail = ({ album, user, photos }: Props) => {
  return (
    <>
      <Head>
        <title> Album | {album?.albumTitle}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.detail_album_list}>
          <Album album={album} user={user} />
        </div>
        <div className={styles.photos}>
          <h3>Photos</h3>
          <PhotosList photos={photos} />
        </div>
      </div>
    </>
  )
}

export default AlbumDetail

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const album = await prisma.album.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      user: true,
      photos: true,
    },
  })

  return {
    props: {
      album,
      user: album?.user,
      photos: album?.photos,
    },
  }
}
