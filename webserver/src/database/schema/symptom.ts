import * as mongoose from 'mongoose'

const symptomSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  description: {
    type: String
  }
})

export default symptomSchema
