const fetchSymptomById = (Symptom: any, symptomId: number) => {
  return Symptom.findOne({ id: symptomId }).exec()
}

export default fetchSymptomById
