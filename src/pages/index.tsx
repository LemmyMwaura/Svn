import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Landing.module.scss'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Album Visuals</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by creating an account and adding&nbsp;
            <code className={styles.code}>albums</code>
          </p>
          <div>
            <Link className={styles.link} href={"/login"}>Login</Link>
          </div>
        </div>
        <div className={styles.card}>
          <div className={inter.className}>
            <p>
              View a Users Albums
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
