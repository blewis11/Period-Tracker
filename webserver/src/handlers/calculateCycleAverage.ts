import { isEmpty } from 'ramda' 
import { fetchAllAverageCycles } from '../database/queries/fetchAllAverageCycles'

const calculateCycleAverage =  async (res: any, models: any) => {
  const { User } = models
  
  let users
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

  const averages = users.map((user: any) => {
    const { cycleAverage } = user
    averagesTotal += cycleAverage
  })

  const overallAverage = averagesTotal / (averages.length)
  res.json({
    average_cycle: {
      length: overallAverage
    } 
  })
}

export {
  calculateCycleAverage
}
