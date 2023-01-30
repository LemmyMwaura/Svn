/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { imagePlaceholder } from '@/helpers/profile.util'
import { Prisma } from '@prisma/client'
import { useSession } from 'next-auth/react'
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
    | Prisma.UserSelect
}

const Profile = ({ user }: Props) => {
  const [currentUser, setCurrent] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email === user?.email) {
      setCurrent(true)
    }
  }, [session, user])

  const handleSignOut = () => {
    signOut()
  }

  const image = user?.image ?? (imagePlaceholder as any)

  return (
    <div>
      <div className={styles.bio}>
        <img className={styles.image} src={image} alt="User Profile Image" />
        <div className={styles.detail}>
          <div className={styles.name}>{user?.name}</div>
          {currentUser && (
            <button className={styles.btn} onClick={handleSignOut}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
