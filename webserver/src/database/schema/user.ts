import mongoose, { Schema, Document } from 'mongoose'

const userSchema: Schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  cycleAverage: {
    type: Number
  }
})

interface UserType extends Document {
  id: number,
  cycleAverage: number
}

export {
  userSchema,
  UserType
}
