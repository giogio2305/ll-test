import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Field from '../components/field'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const SignUpMutation = gql`
  mutation SignUpMutation($pseudo: String!, $email: String!, $password: String!) {
    signUp(input: { pseudo: $pseudo, email: $email, password: $password }) {
      user {
        id
        pseudo
        email
      }
    }
  }
`

function SignUp() {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    const pseudoElement = event.currentTarget.elements.pseudo
    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      await signUp({
        variables: {
          pseudo: pseudoElement.value,
          email: emailElement.value,
          password: passwordElement.value,
        },
      })

      router.push('/signin')
    } catch (error) {
      console.log(error);
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <>
      <div className={styles.container}>
<Head>
        <title>Leloux employ&eacute;</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  <main className={styles.box}>
 <div className={styles.aff}></div>
 <div className={styles.form}>
   <div className={styles.spc}></div>
   <h2>Inscrivez-vous sur <span className={styles.ll}>Leloux</span></h2>
   {errorMsg && <p>{errorMsg}</p>}
   <div>
     <form onSubmit={handleSubmit}>
     <Field
name="pseudo"
type="text"
autoComplete="pseudo"
required
label="Nom"
src="/person-outline.svg"
alt="person"
placeholder="Ella Roger"
/>
       <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
          src="/at.svg"
          alt="person"
        placeholder="nom@mail.com"
        />
<Field
name="password"
type="password"
autoComplete="password"
required
label="Mot de passe"
src="/lock-open-outline.svg"
alt="lock"
placeholder="8+ caract&egrave;res"
/>
       
       <input type="submit" className={styles.ib} value="S'inscrire"></input>
     </form>
   </div>
 </div>
  </main>
</div>
    </>
  )
}

export default SignUp
