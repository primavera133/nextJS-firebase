import bodyParser from "body-parser"
import express from "express"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import schema from "./data/schema"
import { printSchema } from "graphql/utilities/schemaPrinter"

const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express()

  // /graphqlservice/graphql
  graphQLServer.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  )

  // /graphqlservice/graphiql
  graphQLServer.use(
    "/graphiql",
    graphiqlExpress({ endpointURL: "/graphqlservice/graphql" })
  )

  // /graphqlservice/schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain")
    res.send(printSchema(schema))
  })

  return graphQLServer
}

export default setupGraphQLServer