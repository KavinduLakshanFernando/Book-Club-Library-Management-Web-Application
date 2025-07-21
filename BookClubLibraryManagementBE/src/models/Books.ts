import mongoose from "mongoose";

type Book = {
    title: string,
    author: string,
    description: string,
    category: string,
    publisher: string,
    publishedDate: Date,
    quantity: number
    timeStamp: Date
}

const bookSchema = new mongoose.Schema<Book>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    category: {
        type: String 
    },
    publisher: {
        type: String 
    },
    publishedDate: {
        type: Date 
    },
    quantity: {
        type: Number, default: 0 
    },
    timeStamp: {
        type: Date, default: Date.now
    }
})

const BookModel = mongoose.model<Book>("Book", bookSchema)

export default BookModel