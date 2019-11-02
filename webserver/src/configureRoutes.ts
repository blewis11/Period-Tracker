import { isEmpty } from 'ramda'

import { calculateAverageCycle } from './utils/calculateAverageCycle'

const configureRoutes = (app: any, models: any) => {
  const { User, UserSymptom, Symptom } = models

  app.get('/', (_: any, res: any) => {
    res.send('fallback endpoint\n');
  })

  //------------------ debugging endpoints:
  app.get('/users', async (_: any, res: any) => {
    try {
      var result = await User.find().exec();
      res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
  })

  app.get('/symptoms', async (_: any, res: any) => {
    try {
      var result = await Symptom.find().exec();
      res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
  })

  app.get('/user/symptoms', async (_: any, res: any) => {
    try {
      var result = await UserSymptom.find().exec();
      res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
  })

  //------------------ 

  app.post('/events', async (req: any, res: any) => {
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

    // if the symptom is a period heaviness, and an entity already exists on the same day -> overwrite
    // if symptom not for period heaviness, and entity already exists on the same day -> do not insert
    
    if (!symptom || isEmpty(symptom)) {
      console.log(`no symptom found, aborting`)
      res.status(422).send("Could not process request") // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }

    let data = {}
    try {
      data = await UserSymptom.create({
        userId,
        symptomId,
        timeStamp: new Date(timestamp)
      })

      const averageCycle = await calculateAverageCycle(UserSymptom, userId)
      await User.where({'id': userId}).update({ $set: { cycleAverage: averageCycle }}).exec()
    } catch (e) {
      throw e
    }

    res.json(data)
  })

  app.get('/cycles/average', (req: any, res: any) => {
    //calculate average
    res.send('todo')
  })

}

export default configureRoutes
