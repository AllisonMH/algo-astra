import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import cors from 'cors'
import schema from './schema/schema.js'
import resolvers from './schema/resolvers.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())

app.all('/graphql', createHandler({
  schema: schema,
  rootValue: resolvers,
}))

app.listen(PORT, () => {
  console.log(`🚀 GraphQL server running at http://localhost:${PORT}/graphql`)
})
