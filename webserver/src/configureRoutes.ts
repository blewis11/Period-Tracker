import createEvent from './handlers/createEvent'
import getUserCycleAverage from './handlers/getUserCycleAverage'

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
    await createEvent(req, res, models)
  })

  app.get('/cycles/average', (req: any, res: any) => {
    //calculate average
    res.send('todo')
  })

  app.get('/:userId/cycle/average', async (req: any, res: any) => {
    const { userId } = req.params
    await getUserCycleAverage(res, models, userId)
  })

}

export default configureRoutes
