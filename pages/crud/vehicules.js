import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import Nav from '../../components/nav'
import Navitem from '../../components/Navitem'
import CustomerList from '../../components/CustomerList'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      pseudo
      email
    }
  }
`

const Vehicules = () => {
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
        <Nav pro={viewer.pseudo}>
        <Navitem href="../profile" navi="Acceuil"></Navitem>
        <Navitem href="./vehicules" navi="V&eacute;hicules" isActive></Navitem>
        <Navitem href="./reparateurs" navi="R&eacute;parateurs"></Navitem>
        <Navitem href="/recent" navi="Interventions"></Navitem>
        </Nav>
     <CustomerList
     />
      </div>
    )
  }

  return <p>Loading...</p>
}

export default Vehicules
