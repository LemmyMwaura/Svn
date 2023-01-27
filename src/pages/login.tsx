import Head from 'next/head'
import { useState } from 'react'
import { Login as LoginComponent } from '@/components/login'
import { Signup as SignupComponent } from '@/components/signup'
import styles from '@/styles/Auth.module.css'

const Login = () => {
  const [isLogin, setMode] = useState<boolean>(true)

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
