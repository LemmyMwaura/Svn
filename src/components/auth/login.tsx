// hooks
import { useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'

// utils
import toast from 'react-hot-toast'
import axios from 'axios'

// icons & styles
import { FiGithub } from 'react-icons/fi'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { AiOutlineGoogle } from 'react-icons/ai'
import styles from '@/styles/Auth.module.scss'

interface Props {
  toggle: () => void
}

type Inputs = {
  email: string
  password: string
}

const Login = ({ toggle }: Props) => {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ reValidateMode: 'onChange' })

  const togglePass = () => {
    setShow((prev) => !prev)
  }

  const handleSignIn = async (provider: string, e: MouseEvent<any>) => {
    await signIn(provider, {
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/home`,
    })
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    // toast doesn't fully catch the err so we wrap this in a try catch block
    try {
      const promise = axios.post('/api/login', { email, password })
      await toast.promise(promise, {
        loading: 'Logging In',
        success: () => `Successfully Logged in`,
        error: (err) => `This just happened: ${err.message.toString()}`,
      })
    } catch (err) {}

    reset()
    router.push('/home')
  }

  return (
    <div>
      <div className={styles.container}>
        <h3>Login</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.fields_wrapper}
        >
          <input
            className={styles.input}
            type="text"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className={styles.error}>Email is required</span>
          )}

          <div className={styles.password}>
            <input
              className={styles.input}
              type={show ? 'text' : 'password'}
              placeholder="password"
              {...register('password', { required: true })}
            />
            <span className={styles.icon} onClick={togglePass}>
              {show ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {errors.password && (
            <span className={styles.error}>Password is required</span>
          )}
          <button type="submit" className={styles.provider_btn}>
            Login
          </button>
        </form>
        <div className={styles.fields_wrapper}>
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
