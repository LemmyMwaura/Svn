import { useState } from 'react'

interface Props {
  toggle: () => void
}

const Signup = ({ toggle }: Props) => {
  const [show, setShow] = useState(false)

  const togglePass = () => {
    setShow((prev) => !prev)
  }

  return (
    <div>
      <form action="">
        <h3>SignUp</h3>
        <div>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email" />
          <div>
            <input type={show ? 'text' : 'password'} placeholder="Password" />
            <span onClick={togglePass}>Icon</span>
          </div>
          <div>
            <input type={show ? 'text' : 'password'} placeholder="Confirm Password" />
            <span onClick={togglePass}>Icon</span>
          </div>
          <button>Sign Up</button>
        </div>
        <div>
          Already have an account<button onClick={toggle}>Login</button>
        </div>
      </form>
    </div>
  )
}

export { Signup }
