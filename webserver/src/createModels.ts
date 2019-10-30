import userSchema from './schema/userSchema'
import symptomSchema from './schema/symptomSchema'
import userSymptomSchema from './schema/userSymptomSchema'

const createModels = (mongooseInstance: any) => {
  const User = mongooseInstance.model('User', userSchema)
  const Symptom = mongooseInstance.model('Symptom', symptomSchema)
  const UserSymptom = mongooseInstance.model('UserSymptom', userSymptomSchema)

  return {
    User,
    Symptom,
    UserSymptom
  }
}

export default createModels
