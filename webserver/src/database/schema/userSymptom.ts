import mongoose from 'mongoose'

const userSymptomSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  symptomId: {
    type: Number
  },
  timeStamp: {
    type: Date
  }
})

export {
  userSymptomSchema
}
