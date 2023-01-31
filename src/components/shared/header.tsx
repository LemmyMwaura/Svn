import Link from 'next/link'
import styles from '@/styles/Home.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <Link className={styles.link} href="/home">
        Home
      </Link>
    </div>
  )
}

export default Header
