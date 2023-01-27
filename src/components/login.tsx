import { useState, MouseEvent } from 'react'
import { signIn } from 'next-auth/react'
import styles from '@/styles/Auth.module.css'

// icons
import { FiGithub } from 'react-icons/fi'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { AiOutlineGoogle } from 'react-icons/ai'

interface Props {
  toggle: () => void
}

const Login = ({ toggle }: Props) => {
  const [show, setShow] = useState(false)

  const togglePass = () => {
    setShow((prev) => !prev)
  }

  const handleSignIn = async (provider: string, e: MouseEvent<any>) => {
    e.preventDefault()
    await signIn(provider, {
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/home`,
    })
  }

  return (
    <div>
      <div className={styles.container}>
        <h3>Login</h3>
        <div className={styles.fields_wrapper}>
          <input className={styles.input} type="text" placeholder="Email" />
          <div className={styles.password}>
            <input
              className={styles.input}
              type={show ? 'text' : 'password'}
              placeholder="password"
            />
            <span className={styles.icon} onClick={togglePass}>
              {show ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          <button className={styles.provider_btn}>Login</button>
          <div className={styles.middle}>
            <span>or</span>
          </div>
          <button
            className={styles.provider_btn}
            onClick={(e) => handleSignIn('google', e)}
          >
            <span>Sign In With</span>
            <AiOutlineGoogle />
          </button>
          <button
            className={styles.provider_btn}
            onClick={(e) => handleSignIn('github', e)}
          >
            <span>Sign In With</span>
            <FiGithub />
          </button>
        </div>
        <div className={styles.footer}>
          dont have an account yet <span onClick={toggle}>Sign Up</span>
        </div>
      </div>
    </div>
  )
}

export { Login }
