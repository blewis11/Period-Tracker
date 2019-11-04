const fetchAllAverageCycles = (User: any) => {
  return User.find({}, 'cycleAverage').exec()
}

export {
  fetchAllAverageCycles
}
