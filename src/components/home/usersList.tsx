import { Prisma } from '@prisma/client'
import User from '@/components/home/user'
import styles from '@/styles/Home.module.scss'

interface Props {
  users: Prisma.UserSelect[]
}

const UsersList = ({ users }: Props) => {
  return (
    <div className={styles.userlist}>
      {users.length && users.map((user, idx) => (
        <div key={idx}>
          <User user={user} />
        </div>
      ))}
    </div>
  )
}

export default UsersList
