import { Model } from 'mongoose'

import { UserType } from '../schema/user'

const setUserCycleAverage = (User: Model<UserType>, cycleAverage: number, userId: string) => {
  // @ts-ignore --- ignoring the following since @types/mongoose doesn't contain where(object)
  return User.where({'id': userId }).updateOne({ $set: { cycleAverage: cycleAverage }}).exec()
}

export {
  setUserCycleAverage
}
