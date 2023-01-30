import { Prisma } from '@prisma/client'
import User from '@/components/home/user'
import styles from '@/styles/Home.module.scss'

interface Props {
  users: Prisma.UserSelect[]
  fetchedFrom: string
}

const UsersList = ({ users, fetchedFrom }: Props) => {
  return (
    <div className={styles.userlist}>
      {users.length &&
        users.map((user, idx) => (
          <div key={idx}>
            <User user={user} fetchedFrom={fetchedFrom} />
          </div>
        ))}
    </div>
  )
}

export default UsersList
