import { Response } from 'express'
import { isEmpty } from 'ramda' 

import { fetchAllAverageCycles } from '../database/queries/fetchAllAverageCycles'
import { Models } from '../database/createModels'
import { UserType } from '../database/schema/user'

const calculateCycleAverage =  async (res: Response, models: Models) => {
  const { User } = models
  
  let users: UserType[]

  try {
    users = await fetchAllAverageCycles(User)
  } catch (e) {
    throw e
  }
  
  if (isEmpty(users)){
    res.json({
      average_cycle: {
        length: null
      } 
    })

    return
  }

  let averagesTotal = 0

  users.map((user: any) => {
    const { cycleAverage } = user
    averagesTotal += cycleAverage
  })

  const overallAverage = averagesTotal / (users.length)
  res.json({
    average_cycle: {
      length: overallAverage
    } 
  })
}

export {
  calculateCycleAverage
}
