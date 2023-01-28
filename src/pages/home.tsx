import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Profile from '@/components/profile'
import Spinner from '@/components/spinner'
import spinStyles from '@/styles/Utils.module.scss'
import styles from '@/styles/Home.module.scss'

const Home = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className={spinStyles.wrapper}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <Profile user={session?.user} />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
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
    },
  }
}
