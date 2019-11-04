const setUserCycleAverage = (User: any, cycleAverage: number, userId: number) => {
  return User.where({'id': userId }).updateOne({ $set: { cycleAverage: cycleAverage }}).exec()
}

export {
  setUserCycleAverage
}
