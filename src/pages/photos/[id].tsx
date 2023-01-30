import Head from 'next/head'

// hooks
import { prisma } from '@/lib/prisma.util'
import { GetServerSideProps } from 'next'
import { Prisma } from '@prisma/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

// extras
import Photo from '@/components/photos/photo'
import styles from '@/styles/Photos.module.scss'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Props {
  photo: Prisma.PhotosSelect
  album: Prisma.AlbumSelect
  user: Prisma.UserSelect
}

type Inputs = {
  title: string
}

const PhotoDetails = ({ photo, album, user }: Props) => {
  const [isOwner, setIsOwner] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email === user?.email) {
      setIsOwner(true)
    }
  }, [session, user])

  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
    const { id } = photo
    try {
      const isValid = axios.post('/api/photos/update', { id, title })
      await toast.promise(isValid, {
        loading: 'Updating',
        success: () => `Update Success`,
        error: (err) => `This just happened: ${err.toString()}`,
      })
    } catch (err) {}

    router.replace(router.asPath)
    reset()
  }

  return (
    <>
      <Head>
        <title> Photo | {photo?.photoTitle}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.photos_details}>
          <div className={styles.photos}>
            <Photo photo={photo} album={album} />
          </div>
        </div>
        {isOwner && (
          <div className={styles.form_wrapper}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.fields_wrapper}
            >
              <span>Title</span>
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
              </div>
              <button className={styles.btn} type="submit">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default PhotoDetails

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const photo = await prisma.photos.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      album: {
        include: {
          user: true,
        },
      },
    },
  })

  return {
    props: {
      photo,
      album: photo?.album,
      user: photo?.album.user,
    },
  }
}
