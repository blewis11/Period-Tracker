import express from 'express'
import * as bodyParser from 'body-parser'

import { connect } from './database/connect'

import { configureRoutes } from './configureRoutes'

const server = () => {
  const { models } = connect()

  const app = express()

  configureRoutes(app, models)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded())

  return app
}

export {
  server
}

