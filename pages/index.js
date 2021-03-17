import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'

import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      pseudo
      email
    }
  }
`
  const router = useRouter()
  const { data, loading, error } = useQuery(ViewerQuery)
  const viewer = data?.viewer
  var hr="/signin"
  if (viewer) { hr="/profile"}
  return (
    <div className={styles.container}>
      <Head>
        <title>Leloux by Archris</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenu sur <a href="#" className={styles.ll}>Leloux</a>
        </h1>
        <h3 className={styles.sub}>
          Votre r&eacute;parateur automobile en ligne
        </h3>
        <div className={styles.spcr}></div>
        <div className={styles.lico}>
          <a className={styles.al}><div className={styles.cardi}><span>Clients</span><Image src="/client.png" alt="Client leloux" width={500} height={500}/></div></a>
          <a className={styles.al}><div className={styles.cardi}><span>R&eacute;parateurs</span><Image src="/rep.png" alt="R&eacute;parateur leloux" width={500} height={500}/></div></a>
          
          <a className={styles.al} href={hr}><div className={styles.cardi}><span>Employ&eacute;s</span><Image src="/emp.png" alt="Employ&eacute; leloux" width={500} height={500}/></div></a>
          
        </div>

      </main>
    </div>
  )
}
