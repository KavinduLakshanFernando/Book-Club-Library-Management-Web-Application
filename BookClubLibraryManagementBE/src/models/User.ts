import mongoose from "mongoose"

type User = {
  name:string,
  email:string,
  password:string,
  role: "admin" | "user"
  createAt :Date
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role:{
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
},{
  timestamps:true
})

const UserModel = mongoose.model<User>("User", userSchema)

export { UserModel }
