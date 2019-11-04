
import { Request, Response } from 'express'

import { createUserSymptom }  from '../utils/createUserSymptom'
import { fetchSymptomById } from '../database/queries/fetchSymptomById'
import { fetchUserByid } from '../database/queries/fetchUserById'
import { Models } from '../database/createModels'

const createEvent = async (req: Request, res: Response, models: Models) => {
  const { Symptom, User } = models

  const body = req.query

  const {
    user_id: userId,
    symptom: symptomId,
    timestamp
  } = body

  if (!userId || !symptomId || !timestamp|| isNaN(new Date(timestamp).getTime())){
    res.send("invalid request") 
    return
  }

  let symptom
  let user

  try {
    symptom = await fetchSymptomById(Symptom, symptomId)
    user = await fetchUserByid(User, userId)
  } catch (e) {
    throw e
  }

  if (!symptom || !user) {
    res.send("Could not process request") 
    return 
  }

  let data 

  try { 
    data = await createUserSymptom(models, body)
  } catch (e) {
    throw e
  }
  
  res.json(data)
}

export {
  createEvent
}
