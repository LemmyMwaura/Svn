import { Prisma } from '@prisma/client'
import User from '@/components/home/user'

interface Props {
  users: Prisma.UserSelect[]
}

const UsersList = ({ users }: Props) => {
  return (
    <div>
      {users.map((user, idx) => (
        <div key={idx}>
          <User user={user} />
        </div>
      ))}
    </div>
  )
}

export default UsersList
