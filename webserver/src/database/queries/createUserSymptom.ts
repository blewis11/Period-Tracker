import { Model } from 'mongoose'
import { Request } from 'express'

import { UserSymptomType } from '../schema/userSymptom'

const createUserSymptomInDb = (UserSymptom: Model<UserSymptomType>, requestData: Request) => {
  const {
    user_id: userId,
    symptom: symptomId,
    timestamp
  } = requestData

  return UserSymptom.create({
    userId,
    symptomId,
    timeStamp: new Date(timestamp)
  })
}

export { 
  createUserSymptomInDb
}
