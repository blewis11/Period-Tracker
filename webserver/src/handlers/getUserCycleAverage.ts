
const getUserCycleAverage = async (res: any, models: any, userId: number) => {
  const { User } = models

  let user
  try {
    user = await User.findOne({ id: userId }).exec()
  } catch (e) {
    throw e
  }

  if (user) {
    const cycleAverage = user.cycleAverage
    res.json({cycleAverage})
  } else {
    res.send(null)
  }
} 

export default getUserCycleAverage
