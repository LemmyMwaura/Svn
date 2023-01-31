// hooks
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { Prisma } from '@prisma/client'

// items
import Profile from '@/components/shared/profile'
import AlbumList from '@/components/album/albumList'
import styles from '@/styles/User.module.scss'

// utils
import { prisma } from '@/lib/prisma.util'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Props {
  user: Prisma.UserSelect
  albums: Prisma.AlbumSelect[] | any[]
}

type Inputs = {
  title: string
}

const UserDetail = ({ user, albums }: Props) => {
  const [isOwner, setIsOwner] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const userId = parseInt(router.query.id as string)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    if (session?.user?.email === user?.email) {
      setIsOwner(true)
    }
  }, [session, user])

  const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
    try {
      const promise = axios.post('/api/album/create', { title, userId })
      await toast.promise(promise, {
        loading: 'Adding...',
        success: () => `Album was Successfully added`,
        error: (err) => `This just happened: ${err.toString()}`,
      })
    } catch (err) {}
    reset()
    router.replace(router.asPath)
  }

  return (
    <>
      <Head>
        <title> DbUser | {user?.name}</title>
      </Head>
      <div className={styles.wrapper}>
        <Profile user={user} />
        <div className={styles.selection}>
          <h3>Albums</h3>
          <AlbumList albums={albums} />
        </div>
        {isOwner && (
          <div className={styles.form_wrapper}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.fields_wrapper}
            >
              <h3 className={styles.title}>Add Album</h3>
              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  placeholder="Update title"
                  className={styles.input}
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <div className={styles.error}>Field is required</div>
                )}
                <button
                  className={styles.btn}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default UserDetail

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      albums: true,
    },
  })

  return {
    props: {
      user,
      albums: user?.albums,
    },
  }
}
