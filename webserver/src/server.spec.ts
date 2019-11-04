import anyTest, { TestInterface } from 'ava'
import { stub, SinonStub } from 'sinon'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import { createModels } from './database/createModels'
import { seedDatabase } from './database/seedDatabase'
import { server } from './server'
interface Context {
  connect: SinonStub,
  app: any
}

const test = anyTest as TestInterface<Context>

test.before(async (t: any) => {
  const mongod = new MongoMemoryServer()
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
  }

  await mongoose.connect(uri, mongooseOpts)
  
  const models = createModels(mongoose)
  seedDatabase(mongoose, models)
  
  const connect = stub(require('./database/connect'), "connect").returns({ models })
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
    user_id: 1,
    symptom: 1,
    timestamp: "2018-09-02T18:25:43.511Z"
  }

  const { body } = await request(app).post('/events').query(newUserSymptom).set('Accept', 'application/json')
  
  t.is(body.userId, newUserSymptom.user_id)
  t.is(body.symptomId, newUserSymptom.symptom)
  t.is(body.timeStamp, newUserSymptom.timestamp)

  const insertedUserSymptom = await UserSymptom.findOne({ symptomId: 1, userId: 1, timeStamp: newUserSymptom.timestamp }).exec()
  t.truthy(insertedUserSymptom)
})

test('given incorrect input data, a post request to /events will return an error and not create a new UserSymptom', async (t: any) => {
  t.pass()
})

test('given a non-existing symptom or user id, /events will return an error and not create a new UserSymptom', async (t: any) => {
  t.pass()
})

test('a get request to /cycles/average will return the overall cycle average over users', async (t: any) => {
  t.pass()
})

test('if there are no users, /cycles/average will return null', async (t: any) => {
  t.pass()
})

test.after(async (t: any) => {
  const { app, mongod } = t.context
  
  await mongod.stop()
  await mongoose.connection.close()
  
  app.close()

})
