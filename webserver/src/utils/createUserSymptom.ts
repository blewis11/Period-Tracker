
import { Request } from 'express'

import { calculateAverageCycle } from './calculateCycleAverage'
import { setUserCycleAverage } from '../database/queries/setUserCycleAverage'
import { createUserSymptomInDb } from '../database/queries/createUserSymptom'
import { Models } from '../database/createModels'

import { UserSymptomType } from '../database/schema/userSymptom'
const ACTIVE_PERIOD_SYMPTOM_IDS = ['1', '2', '3']

// if the symptom is a period heaviness, and an entity already exists on the same day -> overwrite
// if symptom not for period heaviness, and entity already exists on the same day -> do not insert

const createUserSymptom = async (models: Models, requestParams: Request): Promise<UserSymptomType | {} > => {
  const { UserSymptom, User } = models
  const { 
    user_id: userId,
    symptom: symptomId,
  } = requestParams

  let data = {}
  
  try {
    data = await createUserSymptomInDb(UserSymptom, requestParams)
    
    if ((ACTIVE_PERIOD_SYMPTOM_IDS).indexOf(symptomId) > -1) {
      const averageCycle = await calculateAverageCycle(UserSymptom, userId)
      await setUserCycleAverage(User, averageCycle, userId)
    }
  } catch (e) {
    throw e
  }

  return data
}

export {
  createUserSymptom
}
