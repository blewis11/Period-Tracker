import mongoose, { Schema, Document } from 'mongoose'

const userSymptomSchema: Schema = new mongoose.Schema({
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

interface UserSymptomType extends Document {
  userId: number,
  symptomId: number,
  timeStamp: Date
}

export {
  userSymptomSchema,
  UserSymptomType
}
