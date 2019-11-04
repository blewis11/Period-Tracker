import { Express } from 'express'

import { createEvent } from '../handlers/createEvent'
import { getUserCycleAverage } from '../handlers/getUserCycleAverage'
import { calculateCycleAverage } from '../handlers/calculateCycleAverage'

const configureRoutes = (app: Express, models: any) => {
  app.get('/', (_: any, res: any) => {
    res.send('fallback endpoint\n');
  })

  app.post('/events', async (req: any, res: any) => {
    await createEvent(req, res, models)
  })

  app.get('/cycles/average', async (_: any, res: any) => {
    await calculateCycleAverage(res, models)
  })

  app.get('/:userId/cycle/average', async (req: any, res: any) => {
    const { userId } = req.params
    await getUserCycleAverage(res, models, userId)
  })

}

export { configureRoutes }
