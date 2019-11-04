import mongoose, { Schema, Document } from 'mongoose'

const symptomSchema: Schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  description: {
    type: String
  }
})

interface SymptomType extends Document {
  id: number,
  description: string
}

export {
  symptomSchema,
  SymptomType
}
