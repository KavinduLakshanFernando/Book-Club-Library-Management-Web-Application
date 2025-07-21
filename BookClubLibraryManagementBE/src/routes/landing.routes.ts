import { Router } from "express";
import { landbook,getAllRecords,getRecordByReaderId,getRecordByBookId,updatereturnDate,updateRecord,deleteRecord } from "../controllers/lending.controller";

const landingRouter = Router();

landingRouter.post("/landbook", landbook);
landingRouter.get("/getAllRecords", getAllRecords);
landingRouter.get("/:id", getRecordByReaderId);
landingRouter.get("/:id", getRecordByBookId);
landingRouter.put("/:id", updatereturnDate);
landingRouter.put("/:id", updateRecord);
landingRouter.delete("/:id", deleteRecord);

export default landingRouter;