import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { AiOutlineGoogle } from 'react-icons/ai'
import { FiGithub } from 'react-icons/fi'
import styles from '@/styles/Auth.module.css'

interface Props {
  toggle: () => void
}

const Login = ({ toggle }: Props) => {
  const [show, setShow] = useState(false)

  const togglePass = () => {
    setShow((prev) => !prev)
  }

  return (
    <div>
      <form className={styles.container}>
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
          <button className={styles.provider_btn}>
            <span>Sign In With</span>
            <AiOutlineGoogle />
          </button>
          <button className={styles.provider_btn}>
            <span>Sign In With</span>
            <FiGithub />
          </button>
        </div>
        <div className={styles.footer}>
          dont have an account yet <span onClick={toggle}>Sign Up</span>
        </div>
      </form>
    </div>
  )
}

export { Login }
