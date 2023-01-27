import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import styles from '@/styles/Auth.module.scss'

interface Props {
  toggle: () => void
}

const Signup = ({ toggle }: Props) => {
  const [show, setShow] = useState(false)
  const [showcp, setCShow] = useState(false)

  const togglePass = () => {
    setShow((prev) => !prev)
  }

  const toggleConfirmPass = () => {
    setCShow((prev) => !prev)
  }

  return (
    <div>
      <form action="" className={styles.container}>
        <h3>SignUp</h3>
        <div className={styles.fields_wrapper}>
          <input className={styles.input} type="text" placeholder="Username" />
          <input className={styles.input} type="text" placeholder="Email" />
          <div className={styles.password}>
            <input
              className={styles.input}
              type={show ? 'text' : 'password'}
              placeholder="Password"
            />
            <span className={styles.icon} onClick={togglePass}>
              {show ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          <div className={styles.password}>
            <input
              className={styles.input}
              type={showcp ? 'text' : 'password'}
              placeholder="Confirm Password"
            />
            <span className={styles.icon} onClick={toggleConfirmPass}>
              {showcp ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          <button className={styles.login_btn}>Sign Up</button>
        </div>
        <div className={styles.footer}>
          Already have an account<span onClick={toggle}>Login</span>
        </div>
      </form>
    </div>
  )
}

export { Signup }
