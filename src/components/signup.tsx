import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import styles from '@/styles/Auth.module.scss'
import toast from 'react-hot-toast'
import axios from 'axios'

interface Props {
  toggle: () => void
}

type Inputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Signup = ({ toggle }: Props) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [showcp, setCShow] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ reValidateMode: 'onChange' })

  const passMatch = (): boolean => {
    const watchPasswords = watch(['password', 'confirmPassword'])
    if (watchPasswords[0] === watchPasswords[1]) {
      return true
    }
    return false
  }

  const togglePass = () => {
    setShow((prev) => !prev)
  }

  const toggleConfirmPass = () => {
    setCShow((prev) => !prev)
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ username:name, email, password }) => {
    const isValid = axios.post('/api/validate', email)
    await toast.promise(isValid, {
      loading: 'Validating',
      success: () => `Validation Success`,
      error: (err) => `This just happened: ${err.response.data.message.toString()}`,
    })

    const promise = axios.post('/api/users', { name, email, password })
    await toast.promise(promise, {
      loading: 'Creating Account',
      success: () => `Successfully Signed in`,
      error: (err) => `This just happened: ${err.response.data.message.toString()}`,
    })

    reset()
    // router.push("/home")
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <h3>SignUp</h3>
        <div className={styles.fields_wrapper}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            {...register('username', { required: true })}
          />
          {errors.username && (
            <span className={styles.error}>Your Username is required</span>
          )}
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className={styles.error}>Your Email is required</span>
          )}
          <div className={styles.password}>
            <input
              className={styles.input}
              type={show ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', { required: true })}
            />
            <span className={styles.icon} onClick={togglePass}>
              {show ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {errors.password && (
            <span className={styles.error}>Your Password is required</span>
          )}
          <div className={styles.password}>
            <input
              className={styles.input}
              type={showcp ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true })}
            />
            <span className={styles.icon} onClick={toggleConfirmPass}>
              {showcp ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className={styles.error}>Please Confirm Your password</span>
          )}
          {!passMatch() && (
            <span className={styles.error}>Passwords don`t match</span>
          )}
          <button
            disabled={!passMatch()}
            className={styles.login_btn}
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className={styles.footer}>
          Already have an account<span onClick={toggle}>Login</span>
        </div>
      </form>
    </div>
  )
}

export { Signup }
