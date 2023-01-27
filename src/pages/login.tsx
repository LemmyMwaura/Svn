import { Login as LoginComponent } from '@/components/login'
import { Signup as SignupComponent } from '@/components/signup'
import { useState } from 'react'

const Login = () => {
  const [isLogin, setMode] = useState<boolean>(true)

  const toggle = () => {
    setMode((prev) => !prev)
  }

  return (
    <div>
      {isLogin && <LoginComponent toggle={toggle} />}
      {!isLogin && <SignupComponent toggle={toggle} />}
    </div>
  )
}

export default Login
