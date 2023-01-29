import { Prisma } from '@prisma/client'
import styles from '@/styles/Home.module.scss'

interface Props {
  user: Prisma.UserSelect
}

const User = ({ user }: Props) => {
  return (
    <div className={styles.user}>
      <div>id: {user.id}</div>
      <div>name: {user.name}</div>
      <div>albums: {user?._count?.albums}</div>
    </div>
  )
}

export default User
