import express, { Express } from 'express'
import bodyParser from 'body-parser'

import { connect } from './database/connect'

import { configureRoutes } from './configureRoutes'

const server = (): Express => {
  const { models } = connect()

  const app: Express = express()

  configureRoutes(app, models)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded())

  return app
}

export {
  server
}

