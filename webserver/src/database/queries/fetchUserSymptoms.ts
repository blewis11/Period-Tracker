const fetchUserSymptoms = async (UserSymptom: any, userId: number) => {
  return UserSymptom.find({ userId })
    .where('symptomId').in([1, 2, 3])
    .sort({ timeStamp: 'asc' }).exec()
}

export {
  fetchUserSymptoms
}
