
const getUserCycleAverage = async (res: any, models: any, userId: number) => {
  const { User } = models
  const user = await User.find({ id: userId}).exec()
  res.send(user.cycleAverage)
} 
