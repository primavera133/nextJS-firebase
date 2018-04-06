import * as functions from "firebase-functions"
import express from "express"
import cors from 'cors'

const callistoApp = express()
callistoApp.use(cors({origin: true}))
callistoApp.get("*", (request, response) => {
  response.send("Hello from Callisto, Express on Firebase!")
})

const callisto = functions.https.onRequest(callistoApp)

export { callisto };