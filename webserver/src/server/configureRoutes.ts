import { Express, Request, Response } from 'express'
import { Model } from 'mongoose'

import { createEvent } from '../handlers/createEvent'
import { calculateCycleAverage } from '../handlers/calculateCycleAverage'

import { Models } from '../database/createModels'

const configureRoutes = (app: Express, models: Models) => {
  app.get('/', (_: Request, res: Response) => {
    res.send('fallback endpoint\n')
  })

  app.post('/events', async (req: Request, res: Response) => {
    await createEvent(req, res, models)
  })

  app.get('/cycles/average', async (_: Request, res: Response) => {
    await calculateCycleAverage(res, models)
  })
}

export { configureRoutes }
