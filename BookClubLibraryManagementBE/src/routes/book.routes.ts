import { Router } from "express";
import {addBook,getBooks,editBooks,deleteBook} from "../controllers/books.controller"

const bookRouter = Router()

bookRouter.post("/add",addBook)
bookRouter.get("/getBooks",getBooks)
bookRouter.delete("/:id",deleteBook)
bookRouter.put("/:id",editBooks)

export default bookRouter