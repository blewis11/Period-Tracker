import { Mongoose, Model } from 'mongoose'
import { userSchema, UserType } from './schema/user'
import { symptomSchema, SymptomType } from './schema/symptom'
import { userSymptomSchema, UserSymptomType } from './schema/userSymptom'

interface Models {
  User: Model<UserType>,
  Symptom: Model<SymptomType>,
  UserSymptom: Model<UserSymptomType>
}

const createModels = (mongooseInstance: Mongoose): Models => {
  const User = mongooseInstance.model<UserType>('User', userSchema)
  const Symptom = mongooseInstance.model<SymptomType>('Symptom', symptomSchema)
  const UserSymptom = mongooseInstance.model<UserSymptomType>('UserSymptom', userSymptomSchema)

  return {
    User,
    Symptom,
    UserSymptom
  }
}

export {
  createModels,
  Models
}
