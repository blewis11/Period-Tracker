import userSchema from '../schema/user'
import symptomSchema from '../schema/symptom'
import userSymptomSchema from '../schema/userSymptom'

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
