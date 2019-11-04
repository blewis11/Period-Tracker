import mongoose from 'mongoose'

import { createModels } from './createModels'
import { seedDatabase } from './seedDatabase'

const connect = () => {
  const mongoDB = 'mongodb://db:27017/tracker_information'
  mongoose.connect(mongoDB, { useNewUrlParser: true })
  const db = mongoose.connection
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  const models = createModels(mongoose)

  seedDatabase(mongoose, models)

  return {
    db,
    models
  }
}

export {
  connect
}
