import mongoose from "mongoose"

const lendingSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId , 
    ref: "Book",
    required: true
  },
  readerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reader",
    required: true
  },
  lendDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ["borrowed", "returned", "late"],
    default: "borrowed"
  },
  email: {
    type: String
  }
}, {
  timestamps: true
})

export const LendingModel = mongoose.model("Lending", lendingSchema)
