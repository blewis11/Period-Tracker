import * as express from 'express'
import * as bodyParser from 'body-parser'

import connect from './database/connect'
import seedDatabase from './database/seedDatabase'
import createModels from './database/createModels'

import configureRoutes from './configureRoutes'

const { mongoose, db } = connect()

const models = createModels(mongoose)

seedDatabase(mongoose, models)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

configureRoutes(app, models)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
