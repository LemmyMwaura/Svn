import { useState } from 'react'
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
            <span className={styles.icon} onClick={togglePass}>Icon</span>
          </div>
          <button className={styles.provider_btn}>Login</button>
          <button className={styles.provider_btn}>Sign In With Google</button>
          <button className={styles.provider_btn}>Sign In With Github</button>
        </div>
        <div className={styles.footer}>
          dont have an account yet <span onClick={toggle}>Sign Up</span>
        </div>
      </form>
    </div>
  )
}

export { Login }
