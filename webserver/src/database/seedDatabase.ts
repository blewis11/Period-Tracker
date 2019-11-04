import { Mongoose } from 'mongoose'
import { MongoError } from 'mongodb'
import { userData } from './defaultData/user'
import { symptomData } from './defaultData/symptom'
import { userSymptomData } from './defaultData/userSymptom'
import { Models } from './createModels'

const seedDatabase = async (mongooseInstance: Mongoose, models: Models) => {
  const { User, Symptom, UserSymptom } = models

  await User.collection.insert(userData, (err: MongoError, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('users were successfully stored.')
    }
  })

  await Symptom.collection.insert(symptomData, (err: MongoError, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('symptoms were successfully stored.')
    }
  })

  await UserSymptom.collection.insert(userSymptomData, (err: MongoError, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('userSymptoms were successfully stored.')
    }
  })
}

export {
  seedDatabase
}
