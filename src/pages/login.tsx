import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

// compoponents
import { Login as LoginComponent } from '@/components/login'
import { Signup as SignupComponent } from '@/components/signup'
import Spinner from '@/components/spinner'

// styles
import styles from '@/styles/Auth.module.scss'
import spinStyles from '@/styles/Utils.module.scss'

const Login = () => {
  const { data: session, status } = useSession()
  const [isLogin, setMode] = useState<boolean>(true)
  const router = useRouter()

  if(status === "loading") {
    return (
      <div className={spinStyles.wrapper}>
        <Spinner />
      </div>
    )
  }

  if (session?.user) {
    router.push('/home')
  }

  const toggle = () => {
    setMode((prev) => !prev)
  }

  return (
    <>
      <Head>
        <title>Login | Savannah</title>
      </Head>

      <div className={styles.auth_wrapper}>
        {isLogin && <LoginComponent toggle={toggle} />}
        {!isLogin && <SignupComponent toggle={toggle} />}
      </div>
    </>
  )
}

export default Login
