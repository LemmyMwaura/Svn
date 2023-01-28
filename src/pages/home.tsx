import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma.util'
import { Prisma } from '@prisma/client'

// components
import Profile from '@/components/profile'
import Spinner from '@/components/spinner'

// styles
import spinStyles from '@/styles/Utils.module.scss'
import styles from '@/styles/Home.module.scss'

interface Props {
  // TODO: improve typesafety
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
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const users = await prisma.user.findMany()

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
