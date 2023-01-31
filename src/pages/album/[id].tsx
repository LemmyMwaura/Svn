import Head from 'next/head'

//hooks
import { prisma } from '@/lib/prisma.util'
import { GetServerSideProps } from 'next'
import { Prisma } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

// extras
import Album from '@/components/album/album'
import PhotosList from '@/components/photos/photosList'
import styles from '@/styles/Album.module.scss'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Props {
  album: Prisma.AlbumSelect
  user: Prisma.UserSelect
  photos: Prisma.PhotosSelect[]
}

type Inputs = {
  title: string
  picture: File[]
}

const AlbumDetail = ({ album, user, photos }: Props) => {
  const [isOwner, setIsOwner] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const albumId = router.query.id
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>()

  useEffect(() => {
    if (session?.user?.email === user?.email) {
      setIsOwner(true)
    }
  }, [session, user])

  const onSubmit: SubmitHandler<Inputs> = async ({ title, picture }) => {
    const reader = new FileReader()
    reader.readAsDataURL(picture[0])

    reader.onload = async () => {
      try {
        const image = reader.result
        const promise = axios.post('/api/album/addphoto', {
          albumId,
          title,
          image,
        })
        await toast.promise(promise, {
          loading: 'Uploading',
          success: () => `Image was Successfully added`,
          error: (err) => `This just happened: ${err.toString()}`,
        })
      } catch (err) {}
      router.replace(router.asPath)
      reset()
    }
  }

  return (
    <>
      <Head>
        <title> Album | {album?.albumTitle}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.detail_album_list}>
          <Album album={album} user={user} />
        </div>
        <div className={styles.photos}>
          <h3>Photos</h3>
          <PhotosList photos={photos} />
        </div>
        {isOwner && (
          <div className={styles.form_wrapper}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.fields_wrapper}
            >
              <h3 className={styles.title}>Add Image</h3>
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
                <input
                  className={styles.input}
                  type="file"
                  {...register('picture', { required: true })}
                />
                {errors.picture && (
                  <div className={styles.error}>Image file is required</div>
                )}
              </div>
              <button disabled={isSubmitted} className={styles.btn} type="submit">
                Upload
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default AlbumDetail

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const album = await prisma.album.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      user: true,
      photos: true,
    },
  })

  return {
    props: {
      album,
      user: album?.user,
      photos: album?.photos,
    },
  }
}
