import mongoose from 'mongoose'

const symptomSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  description: {
    type: String
  }
})

export {
  symptomSchema
}
