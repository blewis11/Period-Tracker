import userData from './data/userData'
import symptomsData from './data/symptomData'
import userSymptomsData from './data/userSymptonData'

const seedDatabase = (mongooseInstance: any, models: any) => {
  const { User, Symptom, UserSymptom } = models

  User.collection.insert(userData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('%d users were successfully stored.', docs.length);
    }
  })

  Symptom.collection.insert(symptomsData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('%d users were successfully stored.', docs.length);
    }
  })

  UserSymptom.collection.insert(userSymptomsData, (err: any, docs: any) => {
    if (err) {
      throw err
    } else {
        console.info('%d users were successfully stored.', docs.length);
    }
  })
}

export default seedDatabase
