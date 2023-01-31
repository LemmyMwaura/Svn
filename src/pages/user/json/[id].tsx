import Head from 'next/head'
import { axiosInstance } from '@/lib/axios.util'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import styles from '@/styles/User.module.scss'
import Profile from '@/components/shared/profile'
import Header from '@/components/shared/header'

interface Props {
  user: any
}

const UserDetail = ({ user }: Props) => {
  const router = useRouter()
  const userId = router.query.id

  return (
    <>
      <Head>
        <title> JsonUser | {user.name} </title>
      </Head>
      <div className={styles.wrapper}>
        <Header />
        <Profile user={user} />
      </div>
    </>
  )
}

export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: users } = await axiosInstance.get('/users')
  const paths = users.map((user: any) => {
    return {
      params: { id: `${user.id}` },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { data: user } = await axiosInstance.get(`/users/${params.id}`)

  return {
    props: {
      user,
    },
  }
}
