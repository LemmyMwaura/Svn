import { useState } from 'react'

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
      <form>
        <h3>Login</h3>
        <div>
          <input type="text" placeholder="Email" />
          <div>
            <input type={show ? 'text' : 'password'} placeholder="password" />
            <span onClick={togglePass}>Icon</span>
          </div>
          <button>Login</button>
        </div>
        <button>Sign In With Google</button>
        <button>Sign In With Github</button>
        <div>
          dont have an account yet<button onClick={toggle}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export { Login }
