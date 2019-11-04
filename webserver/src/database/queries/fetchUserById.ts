import { Model } from 'mongoose'

import { UserType } from '../schema/user'

const fetchUserByid = (User: Model<UserType>, userId: number) => {
  return User.findOne({ id: userId }).exec()
}

export {
  fetchUserByid
}
