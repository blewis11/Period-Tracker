import { userData } from './defaultData/user'
import { symptomData } from './defaultData/symptom'
import { userSymptomData } from './defaultData/userSymptom'

const seedDatabase = (mongooseInstance: any, models: any) => {
  const { User, Symptom, UserSymptom } = models

  User.collection.insert(userData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('%d users were successfully stored.', docs.length);
    }
  })

  Symptom.collection.insert(symptomData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('%d users were successfully stored.', docs.length);
    }
  })

  UserSymptom.collection.insert(userSymptomData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('%d users were successfully stored.', docs.length);
    }
  })
}

export {
  seedDatabase
}
