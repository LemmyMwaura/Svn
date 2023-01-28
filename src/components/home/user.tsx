import { Prisma } from '@prisma/client'

interface Props {
  user: Prisma.UserSelect
}

const User = ({ user }: Props) => {
  return <div>{user.name}</div>
}

export default User
