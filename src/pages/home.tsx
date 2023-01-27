import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { getSession, useSession, signOut } from 'next-auth/react'

const Home = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    ;('loading details')
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div>
      <div>{session?.user?.name}</div>
      <img
        src={session?.user?.image}
        width={100}
        height={100}
        alt="User Profile Image"
      />
      <button className='btn' onClick={handleSignOut}>Log Out</button>
      
      Welcome {JSON.stringify(session)}
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
