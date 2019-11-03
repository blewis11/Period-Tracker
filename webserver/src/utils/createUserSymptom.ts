
import { includes } from 'ramda'

import { calculateAverageCycle } from './calculateCycleAverage'

const ACTIVE_PERIOD_SYMPTOM_IDS = ['1', '2', '3']

// if the symptom is a period heaviness, and an entity already exists on the same day -> overwrite
// if symptom not for period heaviness, and entity already exists on the same day -> do not insert

const createUserSymptom = async (models: any, requestParams: any) => {
  const { UserSymptom, User } = models
  const { 
    user_id: userId,
    symptom: symptomId,
    timestamp
  } = requestParams

  let data = {}
  try {
    data = await UserSymptom.create({
      userId,
      symptomId,
      timeStamp: new Date(timestamp)
    })
    
    if (includes(symptomId, ACTIVE_PERIOD_SYMPTOM_IDS)) {
      const averageCycle = await calculateAverageCycle(UserSymptom, userId)
      await User.where({'id': userId }).updateOne({ $set: { cycleAverage: averageCycle }}).exec()
    }
  } catch (e) {
    throw e
  }

  return data
}

export default createUserSymptom
