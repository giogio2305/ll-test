import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import '../styles/globals.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerList from '../components/CustomerList';
import Ehome from './profile';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (

    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>


  )
}
