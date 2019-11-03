
import { isEmpty } from 'ramda'

import createUserSymptom from '../utils/createUserSymptom'

const createEvent = async (req: any, res: any, models: any) => {
  const { Symptom } = models

  const body = req.query

  const {
    user_id: userId,
    symptom: symptomId,
    timestamp
  } = body

  if (!userId || !symptomId || !timestamp){
    res.status(400).send("invalid request") // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }

  let symptom

  try {
    symptom = await Symptom.find({ id: symptomId }).exec()
  } catch (e) {
    throw e
  }
  
  if (!symptom || isEmpty(symptom)) {
    console.log(`no symptom found, aborting`)
    res.status(422).send("Could not process request") // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }

  let data = await createUserSymptom(models, body)
  
  res.json(data)
}

export default createEvent
