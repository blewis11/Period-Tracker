const createUserSymptomInDb = (UserSymptom: any, requestData: any) => {
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
