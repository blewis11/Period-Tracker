import * as express from 'express'
import * as bodyParser from 'body-parser'

import { connect } from './database/connect'

import configureRoutes from './configureRoutes'

const { models } = connect()

console.log({models})

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

configureRoutes(app, models)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
