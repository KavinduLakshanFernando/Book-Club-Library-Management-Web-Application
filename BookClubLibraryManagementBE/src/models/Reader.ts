import mongoose from "mongoose"

type Reader = {
    first_name: string
    last_name: string
    email: string
    age: number
    address: string
    phone: string
    join_date: Date
}

const readerSchema = new mongoose.Schema<Reader>({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },

    last_name: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        trim: true,
    },
    address:{
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },
    phone:{
        type: String,
        required: [true, "Phone is required"],
        trim: true,
    },
    join_date: {
        type: Date,
        default: Date.now,
    },
})

export const ReaderModel = mongoose.model<Reader>("Reader",readerSchema)