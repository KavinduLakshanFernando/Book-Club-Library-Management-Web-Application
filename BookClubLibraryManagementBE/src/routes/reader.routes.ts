import { Router } from "express";   
import { createReader,getAllReaders,editReader,deleteReader } from "../controllers/reader.controller";

const readerRouter = Router()

readerRouter.post("/create", createReader)
readerRouter.get("/getReaders",getAllReaders)
readerRouter.put("/:id",editReader)
readerRouter.delete("/:id",deleteReader)

export default readerRouter