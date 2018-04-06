import setupGraphQLServer from "./server"
import * as functions from "firebase-functions/lib/index"

/* CF for Firebase with apollo-server-express */
const graphQLServer = setupGraphQLServer()

const graphqlservice = functions.https.onRequest(graphQLServer)

export { graphqlservice }