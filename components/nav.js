import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
export default function Nav({ children, pro, nm }) {
    return (
      <nav className={styles.nav}>
          <div>
          <span className={styles.llo}>Leloux</span>
        <ul className={styles.nl}>
          {children}
        </ul>
          </div>
        <div>
            <div className={styles.cre}>
            <div className={styles.avatar}>{nm}</div>
            <span className={styles.pro}>{pro}</span>
            <Link href="/signout">
          <button className={styles.sob}>D&eacute;connexion</button>
        </Link>
            </div>

        </div>
      </nav>
    )
  }
  