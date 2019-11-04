import { Model } from 'mongoose'

import { UserType } from '../schema/user'

const fetchAllAverageCycles = (User: Model<UserType>) => {
  return User.find({}, 'cycleAverage').exec()
}

export {
  fetchAllAverageCycles
}
