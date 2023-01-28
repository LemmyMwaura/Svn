/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { imagePlaceholder } from '@/helpers/profile.util'
import toast from 'react-hot-toast'
import styles from '@/styles/Home.module.scss'

type userDetails = string | null | undefined

interface Props {
  user:
    | {
        name?: userDetails
        email?: userDetails
        image?: userDetails
      }
    | undefined
}

const Profile = ({ user }: Props) => {

  useEffect(() => {
    if (!user) return
    toast.success(`Welcome ${user.name}`)
  }, [user])

  const handleSignOut = () => {
    signOut()
  }

  const image = user?.image ?? imagePlaceholder

  return (
    <div>
      <div className={styles.bio}>
        <img className={styles.image} src={image} alt="User Profile Image" />
        <div className={styles.detail}>
          <div className={styles.name}>{user?.name}</div>
          <button className={styles.btn} onClick={handleSignOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
