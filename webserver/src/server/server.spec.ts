import mongoose from 'mongoose'
import request from 'supertest'
import anyTest, { TestInterface } from 'ava'
import { Express } from 'express'
import { stub, SinonStub } from 'sinon'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { differenceInCalendarDays } from 'date-fns'

import { createModels, Models } from '../database/createModels'
import { seedDatabase } from '../database/seedDatabase'
import { server } from './server'

interface Context {
  connect: SinonStub,
  app: Express,
  models: Models,
  mongod: MongoMemoryServer
}

const test = anyTest as TestInterface<Context>

test.before(async (t: any) => {
  const mongod = new MongoMemoryServer()
  const uri = await mongod.getConnectionString()

  const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
  }

  await mongoose.connect(uri, mongooseOpts)
  
  const models = createModels(mongoose)
  seedDatabase(models)
  
  const connect = stub(require('../database/connect'), "connect").returns({ models })
  const serverInstance = server()
  const app = serverInstance.listen(8081, '0.0.0.0')

  t.context = {
    ...t.context,
    connect,
    app,
    models,
    mongod
  }
})

test('given correct input data, a post request to /events should create a new UserSymptom', async (t: any) => {
  const { app, models } = t.context

  const { UserSymptom } = models

  const newUserSymptom = {
    user_id: "1",
    symptom: "1",
    timestamp: "2019-04-25T18:25:43.511Z"
  }

  const { body } = await request(app).post('/events').query(newUserSymptom).set('Accept', 'application/json')
  
  t.is(newUserSymptom.user_id, newUserSymptom.user_id)
  t.is(newUserSymptom.symptom, newUserSymptom.symptom)
  t.is(body.timeStamp, newUserSymptom.timestamp)

  const insertedUserSymptom = await UserSymptom.findOne({ symptomId: 1, userId: 1, timeStamp: newUserSymptom.timestamp }).exec()
  t.truthy(insertedUserSymptom)
})

test('given incorrect input data, a post request to /events will return an error', async (t: any) => {
  const { app } = t.context

  const lacksUserId = {
    symptom: "1",
    timestamp: "2018-10-10T18:25:43.511Z"
  }

  const lacksSymptomId = {
    user_id: "1",
    timestamp: "2018-10-11T18:25:43.511Z"
  }

  const lacksTimestamp = {
    user_id: "1",
    symptom: "1",
  }

  const invalidDate = {
    user_id: "1",
    symptom: "1",
    timestamp: "lol"
  }

  const itemsToInsert = [ lacksUserId, lacksSymptomId, lacksTimestamp, invalidDate ]

  for (let i = 0; i < itemsToInsert.length; i++ ){
    const item = itemsToInsert[i]
    const { text } = await request(app).post('/events').query(item).set('Accept', 'application/json')
    t.is(text, 'invalid request')
  }
})

test('given a non-existing symptom or user id, /events will return an error', async (t: any) => {
  const { app } = t.context

  const nonExistentUserId = {
    user_id: "5",
    symptom: "1",
    timestamp: "2018-10-12T18:25:43.511Z"
  }

  const nonExistentSymptomId = {
    user_id: "1",
    symptom: "10",
    timestamp: "2018-10-12T18:25:43.511Z"
  }

  const itemsToInsert = [ nonExistentSymptomId, nonExistentUserId ]

  for (let i = 0; i < itemsToInsert.length; i++ ){
    const item = itemsToInsert[i]
    const { text } = await request(app).post('/events').query(item).set('Accept', 'application/json')
    t.is(text, 'Could not process request')
  }
})

test('a get request to /cycles/average will return the overall cycle average over users', async (t: any) => {
  const { app } = t.context

  const userSymptomsToInsert = [
    {
      user_id: "2",
      symptom: "6",
      timestamp: "2018-10-12T18:25:43.511Z"
    },
    {
      user_id: "2",
      symptom: "2",
      timestamp: "2018-10-13T18:25:43.511Z" // one day period
    },
    {
      user_id: "2",
      symptom: "1",
      timestamp: "2018-11-10T18:25:43.511Z"
    },
    {
      user_id: "2",
      symptom: "3",
      timestamp: "2018-11-11T18:25:43.511Z"
    },
  ]

  await Promise.all(userSymptomsToInsert.map(async (item) => {
    return request(app).post('/events').query(item).set('Accept', 'application/json')
  }))
  
  const averageCycle = differenceInCalendarDays(
    new Date(userSymptomsToInsert[2].timestamp), 
    new Date(userSymptomsToInsert[1].timestamp)
  ) / 2 // divide by two as there are two users

  const { body } = await request(app).get('/cycles/average')
  const { average_cycle: { length }} = body
  t.is(length, averageCycle)
})

test('if there are no users, /cycles/average will return null', async (t: any) => {
  const { app } = t.context

  const fetchAllAverageCycles = stub(require('../database/queries/fetchAllAverageCycles'), "fetchAllAverageCycles").resolves([])
  const { body } = await request(app).get('/cycles/average')
  const { average_cycle: { length }} = body
  fetchAllAverageCycles.restore()
  
  t.pass(length, null)
})

test.after(async (t: any) => {
  const { app, mongod, connect } = t.context

  connect.restore()

  await mongod.stop()
  await mongoose.connection.close()
  
  app.close()

})
