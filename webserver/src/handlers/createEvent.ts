
import { isEmpty } from 'ramda'

import { createUserSymptom }  from '../utils/createUserSymptom'
import { fetchSymptomById } from '../database/queries/fetchSymptomById'
import { fetchUserByid } from '../database/queries/fetchUserById'

const createEvent = async (req: any, res: any, models: any) => {
  const { Symptom, User } = models

  const body = req.query

  const {
    user_id: userId,
    symptom: symptomId,
    timestamp
  } = body

  if (!userId || !symptomId || !timestamp|| isNaN(new Date(timestamp).getTime())){
    res.send("invalid request") // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
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
    res.send("Could not process request") // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
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
