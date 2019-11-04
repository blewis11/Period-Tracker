import { userData } from './defaultData/user'
import { symptomData } from './defaultData/symptom'
import { userSymptomData } from './defaultData/userSymptom'

const seedDatabase = async (mongooseInstance: any, models: any) => {
  const { User, Symptom, UserSymptom } = models

  await User.collection.insert(userData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('users were successfully stored.')
    }
  })

  await Symptom.collection.insert(symptomData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('symptoms were successfully stored.')
    }
  })

  await UserSymptom.collection.insert(userSymptomData, (err: any, docs: any) => {
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
