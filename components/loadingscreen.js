import styles from '../styles/Home.module.css'
export default function loadingScreen({msg}){
    return(
        <div className={styles.lc}>
            <p>{msg}</p>
        </div>
    )
}