import * as express from 'express'
import * as bodyParser from 'body-parser'
import { isEmpty } from 'ramda'

import connect from './database/connect'
import seedDatabase from './database/seedDatabase'
import createModels from './database/createModels'

const { mongoose, db } = connect()

const models = createModels(mongoose)
const { User, UserSymptom, Symptom } = models

seedDatabase(mongoose, models)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (_, res) => {
  res.send('fallback endpoint\n');
});

// debugging endpoints:
app.get('/users', async (_, res) => {
  try {
    var result = await User.find().exec();
    res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
})

app.get('/symptoms', async (_, res) => {
  try {
    var result = await Symptom.find().exec();
    res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
})

app.get('/user/symptoms', async (_, res) => {
  try {
    var result = await UserSymptom.find().exec();
    res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
})

app.post('/events', async (req, res) => {
  const body = req.query

  const {
    user_id: userId,
    symptom: symptomId,
    timestamp
  } = body

  if (!userId || !symptomId || !timestamp){
    res.status(400).send("invalid request") // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }

  const symptom = await Symptom.find({ id: symptomId }).exec()
  console.log({symptom})
  
  if (!symptom || isEmpty(symptom)) {
    console.log(`no symptom found, aborting`)
    res.status(422).send("Could not process request") // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }

  const data = await UserSymptom.create({
    userId,
    symptomId,
    timestamp: new Date(timestamp)
  })

  res.json(data)
})

app.get('/cycles/average', (req, res) => {
  //calculate average
  res.send('todo')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
