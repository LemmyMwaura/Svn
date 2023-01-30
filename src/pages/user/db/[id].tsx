import Head from 'next/head'
import { prisma } from '@/lib/prisma.util'
import { GetServerSideProps } from 'next'
import { Prisma } from '@prisma/client'
import Profile from '@/components/shared/profile'
import AlbumList from '@/components/album/albumList'
import styles from '@/styles/User.module.scss'

interface Props {
  user: Prisma.UserSelect
  albums: Prisma.AlbumSelect[] | any[]
}

const UserDetail = ({ user, albums }: Props) => {
  return (
    <>
      <Head>
        <title> DbUser | {user?.name}</title>
      </Head>
      <div className={styles.wrapper}>
        <Profile user={user} />
        <div className={styles.selection}>
          <h3>Albums</h3>
          <AlbumList albums={albums} />
        </div>
      </div>
    </>
  )
}

export default UserDetail

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      albums: true,
    },
  })

  return {
    props: {
      user,
      albums: user?.albums,
    },
  }
}
