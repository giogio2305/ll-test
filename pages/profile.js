import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import Nav from '../components/nav'
import Navitem from '../components/Navitem'
import loadingScreen from '../components/loadingscreen'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      pseudo
      email
    }
  }
`

const Ehome = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(ViewerQuery)
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect])

  if (error) {
    return <p>{error.message}</p>
  }

  if (viewer) {
    return (
      <div>
        <Nav pro={viewer.pseudo} nm={viewer.pseudo.substring(0,2)}>
        <Navitem href="./profile" navi="Acceuil" isActive></Navitem>
        <Navitem href="./crud/vehicules" navi="V&eacute;hicules"></Navitem>
        <Navitem href="./crud/reparateurs" navi="R&eacute;parateurs"></Navitem>
        <Navitem href="/recent" navi="Interventions"></Navitem>
        </Nav>
        You're signed in as {viewer.email} goto{' '}
        <Link href="/about">
          <a>about</a>
        </Link>{' '}
        page. or{' '}
        <Link href="/signout">
          <a>signout</a>
        </Link>
      </div>
    )
  }

  return <loadingScreen
  msg="Loading..."
  ></loadingScreen>
}

export default Ehome
