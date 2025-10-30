import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

// Use environment variable if set, otherwise default to localhost
// In production, set VITE_GRAPHQL_URL to your deployed backend URL
const graphqlUri = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: graphqlUri,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client
