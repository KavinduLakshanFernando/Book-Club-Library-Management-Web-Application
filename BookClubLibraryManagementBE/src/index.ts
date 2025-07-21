import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/mongo"
import cors from "cors"
import rootRouter from "./routes"
import { errorHandler } from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"

dotenv.config()  //config dotenv
const app = express()

// handle cors
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeader: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use("/api",rootRouter)


app.use(errorHandler)

const PORT = process.env.PORT

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
