import * as mongoose from 'mongoose'

const connect = () => {
  const mongoDB = 'mongodb://db:27017/tracker_information'
  mongoose.connect(mongoDB, { useNewUrlParser: true })
  const db = mongoose.connection

  return {
    mongoose,
    db
  }
}

export default connect
