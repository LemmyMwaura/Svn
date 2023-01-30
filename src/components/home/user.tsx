import { useRouter } from 'next/router'
import { Prisma } from '@prisma/client'
import styles from '@/styles/Home.module.scss'

interface Props {
  user: Prisma.UserSelect
  fetchedFrom: string
}

const User = ({ user, fetchedFrom }: Props) => {
  const router = useRouter()

  const selectUser = () => {
    router.push(`/user/${fetchedFrom}/${user.id}`)
  }

  return (
    <div className={styles.user} onClick={selectUser}>
      <div>id: {user.id}</div>
      <div>name: {user.name}</div>
      <div>albums: {user?._count?.albums}</div>
    </div>
  )
}

export default User
