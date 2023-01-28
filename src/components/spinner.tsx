import { useState } from 'react'
import BarLoader from 'react-spinners/BarLoader'
import styles from '@/styles/Utils.module.scss'

const Spinner = () => {
  const [color] = useState<string>('#3fcf8e')

  return (
    <div className={styles.spinner}>
      <BarLoader
        className={styles.loader}
        color={color}
        height={10}
        width={250}
        speedMultiplier={1}
      />
    </div>
  )
}

export default Spinner
