import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

// Use environment variable if set, otherwise use /api/graphql in production or localhost in dev
const graphqlUri = import.meta.env.VITE_GRAPHQL_URL ||
  (import.meta.env.PROD ? '/api/graphql' : 'http://localhost:4000/graphql')

const httpLink = createHttpLink({
  uri: graphqlUri,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client
