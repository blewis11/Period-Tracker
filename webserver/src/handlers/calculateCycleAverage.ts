import fetchAllAverageCycles from '../database/queries/fetchAllAverageCycles'

const calculateCycleAverage =  async (res: any, models: any) => {
  const { User } = models
  const users = await fetchAllAverageCycles(User)

  let averagesTotal = 0

  const averages = users.map((user: any) => {
    const { cycleAverage } = user
    averagesTotal += cycleAverage
  })

  const overallAverage = averagesTotal / (averages.length)
  res.json({overallAverage})
}

export default calculateCycleAverage
