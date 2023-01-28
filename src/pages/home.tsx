import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'

// libs/Utils
import { prisma } from '@/lib/prisma.util'
import { axiosInstance } from '@/lib/axios.util'

// components
import Profile from '@/components/profile'
import Spinner from '@/components/spinner'
import UsersList from '@/components/home/usersList'

// styles
import spinStyles from '@/styles/Utils.module.scss'
import styles from '@/styles/Home.module.scss'

interface Props {
  users: Prisma.UserSelect[]
}

const Home = ({ users }: Props) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
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
        <UsersList users={users} />
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const users = await prisma.user.findMany()
  const usersFromJson = await axiosInstance.get('/users')

  console.log({ users })
  console.log({ usersFromJson })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
      users,
    },
  }
}
