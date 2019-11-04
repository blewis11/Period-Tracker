import { Model } from 'mongoose'

import { UserSymptomType } from '../schema/userSymptom'

const fetchUserSymptoms = async (UserSymptom: Model<UserSymptomType>, userId: string) => {
  return UserSymptom.find({ userId })
    .where('symptomId').in([1, 2, 3])
    .sort({ timeStamp: 'asc' }).exec()
}

export {
  fetchUserSymptoms
}
