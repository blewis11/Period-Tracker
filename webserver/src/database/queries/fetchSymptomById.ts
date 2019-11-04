import { Model } from 'mongoose'

import { SymptomType } from '../schema/symptom'

const fetchSymptomById = (Symptom: Model<SymptomType>, symptomId: number) => {
  return Symptom.findOne({ id: symptomId }).exec()
}

export {
  fetchSymptomById
}
