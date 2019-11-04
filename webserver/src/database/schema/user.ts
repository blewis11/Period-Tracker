import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  cycleAverage: {
    type: Number
  }
})

export {
  userSchema
}
