import styles from '../styles/Home.module.css'
export default function NavItem({ href, navi, isActive }) {
    return (
      <li className={styles.nil}>
        <a
          href={href}
          className={isActive ? styles.nvac : styles.nva}
        >
          {navi}
        </a>
      </li>
    )
  }
  