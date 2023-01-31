import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'

// libs/Utils
import { prisma } from '@/lib/prisma.util'
import { axiosInstance } from '@/lib/axios.util'
import { useJsonPlaceholderFetcher } from '@/hooks/tanstack-query'

// components
import Profile from '@/components/shared/profile'
import Spinner from '@/components/shared/spinner'
import UsersList from '@/components/home/usersList'

// styles
import spinStyles from '@/styles/Utils.module.scss'
import styles from '@/styles/Home.module.scss'

interface Props {
  users: Prisma.UserSelect[]
  externalUsers: any[]
  albums: Prisma.AlbumSelect[]
}

const Home = ({ users, externalUsers, albums }: Props) => {
  const { data: session, status } = useSession()
  const { data, isLoading } = useJsonPlaceholderFetcher('jsonusers', 'users', {
    initialData: {
      data: externalUsers,
    },
  })
  const { data: jsonData } = data as any

  if (status === 'loading' || isLoading) {
    return (
      <>
        <Head>
          <title>Home | Savannah</title>
        </Head>
        <div className={spinStyles.wrapper}>
          <Spinner />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Home | Savannah</title>
      </Head>
      <div className={styles.wrapper}>
        <Profile user={session?.user} />
        <div className={styles.selection}>
          <h3>Users From Local DB</h3>
          <UsersList users={users} fetchedFrom={'db'} />
        </div>
        <div className={styles.selection}>
          <h3>Users From Json Placeholder</h3>
          <UsersList users={jsonData} fetchedFrom={'json'} />
        </div>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const albums = await prisma.album.findMany()
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          albums: true,
        },
      },
    },
  })

  const { data: externalUsers } = await axiosInstance.get('/users')
  return {
    props: {
      users,
      externalUsers,
      albums,
    },
  }
}
