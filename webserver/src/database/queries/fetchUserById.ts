const fetchUserByid = (User: any, userId: number) => {
  return User.findOne({ id: userId }).exec()
}

export default fetchUserByid
